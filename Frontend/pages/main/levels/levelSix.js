import {
    gameTitle,
    gameDescription,
    createInputElement,
    createButtonElement,
    generateRandomSequence, showResultCard
} from '../../../utils/functions.js'


let seq;
let randSequence;
let showSeqBtnEl;

let sequenceInputEl;
let submitSeqBtnEl;

let attempts = 0
let playerWon = false

const handleSubmitSequence = (onWin, onLose) => {
    console.log("handle submit", sequenceInputEl.value, seq)
    submitSeqBtnEl.disabled = true;
    sequenceInputEl.disabled = true;

    const playerGuess = sequenceInputEl.value.trim().toUpperCase();

    if (playerGuess === seq) {
        attempts = 3
        playerWon = true
        showSeqBtnEl.disabled = true
        showResultCard("win", `Your sequence ${playerGuess} matched ${seq}. Congratulations! You won!`)
        onWin()
    } else {
        attempts += 1;

        if (attempts <= 2) {
            showSeqBtnEl.disabled = false
            sequenceInputEl.value = ""
            showResultCard("try", `Your sequence ${playerGuess} does not match ${seq}. Try again!(${3 - attempts} left).`)
        } else {
            showSeqBtnEl.disabled = true
            sequenceInputEl.value = ""
            onLose()
            showResultCard("lose", `Your sequence ${playerGuess} does not match ${seq}. You Lost. No attempts left.`)
        }

    }
}

// --------------------------------Main Function------------------------

const levelSix = (gameDiv, onWin, onLose) => {
    gameTitle("SEQUENCE MEMORY")
    gameDescription("A random sequence of 8 capital alphabets will be displayed for 8 seconds, after that you will have to type the sequence.")


    showSeqBtnEl = createButtonElement("sequenceBtn", "Sequence")
    gameDiv.appendChild(showSeqBtnEl)

    const handleShowSequence = () => {
        showSeqBtnEl.disabled = true;

        seq = generateRandomSequence();
        console.log("seq", seq)

        randSequence = document.createElement('p')
        randSequence.innerText = `Sequence No ${attempts + 1}:  ${seq}`;
        randSequence.className = "sequence"
        gameDiv.appendChild(randSequence)

        setTimeout(() => {
            randSequence.innerText = "";

            sequenceInputEl = createInputElement('Enter sequence...')
            gameDiv.appendChild(sequenceInputEl)

            submitSeqBtnEl = createButtonElement("submitBtn", "Submit")
            submitSeqBtnEl.addEventListener("click", () => handleSubmitSequence(onWin, onLose))
            gameDiv.appendChild(submitSeqBtnEl)


        }, 8000)

    }

    showSeqBtnEl.addEventListener("click", handleShowSequence);

}

export default levelSix