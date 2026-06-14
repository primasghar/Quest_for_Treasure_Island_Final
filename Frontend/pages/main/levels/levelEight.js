let questionsArray;
let chosenQuestion;
let question;
let playerAnsInput;
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

//Creating p element to display question text

const questionEl = () => {
    question = document.createElement('p')
    question.className = "question"
    gameDiv.appendChild(question)
}

//Creating button element, that when clicked will display a question

const showQuestionBtn = () => {
    btnEl = document.createElement("button")
    btnEl.className = "questionBtn"
    btnEl.innerText = "Show Question"
    gameDiv.appendChild(btnEl)
}

//Creating button element, that when clicked will submit player's ans and display result.

const submitBtn = () => {
    submitBtnEl = document.createElement("button")
    submitBtnEl.className = "submitBtn"
    submitBtnEl.innerHTML = "Submit"
    gameDiv.appendChild(submitBtnEl)
}

// Creating input element, where user can write their answer

const playerAnswerEl = () => {
    playerAnsInput = document.createElement('input');
    playerAnsInput.type = 'text';
    playerAnsInput.id = 'playerInput';
    playerAnsInput.placeholder = 'Enter sequence...';
    gameDiv.appendChild(playerAnsInput);
}

// function  handling display of question text

const handleShowQuestion = () => {
    let availableQuestions = [...questionsArray]
    let questionText = "";

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);

    chosenQuestion = availableQuestions.splice(randomIndex, 1)[0];
    console.log("question", chosenQuestion)

    questionText = chosenQuestion[1];
    questionEl()
    question.innerText = questionText

    playerAnsInput.disabled = false;
    submitBtnEl.disabled = false;
    btnEl.disabled = true;
}

// function  handling submitting of player's answer and showing results.

const handleSubmitQuizAnswer = () => {
    let playerAnswered = playerAnsInput.value.trim().toUpperCase()
    let correctAnswer = chosenQuestion[2].toUpperCase()


    submitBtnEl.disabled = true;
    playerAnsInput.disabled = true;

    if (playerAnswered === correctAnswer) {
        result.textContent = `Your answered ${playerAnswered} which matches the correct answer ${correctAnswer}. Congratulations! You won! `;
        attempts = 3
        playerWon = true
    } else {
        attempts += 1;
        trialCount.innerText = attempts

        if (attempts <= 2) {
            result.textContent = `Your answered ${playerAnswered}, which is incorrect. The correct answer is ${correctAnswer}. Please try again. 
            Press "Show Question" button to see the new question. Good luck!`
            btnEl.disabled = false
            playerAnsInput.value = ""
            question.innerText = ""
        } else {
            btnEl.disabled = true
            result.textContent = `Your answer ${playerAnswered} does not match ${correctAnswer}. `
        }

    }

    if (attempts === 3) {
        btnEl.disabled = true
        if (playerWon === false) {
            let gameLost = document.createElement('p').innerText = `Game Over!.`
            result.append(gameLost)
        }
    }
}

//Main Game function
const levelEight = async () => {
    let gameTitle = document.querySelector('.gameNameHeading')
    gameTitle.innerText = "Quiz";
    gameTitle.className = "gameTitle"

    document.querySelector('.gameDescription').innerText =
        "You have three opportunities to win this game and go to your next airport destination. " +
        "Please click the button below and answer the question correctly.";

    questionsArray = await fetchQuizQuestions()

    showQuestionBtn()
    btnEl.addEventListener("click", handleShowQuestion);

    playerAnswerEl()
    playerAnsInput.disabled = true;

    submitBtn()
    submitBtnEl.disabled = true;

    submitBtnEl.addEventListener("click", handleSubmitQuizAnswer)
}