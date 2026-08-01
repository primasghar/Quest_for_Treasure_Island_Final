import {
    gameTitle,
    generateRandomSequence,
    showResultCard,
    incrementAttempts
} from '../utils/functions.js'

import {
    createButtonElement,
    createInputElement,
    createDivElement,
    createParagraphElement,
} from '../utils/domUtilityFunctions.js'

import {
    getPlayerProgressData
} from '../utils/localStorageUtilityFunctions.js'

let levelSixContainer;
let describeGame6Para;

let seq;
let randSequence;
let showSeqBtnEl;

let sequenceInputEl;
let submitSeqBtnEl;

let playerWon = false
let attempts;

const handleSubmitSequence = async (onWin, onLose) => {

    let player = getPlayerProgressData();
    attempts = player.attempts;

    console.log("handle submit", sequenceInputEl.value, seq)
    submitSeqBtnEl.disabled = true;
    sequenceInputEl.disabled = true;

    const playerGuess = sequenceInputEl.value.trim().toUpperCase();

    await incrementAttempts()

    if (playerGuess === seq) {

        playerWon = true
        showSeqBtnEl.disabled = true
        showResultCard("win", `Your sequence ${playerGuess} matched ${seq}.`)
        onWin()
    } else {

        if (attempts < 2) {
            showSeqBtnEl.disabled = false
            sequenceInputEl.value = ""
            showResultCard("try", `Your sequence ${playerGuess} does not match ${seq}.`)
        } else {
            showSeqBtnEl.disabled = true
            sequenceInputEl.value = ""
            onLose()
            showResultCard("lose", `Your sequence ${playerGuess} does not match ${seq}. No attempts left.`)
        }

    }
}

// --------------------------------Main Function------------------------

const levelSix = (gameDiv, onWin, onLose) => {
    gameTitle("SEQUENCE MEMORY")

    levelSixContainer = createDivElement("game6Container")
    gameDiv.appendChild(levelSixContainer)

    describeGame6Para = createParagraphElement("game6Description", "A random sequence of 8 capital alphabets will be displayed for 8 seconds, after that you will have to type the sequence.")
    levelSixContainer.appendChild(describeGame6Para)

    showSeqBtnEl = createButtonElement("sequenceBtn", "Sequence")
    levelSixContainer.appendChild(showSeqBtnEl)

    const handleShowSequence = () => {
        showSeqBtnEl.disabled = true;

        seq = generateRandomSequence();
        console.log("seq", seq)

        randSequence = document.createElement('p')
        randSequence.innerText = `Sequence No:  ${seq}`;
        randSequence.className = "sequence"
        levelSixContainer.appendChild(randSequence)

        setTimeout(() => {
            randSequence.innerText = "";

            sequenceInputEl = createInputElement('Enter sequence...')
            levelSixContainer.appendChild(sequenceInputEl)

            submitSeqBtnEl = createButtonElement("submitBtn", "Submit")
            submitSeqBtnEl.addEventListener("click", () => handleSubmitSequence(onWin, onLose))
            levelSixContainer.appendChild(submitSeqBtnEl)


        }, 8000)

    }

    showSeqBtnEl.addEventListener("click", handleShowSequence);

}

export default levelSix