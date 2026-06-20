import {
    gameTitle,
    gameDescription,
    createSelectElement,
    createNumberSelect,
    createButtonElement
} from '../../../utils/functions.js'

let attempts = 0
let playerWon = false

let result = document.querySelector('.result')
let trialCount = document.querySelector('.trials')


let optionsArray1 = [{value: "", nodeText: "-- Select Even/Odd --"},
    {value: "EVEN", nodeText: "EVEN"},
    {value: "ODD", nodeText: "ODD"}];

let optionsArray2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


const levelFour = (gameDiv) => {
    gameTitle("EVENS ODDS")
    gameDescription("First select EVEN or ODD. Then select numbers from (1-10). Your selected number will be added to the computer's selected number. If their sum matches your EVEN or ODD choice you will win.")

    let evenOddSelect = createSelectElement("selectOptions", optionsArray1)
    gameDiv.appendChild(evenOddSelect)

    let numberSelect = createNumberSelect("selectOptions", optionsArray2)
    gameDiv.appendChild(numberSelect)

    let playButton = createButtonElement("playBtn", "Play")
    gameDiv.appendChild(playButton)

    const handleEvenOdd = () => {
        let playerTarget = evenOddSelect.value;
        let playerSelectedNo = numberSelect.value;

        if (playerTarget === "") {
            alert('Please select EVEN or ODD')
        } else if (playerSelectedNo === "") {
            alert('Please select a Number')
        } else {
            setTimeout(() => {

                let computerSelectedNo = Math.floor(Math.random() * 10 + 1)
                let computerChoice = document.createElement('p')
                computerChoice.className = "computerChoice"
                computerChoice.innerText = `Computer's choice: ${computerSelectedNo.toString()} `
                gameDiv.appendChild(computerChoice)
                let sumOfNos = +playerSelectedNo + +computerSelectedNo;


                if (playerTarget === "EVEN" && sumOfNos % 2 === 0) {
                    result.textContent = `The sum of ${playerSelectedNo} and ${computerSelectedNo} is ${sumOfNos}, which is an Even Number.Congratulations! You won! 🎉🏆`;
                    attempts = 3
                    playerWon = true
                } else if (playerTarget === "ODD" && sumOfNos % 2 !== 0) {
                    result.textContent = `The sum of ${playerSelectedNo} and ${computerSelectedNo} is ${sumOfNos}, which is Odd Number. Congratulations! You won! 🎉🏆 `;
                    attempts = 3
                    playerWon = true
                } else {
                    attempts += 1;
                    result.textContent = `The sum of ${playerSelectedNo} and ${computerSelectedNo} is ${sumOfNos}, which is not an ${playerTarget} number.
            ${attempts <= 2 ? "Please try again!" : ""}`
                    trialCount.innerText = attempts
                }

                if (attempts === 3) {
                   playButton.disabled = true
                    if (playerWon === false) {
                        let gameLost = document.createElement('p').innerText = `You have lost the game.`
                        result.append(gameLost)
                    }

                }

            }, 1000)
        }

    }
    playButton.addEventListener('click', handleEvenOdd)
}

export default levelFour;