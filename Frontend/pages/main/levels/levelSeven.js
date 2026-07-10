import {
    gameTitle,
    gameDescription,
    createButtonElement, createInputElement, showResultCard
} from '../../../utils/functions.js'


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
    gameDescription("Please click the button below and answer the riddle.")

    riddlesArray = await fetchRiddles()

    showRiddleBtnEl = createButtonElement("riddleBtn", "Show Riddle")
    gameDiv.appendChild(showRiddleBtnEl)

    playerAnsInputEl = createInputElement("Enter your answer...")
    gameDiv.appendChild(playerAnsInputEl)
    playerAnsInputEl.disabled = true;

    submitBtnEl = createButtonElement("submitBtn", "Submit")
    gameDiv.appendChild(submitBtnEl)
    // Function to show the riddle
    const handleShowRiddle = () => {
        let availableRiddles = [...riddlesArray]
        let riddleText = "";

        const randomIndex = Math.floor(Math.random() * availableRiddles.length);

        chosenRiddle = availableRiddles.splice(randomIndex, 1)[0];
        // console.log("riddle", chosenRiddle)

        riddleText = chosenRiddle[1];
        riddle = document.createElement('p')
        riddle.className = "riddle"
        riddle.innerText = riddleText
        gameDiv.appendChild(riddle)

        playerAnsInputEl.disabled = false;
        submitBtnEl.disabled = false;
        showRiddleBtnEl.disabled = true;
    }

    showRiddleBtnEl.addEventListener("click", handleShowRiddle);
    // Function to submit the riddle answer, and display results.
    const handleSubmitRiddleAnswer = () => {
        let playerAnswer = playerAnsInputEl.value.trim().toUpperCase()
        let correctAnswer = chosenRiddle[2].toUpperCase()

        submitBtnEl.disabled = true;
        playerAnsInputEl.disabled = true;

        if (playerAnswer === correctAnswer) {
            attempts = 3
            playerWon = true
            showResultCard("win", `"${playerAnswer}" is a correct answer.`)
            onWin()
        } else {
            attempts += 1;
            showRiddleBtnEl.disabled = false
            playerAnsInputEl.value = ""
            riddle.innerText = ""
            showResultCard("try",`${playerAnswer} is incorrect. The correct answer is ${correctAnswer}. ${attempts <= 2 ? `(${3 - attempts} attempts left) Good luck!` : ""}`)
        }

        if (attempts === 3) {
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