import {gameTitle, gameDescription, createSelectElement, createButtonElement} from '../../../utils/functions.js'

let selectEl;
let flipButtonEl;

let coin;

let isFlipping = false;
let resultText = "";
let attempts = 0;

let coinContainer;

let result = document.querySelector('.result');
let trialCount = document.querySelector('.trials');

const optionsArray = [{value: "", nodeText: "-- Player's choice --"},
    {value: "HEADS", nodeText: "HEADS"},
    {value: "TAILS", nodeText: "TAILS"}];


const addCoin = (gameDiv) => {

    coinContainer = document.createElement('div');
    coinContainer.className = "coinContainer";
    gameDiv.appendChild(coinContainer);
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

const handleFlipCoin = () => {
    const chosenOption = selectEl.value;

    if (chosenOption !== "HEADS" && chosenOption !== "TAILS") {
        alert("Please choose an option");
        return;
    }

    if (isFlipping || attempts >= 3) return;

    isFlipping = true;
    attempts += 1;
    trialCount.textContent = attempts;
    result.textContent = '';
    coin.classList.add('flipping');

    const isHeads = Math.random() < 0.5;

    setTimeout(() => {
        resultText = isHeads ? 'HEADS' : 'TAILS';
        coin.style.transform = isHeads ? 'rotateY(0deg)' : 'rotateY(180deg)';

        if (chosenOption === resultText) {
            result.textContent = `You chose: ${chosenOption}. Coin flipped: ${resultText}. You win! 🎉🏆`;
            selectEl.disabled = true;
            flipButtonEl.disabled = true;
        } else if (attempts >= 3) {
            result.textContent = `You chose: ${chosenOption}. Coin flipped: ${resultText}. No attempts left! 🔄`;
            selectEl.disabled = true;
            flipButtonEl.disabled = true;
        } else {
            result.textContent = `You chose: ${chosenOption}. Coin flipped: ${resultText}. Try again! 🔄 (${3 - attempts} left)`;
        }

        coin.classList.remove('flipping');
        isFlipping = false;
    }, 2000);
};

const levelOne = (gameDiv) => {
    gameTitle("FLIP THE COIN")
    gameDescription("Select HEADS or TAILS.")

    selectEl = createSelectElement("selectOptions", optionsArray)
    gameDiv.appendChild(selectEl)

    flipButtonEl = createButtonElement("playBtn", "FLIP")
    flipButtonEl.addEventListener("click", handleFlipCoin)
    gameDiv.appendChild(flipButtonEl)

    addCoin(gameDiv);

}

export default levelOne;