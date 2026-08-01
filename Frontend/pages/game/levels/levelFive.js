import {
    gameTitle,
    createNumberSelect,
    createButtonElement, showResultCard, createDivElement, createParagraphElement, incrementAttempts,
    warningMessageModal
} from '../../../utils/functions.js'

import {
    getPlayerProgressData
} from '../../../utils/localStorageUtilityFunctions.js'

let levelFiveContainer;
let describeGame5Para;
let playerWon = false
let optionsArray2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// --------------------------------Main Function------------------------

const levelFive = (gameDiv, onWin, onLose) => {
    gameTitle("GUESS THE NUMBER")

    levelFiveContainer = createDivElement("game5Container")
    gameDiv.appendChild(levelFiveContainer)

    describeGame5Para = createParagraphElement("game5Description", "Select the number, if it matches the computer's choice you will win.")
    levelFiveContainer.appendChild(describeGame5Para)

    let selectNoEl = createNumberSelect("guessNoSelect", optionsArray2)
    levelFiveContainer.appendChild(selectNoEl)

    let selectNoBtnEl = createButtonElement("playBtn", "Play")
    levelFiveContainer.appendChild(selectNoBtnEl)

    const handleGuessNo = () => {

        let player = getPlayerProgressData();
        let attempts = player.attempts;

        let computerSelectedNo = Math.floor(Math.random() * 10 + 1)

        let playerSelectedNo = selectNoEl.value

        if (playerSelectedNo === "") {
            warningMessageModal('Please select a Number')
            return;
        }

        selectNoEl.disabled = true
        selectNoBtnEl.disabled = true

        let computerChoiceElement = createParagraphElement("guessComputerChoice", `Computer's choice: ${computerSelectedNo.toString()} `)
        levelFiveContainer.appendChild(computerChoiceElement)

        setTimeout(async () => {

            await incrementAttempts()

            if (+playerSelectedNo === computerSelectedNo) {
                showResultCard("win", `You have selected: ${playerSelectedNo}, that equals the computer's choice: ${computerSelectedNo}.`)
                playerWon = true
                onWin()
            } else {
                selectNoEl.disabled = false
                selectNoBtnEl.disabled = false
                showResultCard("try", `Your selection: ${playerSelectedNo} is not same as computer's selection: ${computerSelectedNo}.`)
                setTimeout(() => {
                    attempts < 2 ? computerChoiceElement.innerText = "" : ""
                }, 1000)
            }

            if (attempts === 2) {
                selectNoEl.disabled = true
                selectNoBtnEl.disabled = true
                if (playerWon === false) {
                    showResultCard("lose", `Your selection: ${playerSelectedNo} is not same as computer's selection: ${computerSelectedNo}. No attempts left`)
                    onLose()
                }

            }

        }, 500)

    }


    selectNoBtnEl.addEventListener('click', handleGuessNo)
}

export default levelFive