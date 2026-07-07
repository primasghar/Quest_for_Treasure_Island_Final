import {gameTitle, gameDescription, createButtonElement} from '../../../utils/functions.js'

let attempts = 0;

let result = document.querySelector('.result')
let trialCount = document.querySelector('.trials')

// --------------------------------Main Function------------------------

const levelThree = (gameDiv, onWin, onLose) => {
    gameTitle("ROLL THE DICE")
    gameDescription("Roll the 3 dices three times by clicking the button to get the sum that equals target no: 12.")

    // let diceImg = document.createElement('img');
    // diceImg.src = "../../images/rolling-dices.png";
    // diceImg.alt = "dice image"
    // diceImg.className = "diceImage"
    // gameTitle.appendChild(diceImg)

    let targetNo = document.createElement('p');
    targetNo.className = "targetValue"
    targetNo.innerText = `Target Number: 12`;
    gameDiv.appendChild(targetNo)

    let rollBtnEl = createButtonElement("playBtn", "Roll")
    gameDiv.appendChild(rollBtnEl)

    const handleDiceRoll = () => {

        document.querySelectorAll('.dices').forEach(el => el.remove());

        setTimeout(() => {
            let randomNumber1 = Math.floor(Math.random() * 6) + 1;
            let randomNumber2 = Math.floor(Math.random() * 6) + 1;
            let randomNumber3 = Math.floor(Math.random() * 6) + 1;

            let allDices = document.createElement('div')
            allDices.className = "dices"
            gameDiv.appendChild(allDices)

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
            trialCount.innerText = attempts;

             if (sum === 12) {
                result.innerHTML = `The sum of ${randomNumber1}, ${randomNumber2}, and ${randomNumber3} is ${sum}. Congrats! You win!🎉🏆`;
                rollBtnEl.disabled = true;
                onWin()
            } else if (attempts >= 3) {
                result.innerHTML = `The sum of ${randomNumber1}, ${randomNumber2}, and ${randomNumber3} is ${sum}.`;
                rollBtnEl.disabled = true;

                let gameLost = document.createElement('p');
                gameLost.innerText = `Sorry! You lost.😢 No attempts left!`
                result.append(gameLost);
                onLose()
            } else {
                result.innerHTML = `The sum of ${randomNumber1}, ${randomNumber2}, and ${randomNumber3} is ${sum}. Try again! 🔄 (${3 - attempts} left)`;
            }
        }, 1000);
    }


    rollBtnEl.addEventListener('click', handleDiceRoll)
}

export default levelThree