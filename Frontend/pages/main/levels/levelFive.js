import {
    gameTitle,
    gameDescription,
    createNumberSelect,
    createButtonElement, showResultCard
} from '../../../utils/functions.js'

let attempts = 0
let playerWon = false

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
                showResultCard("win", `You have selected: ${playerSelectedNo}, that equals the computer's choice: ${computerSelectedNo}. 
                Congratulations! You won!` )
                attempts = 3
                playerWon = true
                onWin()
            } else {
                attempts += 1;
                selectNoBtnEl.disabled = false
                showResultCard("try", `Your selection: ${playerSelectedNo} is not same as computer's selection: ${computerSelectedNo}.
            ${attempts <= 2 ? `Try again! 🔄 (${3 - attempts} left)` : ""}`)
                setTimeout(() => {
                    attempts < 3 ? computerChoiceElement.remove() : ""
                }, 2000)
            }

            if (attempts === 3) {
                selectNoBtnEl.disabled = true
                if (playerWon === false) {
                    showResultCard("lose", `You lost. No attempts left`)
                    onLose()
                }

            }

        }, 500)

    }


    selectNoBtnEl.addEventListener('click', handleGuessNo)
}

export default levelFive