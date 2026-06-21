import {
    gameTitle,
    gameDescription,
    createButtonElement, createInputElement
} from '../../../utils/functions.js'


let riddlesArray;
let chosenRiddle;
let riddle;
let showRiddleBtnEl;

let playerAnsInputEl;
let submitBtnEl;

let result = document.querySelector('.result')
let trialCount = document.querySelector('.trials')

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

const levelSeven = async (gameDiv) => {
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
            result.textContent = `"${playerAnswer}" is a correct answer. Congratulations! You won! 🎉🏆`;
            attempts = 3
            playerWon = true
        } else {
            attempts += 1;
            trialCount.innerText = attempts

            showRiddleBtnEl.disabled = false
            playerAnsInputEl.value = ""
            riddle.innerText = ""

            result.textContent = `${playerAnswer} is incorrect. The correct answer is ${correctAnswer}.
            ${attempts <= 2 ? `Please try again! 🔄 (${3 - attempts} attempts left) Good luck!`: "" }`
        }

        if (attempts === 3) {
            showRiddleBtnEl.disabled = true
            if (playerWon === false) {
                let gameLost = document.createElement('p').innerText = `You have lost the game. 😢`
                result.append(gameLost)
            }
        }
    }
    submitBtnEl.addEventListener("click", handleSubmitRiddleAnswer)
    submitBtnEl.disabled = true;
}

export default levelSeven