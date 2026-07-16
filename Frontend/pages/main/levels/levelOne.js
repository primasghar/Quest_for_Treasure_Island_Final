import {
    gameTitle,
    createParagraphElement,
    createSelectElement,
    createButtonElement,
    showResultCard, createDivElement
} from '../../../utils/functions.js'

let levelOneContainer;
let describeGamePara;
let selectEl;
let flipButtonEl;

let coin;

let isFlipping = false;
let resultText = "";
let attempts = 0;

let coinContainer;

const optionsArray = [{value: "", nodeText: "-- Player's choice --"},
    {value: "HEADS", nodeText: "HEADS"},
    {value: "TAILS", nodeText: "TAILS"}];

// Creates the coin
const addCoin = () => {

    coinContainer = document.createElement('div');
    coinContainer.className = "coinContainer";
    levelOneContainer.appendChild(coinContainer);

    coin = document.createElement('div');
    coin.className = "coin";
    coinContainer.appendChild(coin)

    let heads = document.createElement('div');
    heads.className = "heads";
    heads.innerText = "H"
    coin.appendChild(heads)

    let tails = document.createElement('div');
    tails.className = "tails";
    tails.innerText = "T"
    coin.appendChild(tails)
}

const handleFlipCoin = (onWin, onLose) => {
    const chosenOption = selectEl.value;

    if (chosenOption !== "HEADS" && chosenOption !== "TAILS") {
        alert("Please choose an option");
        return;
    }

    flipButtonEl.disabled = true;
    selectEl.disabled = true;

    if (isFlipping || attempts >= 3) return;

    isFlipping = true;
    attempts += 1;
    coin.classList.add('flipping');

    let isHeads = Math.random() < 0.5;

    setTimeout(function () {

        resultText = isHeads ? 'HEADS' : 'TAILS';
        coin.style.transform = isHeads ? 'rotateY(0deg)' : 'rotateY(180deg)';

        if (chosenOption === resultText) {
            showResultCard("win", `You chose: ${chosenOption}. Coin flipped: ${resultText}.`)
            onWin();
        } else if (attempts >= 3) {
            showResultCard("lose", `You chose: ${chosenOption}. Coin flipped: ${resultText}. No attempts left!`)
            onLose()
        } else {
            flipButtonEl.disabled = false;
            selectEl.disabled = false;
            showResultCard("try", `You chose: ${chosenOption}. Coin flipped: ${resultText}. You lose. (${3 - attempts} attempts left) Good luck!`)
        }

        coin.classList.remove('flipping');
        isFlipping = false;
    }, 3000);

};

// --------------------------------Main Function------------------------

const levelOne = (gameDiv, onWin, onLose) => {

    gameTitle("FLIP THE COIN")

    levelOneContainer = createDivElement("game1Container")
    gameDiv.appendChild(levelOneContainer)

    describeGamePara = createParagraphElement("game1Description", "Select HEADS or TAILS and Press the button to flip the coin.")
    levelOneContainer.appendChild(describeGamePara)

    selectEl = createSelectElement("level1Select", optionsArray)
    levelOneContainer.appendChild(selectEl)

    flipButtonEl = createButtonElement("flipBtn", "FLIP")
    flipButtonEl.addEventListener("click", () => {
        handleFlipCoin(onWin, onLose)
    })
    levelOneContainer.appendChild(flipButtonEl)

    addCoin(levelOneContainer);
}

export default levelOne;