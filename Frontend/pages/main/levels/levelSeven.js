import {
    gameTitle,
    createButtonElement, createInputElement, showResultCard, createDivElement, createParagraphElement, incrementAttempts
} from '../../../utils/functions.js'

let levelSevenContainer;
let describeGame7Para;

let riddlesArray;
let chosenRiddle;
let riddle;
let showRiddleBtnEl;

let playerAnsInputEl;
let submitBtnEl;

let attempts = 0
let playerWon = false

//Fetching all riddles from BE
const fetchRiddles = async () => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/riddles`)
        return await response.json();
    } catch (error) {
        console.log(error.message);
    }
};

// --------------------------------Main Function------------------------

const levelSeven = async (gameDiv, onWin, onLose) => {
    gameTitle("RIDDLES")

    levelSevenContainer = createDivElement("game7Container")
    gameDiv.appendChild(levelSevenContainer)

    describeGame7Para = createParagraphElement("game7Description", "Please click the button below and answer the riddle.")
    levelSevenContainer.appendChild(describeGame7Para)


    riddlesArray = await fetchRiddles()

    showRiddleBtnEl = createButtonElement("riddleBtn", "Show Riddle")
    levelSevenContainer.appendChild(showRiddleBtnEl)

    playerAnsInputEl = createInputElement("Enter your answer...")
    levelSevenContainer.appendChild(playerAnsInputEl)
    playerAnsInputEl.disabled = true;

    submitBtnEl = createButtonElement("submitBtn", "Submit")
    levelSevenContainer.appendChild(submitBtnEl)

    // Function to show the riddle
    const handleShowRiddle = () => {
        let player = JSON.parse(localStorage.getItem('playerDetails'));
        attempts = player.attempts;

        let availableRiddles = [...riddlesArray]
        let riddleText = "";

        const randomIndex = Math.floor(Math.random() * availableRiddles.length);

        chosenRiddle = availableRiddles.splice(randomIndex, 1)[0];

        riddleText = chosenRiddle[1];
        riddle = createParagraphElement("riddle", riddleText)
        levelSevenContainer.appendChild(riddle)

        playerAnsInputEl.disabled = false;
        submitBtnEl.disabled = false;
        showRiddleBtnEl.disabled = true;
    }

    showRiddleBtnEl.addEventListener("click", handleShowRiddle);
    // Function to submit the riddle answer, and display results.
    const handleSubmitRiddleAnswer = async() => {
        await incrementAttempts()

        let playerAnswer = playerAnsInputEl.value.trim().toUpperCase()
        let correctAnswer = chosenRiddle[2].toUpperCase()

        submitBtnEl.disabled = true;
        playerAnsInputEl.disabled = true;

        if (playerAnswer === correctAnswer) {

            playerWon = true
            showResultCard("win", `"${playerAnswer}" is a correct answer.`)
            onWin()
        } else {

            showRiddleBtnEl.disabled = false
            playerAnsInputEl.value = ""
            riddle.innerText = ""
            showResultCard("try", `${playerAnswer} is incorrect. The correct answer is ${correctAnswer}.`)
        }

        if (attempts === 2) {
            showRiddleBtnEl.disabled = true
            if (playerWon === false) {
                showResultCard("lose", `${playerAnswer} is incorrect. The correct answer is ${correctAnswer}. No attempts left.`)
                onLose()
            }
        }
    }
    submitBtnEl.addEventListener("click", handleSubmitRiddleAnswer)
    submitBtnEl.disabled = true;
}

export default levelSeven