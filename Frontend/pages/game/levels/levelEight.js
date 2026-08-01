import {
    gameTitle,
    showResultCard,
    incrementAttempts
} from '../utils/utilityFunctions.js'

import {
    createButtonElement,
    createInputElement,
    createDivElement,
    createParagraphElement,
} from '../utils/domFunctions.js'

import {
    getPlayerProgressData
} from '../utils/localStorageFunctions.js'

let levelEightContainer;
let describeGame8Para;

let questionsArray;
let chosenQuestion;
let question;
let showQuestionBtnEl;

let playerAnsInputEl;
let submitBtnEl;

let attempts;
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


// --------------------------------Main Function------------------------

const levelEight = async (gameDiv, onWin, onLose) => {

    gameTitle("QUIZ")

    levelEightContainer = createDivElement("game8Container")
    gameDiv.appendChild(levelEightContainer)

    describeGame8Para = createParagraphElement("game8Description", "Click the button below to see the quiz question and answer it to win.")
    levelEightContainer.appendChild(describeGame8Para)

    questionsArray = await fetchQuizQuestions()

    showQuestionBtnEl = createButtonElement("questionBtn", "Show Question")
    levelEightContainer.appendChild(showQuestionBtnEl)

    //Function to display question
    const handleShowQuestion = () => {

        let player = getPlayerProgressData();
        attempts = player.attempts;

        let availableQuestions = [...questionsArray]
        let questionText = "";

        const randomIndex = Math.floor(Math.random() * availableQuestions.length);

        chosenQuestion = availableQuestions.splice(randomIndex, 1)[0];

        questionText = chosenQuestion[1];
        question = createParagraphElement('question', questionText)
        levelEightContainer.appendChild(question)

        playerAnsInputEl.disabled = false;
        submitBtnEl.disabled = false;
        showQuestionBtnEl.disabled = true;
    }


    showQuestionBtnEl.addEventListener("click", handleShowQuestion);

    playerAnsInputEl = createInputElement("Enter your answer...")
    levelEightContainer.appendChild(playerAnsInputEl)
    playerAnsInputEl.disabled = true;

    submitBtnEl = createButtonElement("submitBtn", "Submit")
    levelEightContainer.appendChild(submitBtnEl)
    submitBtnEl.disabled = true;

    //Function  handling submitting of player's answer and showing results.
    const handleSubmitQuizAnswer = async () => {

        await incrementAttempts()

        let playerAnswer = playerAnsInputEl.value.trim().toUpperCase()
        let correctAnswer = chosenQuestion[2].toUpperCase()

        submitBtnEl.disabled = true;
        playerAnsInputEl.disabled = true;

        if (playerAnswer === correctAnswer) {
            showResultCard("win", `${playerAnswer} is the correct answer.`)
            playerWon = true
            onWin()
        } else {
            showQuestionBtnEl.disabled = false
            playerAnsInputEl.value = ""
            question.innerText = ""

            showResultCard("try", `${playerAnswer} is incorrect. The correct answer is ${correctAnswer}.`)

        }

        if (attempts === 2) {
            showQuestionBtnEl.disabled = true
            if (playerWon === false) {
                showResultCard("lose", `${playerAnswer} is incorrect. The correct answer is ${correctAnswer}. No attempts left.`)
                onLose()
            }
        }
    }

    submitBtnEl.addEventListener("click", handleSubmitQuizAnswer)
}

export default levelEight