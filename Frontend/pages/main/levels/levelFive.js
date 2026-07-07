import {
    gameTitle,
    gameDescription,
    createNumberSelect,
    createButtonElement
} from '../../../utils/functions.js'

let attempts = 0
let playerWon = false

let result = document.querySelector('.result')
let trialCount = document.querySelector('.trials')


let optionsArray2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// --------------------------------Main Function------------------------

const levelFive = (gameDiv, onWin, onLose) => {
    gameTitle("GUESS THE NUMBER")
    gameDescription("Select the number, if it matches the computer's selection you will win.")

    let selectNoEl = createNumberSelect("selectOptions", optionsArray2)
    gameDiv.appendChild(selectNoEl)

    let selectNoBtnEl = createButtonElement("playBtn", "Play")
    gameDiv.appendChild(selectNoBtnEl)

    const handleGuessNo = () => {
        let computerSelectedNo = Math.floor(Math.random() * 10 + 1)
        console.log("computer no", computerSelectedNo)
        let playerSelectedNo = selectNoEl.value

        if (playerSelectedNo === "") {
            alert('Please select a Number')
            return;
        }

        selectNoBtnEl.disabled = true


        let computerChoiceElement = document.createElement('p')
        computerChoiceElement.className = "computerChoice"
        computerChoiceElement.innerText = `Computer's choice: ${computerSelectedNo.toString()} `
        gameDiv.appendChild(computerChoiceElement)

        setTimeout(() => {
            if (+playerSelectedNo === computerSelectedNo) {
                result.textContent = `You have selected: ${playerSelectedNo}, that equals the computer's choice: ${computerSelectedNo}. 
                Congratulations! You won! 🎉🏆 `;
                attempts = 3
                playerWon = true
                onWin()
            } else {
                attempts += 1;
                trialCount.innerText = attempts
                selectNoBtnEl.disabled = false
                result.textContent = `Your selection: ${playerSelectedNo} is not same as computer's selection: ${computerSelectedNo}.
            ${attempts <= 2 ? `Try again! 🔄 (${3 - attempts} left)` : ""}`
                setTimeout(() => {
                    attempts < 3 ? computerChoiceElement.remove() : ""
                }, 2000)
            }

            if (attempts === 3) {
                selectNoBtnEl.disabled = true
                if (playerWon === false) {
                    let gameLost = document.createElement('p').innerText = `You lost.😢`
                    result.append(gameLost)
                    onLose()
                }

            }

        }, 500)

    }


    selectNoBtnEl.addEventListener('click', handleGuessNo)
}

export default levelFive