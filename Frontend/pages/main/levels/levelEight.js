import {
    gameTitle,
    gameDescription,
    createButtonElement,
    createInputElement
} from '../../../utils/functions.js'

let questionsArray;
let chosenQuestion;
let question;
let showQuestionBtnEl;

let playerAnsInputEl;
let submitBtnEl;

let result = document.querySelector('.result')
let trialCount = document.querySelector('.trials')

let attempts = 0
let playerWon = false

//fetching all questions from BE
const fetchQuizQuestions = async () => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/quiz/questions`)
        return await response.json();
    } catch (error) {
        console.log(error.message);
    }
};


//Main Game function
const levelEight = async (gameDiv, onWin) => {
    gameTitle("QUIZ")
    gameDescription("Click the button below to see the quiz question and answer it to win.")

    questionsArray = await fetchQuizQuestions()

    showQuestionBtnEl = createButtonElement("questionBtn", "Show Question")
    gameDiv.appendChild(showQuestionBtnEl)

    //Function to display question
    const handleShowQuestion = () => {
        let availableQuestions = [...questionsArray]
        let questionText = "";

        const randomIndex = Math.floor(Math.random() * availableQuestions.length);

        chosenQuestion = availableQuestions.splice(randomIndex, 1)[0];
        console.log("question", chosenQuestion)

        questionText = chosenQuestion[1];
        question = document.createElement('p')
        question.className = "question"
        question.innerText = questionText
        gameDiv.appendChild(question)

        playerAnsInputEl.disabled = false;
        submitBtnEl.disabled = false;
        showQuestionBtnEl.disabled = true;
    }


    showQuestionBtnEl.addEventListener("click", handleShowQuestion);

    playerAnsInputEl = createInputElement("Enter your answer...")
    gameDiv.appendChild(playerAnsInputEl)
    playerAnsInputEl.disabled = true;

    submitBtnEl = createButtonElement("submitBtn", "Submit")
    gameDiv.appendChild(submitBtnEl)
    submitBtnEl.disabled = true;

    //Function  handling submitting of player's answer and showing results.
    const handleSubmitQuizAnswer = () => {
        let playerAnswer = playerAnsInputEl.value.trim().toUpperCase()
        let correctAnswer = chosenQuestion[2].toUpperCase()

        submitBtnEl.disabled = true;
        playerAnsInputEl.disabled = true;

        if (playerAnswer === correctAnswer) {
            result.textContent = `${playerAnswer} is the correct answer. Congratulations! You won! 🎉🏆 `;
            attempts = 3
            playerWon = true
            onWin()
        } else {
            attempts += 1;
            trialCount.innerText = attempts

            showQuestionBtnEl.disabled = false
            playerAnsInputEl.value = ""
            question.innerText = ""

            result.textContent = `${playerAnswer} is incorrect. The correct answer is ${correctAnswer}.
            ${attempts <= 2 ? `Please try again! 🔄 (${3 - attempts} attempts left) Good luck!` : ""}`

        }

        if (attempts === 3) {
            showQuestionBtnEl.disabled = true
            if (playerWon === false) {
                let gameLost = document.createElement('p').innerText = `You have lost the game.`
                result.append(gameLost)
            }
        }
    }

    submitBtnEl.addEventListener("click", handleSubmitQuizAnswer)
}

export default levelEight