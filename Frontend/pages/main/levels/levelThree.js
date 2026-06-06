// let targetInput = document.createElement('input');
// targetInput.setAttribute('type', 'text');
// gameDiv.appendChild(targetInput);

const addButton = () => {
    buttonEl = document.createElement("button")
    buttonEl.className = "playBtn"
    buttonEl.innerHTML = "Roll"
    gameDiv.appendChild(buttonEl)

}

const rollDice = () => {

}


const levelThree = () => {
    let gameTitle = document.querySelector('.gameNameHeading')
    gameTitle.innerText = "Roll the dice";
    gameTitle.className = "gameTitle"

    let diceImg = document.createElement('img');
    diceImg.src = "../../images/dice-rolling.png";
    diceImg.alt = "dice image"
    diceImg.className = "diceImage"
    gameTitle.appendChild(diceImg)

    document.querySelector('.gameDescription').innerText = "You have three opportunities to win this game " +
        "and go to your next airport destination. You will chose enter the target number and then roll the dice three " +
        "by pressing the button. If the summ of three numbers is equal to the target no. You will win.";
    let targetNo = document.createElement('p');
    targetNo.className = "targetValue"
    targetNo.innerText = `Target Number: 12`;
    gameDiv.appendChild(targetNo)
    addButton()
}