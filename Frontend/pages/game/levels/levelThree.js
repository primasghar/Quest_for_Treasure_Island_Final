import {
    gameTitle,
    showResultCard,
    incrementAttempts
} from '../utils/utilityFunctions.js'

import {
    createButtonElement,
    createDivElement,
    createParagraphElement,
} from '../utils/domFunctions.js'
import {
    getPlayerProgressData
} from '../utils/localStorageFunctions.js'

let levelThreeContainer;
let describeGame3Para;
// --------------------------------Main Function------------------------

const levelThree = (gameDiv, onWin, onLose) => {
    gameTitle("ROLL THE DICE")

    levelThreeContainer = createDivElement("game3Container")
    gameDiv.appendChild(levelThreeContainer)

    describeGame3Para = createParagraphElement("game3Description", "Roll 3 dices by clicking the button. To win, their sum should be equal to target no: 12.")
    levelThreeContainer.appendChild(describeGame3Para)

    let targetNo = createParagraphElement('targetValue', 'Target Number: 12' )
    levelThreeContainer.appendChild(targetNo)

    let rollBtnEl = createButtonElement("playBtn", "Roll")
    levelThreeContainer.appendChild(rollBtnEl)

    const handleDiceRoll = () => {
        let player = getPlayerProgressData();
        let attempts = player.attempts;

        document.querySelectorAll('.dices').forEach(el => el.remove());
        rollBtnEl.disabled = true

        setTimeout(async () => {
            let randomNumber1 = Math.floor(Math.random() * 6) + 1;
            let randomNumber2 = Math.floor(Math.random() * 6) + 1;
            let randomNumber3 = Math.floor(Math.random() * 6) + 1;

            let allDices = createDivElement('dices')
            levelThreeContainer.appendChild(allDices)

            let dice1 = document.createElement("img")
            dice1.className = "dice1"
            dice1.src = "../../images/dice-block-" + randomNumber1 + ".svg";
            dice1.alt = `dice face ${randomNumber1}`;
            allDices.appendChild(dice1)

            let dice2 = document.createElement("img")
            dice2.className = "dice2"
            dice2.src = "../../images/dice-block-" + randomNumber2 + ".svg";
            dice2.alt = `dice face ${randomNumber2}`;
            allDices.appendChild(dice2)

            let dice3 = document.createElement("img")
            dice3.className = "dice3"
            dice3.src = "../../images/dice-block-" + randomNumber3 + ".svg";
            dice3.alt = `dice face ${randomNumber3}`;
            allDices.appendChild(dice3)

            const sum = randomNumber1 + randomNumber2 + randomNumber3
            await incrementAttempts()

            if (sum === 12) {
                showResultCard("win", `The sum of ${randomNumber1}, ${randomNumber2}, and ${randomNumber3} is ${sum}.`)
                onWin()

            } else if (attempts >= 2) {
                showResultCard("lose", `The sum of ${randomNumber1}, ${randomNumber2}, and ${randomNumber3} is ${sum}. No attempts left!`)
                onLose()

            } else {
                rollBtnEl.disabled = false
                showResultCard("try", `The sum of ${randomNumber1}, ${randomNumber2}, and ${randomNumber3} is ${sum}.`)
            }
        }, 1000);
    }


    rollBtnEl.addEventListener('click', handleDiceRoll)
}

export default levelThree