import {
    gameTitle,
    createButtonElement,
    showResultCard,
    createDivElement, createParagraphElement
} from '../../../utils/functions.js'

let levelThreeContainer;
let describeGame3Para;

let attempts = 0;


// --------------------------------Main Function------------------------

const levelThree = (gameDiv, onWin, onLose) => {
    gameTitle("ROLL THE DICE")

    levelThreeContainer = createDivElement("game3Container")
    gameDiv.appendChild(levelThreeContainer)

    describeGame3Para = createParagraphElement("game3Description", "Roll 3 dices by clicking the button. To win, their sum should be equal to target no: 12.")
    levelThreeContainer.appendChild(describeGame3Para)

    let targetNo = document.createElement('p');
    targetNo.className = "targetValue"
    targetNo.innerText = `Target Number: 12`;
    levelThreeContainer.appendChild(targetNo)

    let rollBtnEl = createButtonElement("rollDiceBtn", "Roll")
    levelThreeContainer.appendChild(rollBtnEl)

    const handleDiceRoll = () => {

        document.querySelectorAll('.dices').forEach(el => el.remove());

        setTimeout(() => {
            let randomNumber1 = Math.floor(Math.random() * 6) + 1;
            let randomNumber2 = Math.floor(Math.random() * 6) + 1;
            let randomNumber3 = Math.floor(Math.random() * 6) + 1;

            let allDices = document.createElement('div')
            allDices.className = "dices"
            levelThreeContainer.appendChild(allDices)

            let dice1 = document.createElement("img")
            dice1.className = "dice1"
            dice1.src = "../../images/dice-" + randomNumber1 + ".png";
            dice1.alt = `dice face ${randomNumber1}`;
            allDices.appendChild(dice1)

            let dice2 = document.createElement("img")
            dice2.className = "dice2"
            dice2.src = "../../images/dice-" + randomNumber2 + ".png";
            dice2.alt = `dice face ${randomNumber2}`;
            allDices.appendChild(dice2)

            let dice3 = document.createElement("img")
            dice3.className = "dice3"
            dice3.src = "../../images/dice-" + randomNumber3 + ".png";
            dice3.alt = `dice face ${randomNumber3}`;
            allDices.appendChild(dice3)

            const sum = randomNumber1 + randomNumber2 + randomNumber3
            attempts += 1;

            if (sum === 12) {

                rollBtnEl.disabled = true;
                showResultCard("win", `The sum of ${randomNumber1}, ${randomNumber2}, and ${randomNumber3} is ${sum}.`)
                onWin()
            } else if (attempts >= 3) {
                showResultCard("lose", `The sum of ${randomNumber1}, ${randomNumber2}, and ${randomNumber3} is ${sum}. No attempts left!`)
                rollBtnEl.disabled = true;

                let player = JSON.parse(localStorage.getItem('playerDetails'));
                if (player.score === 0) rollBtnEl.disabled = true
                onLose()
            } else {
                showResultCard("try", `The sum of ${randomNumber1}, ${randomNumber2}, and ${randomNumber3} is ${sum}.(${3 - attempts} attempts left) Good luck!`)
            }
        }, 1000);
    }


    rollBtnEl.addEventListener('click', handleDiceRoll)
}

export default levelThree