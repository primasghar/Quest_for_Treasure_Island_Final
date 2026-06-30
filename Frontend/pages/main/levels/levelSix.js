import {
    gameTitle,
    gameDescription,
    createInputElement,
    createButtonElement,
    generateRandomSequence
} from '../../../utils/functions.js'


let seq;
let randSequence;
let showSeqBtnEl;

let sequenceInputEl;
let submitSeqBtnEl;

let attempts = 0
let playerWon = false

let result = document.querySelector('.result')
let trialCount = document.querySelector('.trials')

const handleSubmitSequence = (onWin) => {
    console.log("handle submit", sequenceInputEl.value, seq)
    submitSeqBtnEl.disabled = true;
    sequenceInputEl.disabled = true;

    const playerGuess = sequenceInputEl.value.trim().toUpperCase();

    if (playerGuess === seq) {
        result.textContent = `Your sequence ${playerGuess} matched ${seq}. Congratulations! You won! 🎉🏆`;
        attempts = 3
        playerWon = true
        onWin()
    } else {
        attempts += 1;
        trialCount.innerText = attempts

        if (attempts <= 2) {
            result.textContent = `Your sequence ${playerGuess} does not match ${seq}. Please try again! 🔄. Press "Sequence" button to see the new sequence. Good luck!`
            showSeqBtnEl.disabled = false
            sequenceInputEl.value = ""
        } else {
            showSeqBtnEl.disabled = true
            sequenceInputEl.value = ""
            result.textContent = `Your sequence ${playerGuess} does not match ${seq}. `
        }

    }

    if (attempts === 3) {
        showSeqBtnEl.disabled = true
        if (playerWon === false) {
            let gameLost = document.createElement('p').innerText = `Game Over!.`
            result.append(gameLost)
        }

    }
}


const levelSix = (gameDiv, onWin) => {
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
            submitSeqBtnEl.addEventListener("click", ()=>handleSubmitSequence(onWin) )
            gameDiv.appendChild(submitSeqBtnEl)


        }, 8000)

    }

    showSeqBtnEl.addEventListener("click", handleShowSequence);

}

export default levelSix