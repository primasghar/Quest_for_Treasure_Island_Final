// let targetInput = document.createElement('input');
// targetInput.setAttribute('type', 'text');
// gameDiv.appendChild(targetInput);
let attempts = 0;

let result = document.querySelector('.result')
let trialCount = document.querySelector('.trials')


const addButton = () => {
    buttonEl = document.createElement("button")
    buttonEl.className = "playBtn"
    buttonEl.innerHTML = "Roll"
    gameDiv.appendChild(buttonEl)

}

const rollDice = () => {
    setTimeout(() => {
        let randomNumber1 = Math.floor(Math.random() * 6) + 1;
        let randomNumber2 = Math.floor(Math.random() * 6) + 1;
        let randomNumber3 = Math.floor(Math.random() * 6) + 1;

        let allDices = document.createElement('div')
        allDices.className = "dices"
        gameDiv.appendChild(allDices)

        let dice1 = document.createElement("img")
        dice1.className = "dice1"
        dice1.setAttribute("src", "../../images/dice-" + randomNumber1 + ".png");
        dice1.setAttribute("alt", `dice face ${randomNumber1}`);
        allDices.appendChild(dice1)

        let dice2 = document.createElement("img")
        dice2.className = "dice2"
        dice2.setAttribute("src", "../../images/dice-" + randomNumber2 + ".png");
        dice1.setAttribute("alt", `dice face ${randomNumber2}`);
        allDices.appendChild(dice2)

        let dice3 = document.createElement("img")
        dice3.className = "dice3"
        dice3.setAttribute("src", "../../images/dice-" + randomNumber3 + ".png");
        dice1.setAttribute("alt", `dice face ${randomNumber3}`);
        allDices.appendChild(dice3)

        const sum = randomNumber1 + randomNumber2 + randomNumber3


        if (randomNumber1 + randomNumber2 + randomNumber3 === 12) {
            result.innerHTML = `The sum of ${randomNumber1}, ${randomNumber2}, 
            and ${randomNumber3} is ${sum}. Congrads! You won! `;
            attempts += 3;
        } else {
            result.innerHTML = `The sum of ${randomNumber1}, ${randomNumber2}, 
            and ${randomNumber3} is ${sum}. ${attempts < 2 ? "Try again!" : ""}`;
            attempts += 1;
            trialCount.innerText = attempts
        }

        if (attempts === 3) {
            buttonEl.disabled = true
            let gameLost = document.createElement('p').innerText = `You lost the game.`
            result.append(gameLost)
        }
    }, 1000);
}


const levelThree = () => {
    let gameTitle = document.querySelector('.gameNameHeading')
    gameTitle.innerText = "Roll the dice";
    gameTitle.className = "gameTitle"

    let diceImg = document.createElement('img');
    diceImg.src = "../../images/rolling-dices.png";
    diceImg.alt = "dice image"
    diceImg.className = "diceImage"
    gameTitle.appendChild(diceImg)

    document.querySelector('.gameDescription').innerText = "You have three opportunities to win this game " +
        "and go to your next airport destination. You will chose enter the target number and then roll the 3 dices three " +
        "by pressing the button. If the summ of three numbers is equal to the target no. You will win.";

    let targetNo = document.createElement('p');
    targetNo.className = "targetValue"
    targetNo.innerText = `Target Number: 12`;
    gameDiv.appendChild(targetNo)

    addButton()

    buttonEl.addEventListener('click', rollDice)
}