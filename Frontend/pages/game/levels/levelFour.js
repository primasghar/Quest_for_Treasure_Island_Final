import {
    gameTitle,
    showResultCard,
    incrementAttempts
} from '../utils/utilityFunctions.js'

import {
    createButtonElement,
    createDivElement, createNumberSelect,
    createParagraphElement, createSelectElement,
} from '../utils/domFunctions.js'
import { warningMessageModal } from '../utils/modals.js'
import {
    getPlayerProgressData
} from '../utils/localStorageFunctions.js'

let levelFourContainer;
let describeGame4Para;
let playerWon = false
let optionsArray1 = [{value: "", nodeText: "-- Select Even/Odd --"},
    {value: "EVEN", nodeText: "EVEN"},
    {value: "ODD", nodeText: "ODD"}];
let optionsArray2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// --------------------------------Main Function------------------------

const levelFour = (gameDiv, onWin, onLose) => {
    gameTitle("EVENS ODDS")

    levelFourContainer = createDivElement("game4Container")
    gameDiv.appendChild(levelFourContainer)

    describeGame4Para = createParagraphElement("game4Description", "First select EVEN or ODD and number (1-10). Your selected number will be added to the computer's selected number. " +
        "To win the sum should matches your EVEN or ODD choice")
    levelFourContainer.appendChild(describeGame4Para)

    // Creating Game Elements
    let evenOddSelect = createSelectElement("evenOddSelect", optionsArray1)
    levelFourContainer.appendChild(evenOddSelect)

    let numberSelect = createNumberSelect("numberSelect", optionsArray2)
    levelFourContainer.appendChild(numberSelect)

    let playButton = createButtonElement("playBtn", "Play")
    levelFourContainer.appendChild(playButton)

    // Handler function
    const handleEvenOdd = () => {
        let player = getPlayerProgressData();
        let attempts = player.attempts;

        playButton.disabled = true

        let computerChoice;

        let playerTarget = evenOddSelect.value;
        let playerSelectedNo = numberSelect.value;

        if (playerTarget === "") {
            warningMessageModal('Please select EVEN or ODD')

        } else if (playerSelectedNo === "") {
            warningMessageModal('Please select a Number')

        } else {
            setTimeout(async () => {
                await incrementAttempts()

                let computerSelectedNo = Math.floor(Math.random() * 10 + 1)
                computerChoice = createParagraphElement('computerChoice', `Computer's choice: ${computerSelectedNo.toString()} ` )
                levelFourContainer.appendChild(computerChoice)
                let sumOfNos = +playerSelectedNo + +computerSelectedNo;


                if (playerTarget === "EVEN" && sumOfNos % 2 === 0) {
                    playerWon = true
                    showResultCard("win", `The sum of ${playerSelectedNo} and ${computerSelectedNo} is ${sumOfNos}, which is an Even Number.`)
                    onWin()
                } else if (playerTarget === "ODD" && sumOfNos % 2 !== 0) {
                    playerWon = true
                    showResultCard("win", `The sum of ${playerSelectedNo} and ${computerSelectedNo} is ${sumOfNos}, which is Odd Number.`)
                    onWin()
                } else {
                     playButton.disabled = false
                    showResultCard("try", `The sum of ${playerSelectedNo} and ${computerSelectedNo} is ${sumOfNos}, which is not an ${playerTarget} number.`)
                     setTimeout(() => {
                    attempts < 3 ? computerChoice.remove() : ""
                }, 2000)
                }

                if (attempts === 2) {
                    playButton.disabled = true
                    if (playerWon === false) {
                        showResultCard("lose", `The sum of ${playerSelectedNo} and ${computerSelectedNo} is ${sumOfNos}, which is not an ${playerTarget} number. No attempts left!`)
                        onLose()
                    }

                }

            }, 1000)
        }

    }
    playButton.addEventListener('click', handleEvenOdd)
}

export default levelFour;