import {
    gameTitle,
    createParagraphElement,
    createSelectElement,
    createButtonElement,
    showResultCard, createDivElement, incrementAttempts, warningMessageModal
} from '../../../utils/functions.js'

let levelOneContainer;
let describeGamePara;
let selectEl;
let flipButtonEl;

let coin;

let isFlipping = false;
let resultText = "";

let coinContainer;

const optionsArray = [{value: "", nodeText: "-- Player's choice --"},
    {value: "HEADS", nodeText: "HEADS"},
    {value: "TAILS", nodeText: "TAILS"}];

// Creates the coin
const addCoin = () => {

    coinContainer = createDivElement('coinContainer')
    levelOneContainer.appendChild(coinContainer);

    coin = createDivElement('coin')
    coin.className = "coin";
    coinContainer.appendChild(coin)

    let heads = createDivElement('heads')
    heads.innerText = "H"
    coin.appendChild(heads)

    let tails = createDivElement('tails')
    tails.innerText = "T"
    coin.appendChild(tails)
}

const handleFlipCoin = async (onWin, onLose) => {
    let player = JSON.parse(localStorage.getItem('playerDetails'));
    let attempts = player.attempts;

    const chosenOption = selectEl.value;

    if (chosenOption !== "HEADS" && chosenOption !== "TAILS") {
        warningMessageModal("Please select a valid option.")
        return;
    }

    flipButtonEl.disabled = true;
    selectEl.disabled = true;

    if (isFlipping || attempts >= 3) return;

    isFlipping = true;
    await incrementAttempts()
    coin.classList.add('flipping');

    let isHeads = Math.random() < 0.5;

    setTimeout(function () {

        resultText = isHeads ? 'HEADS' : 'TAILS';
        coin.style.transform = isHeads ? 'rotateY(0deg)' : 'rotateY(180deg)';

        if (chosenOption === resultText && attempts < 3) {
            showResultCard("win", `You chose: ${chosenOption}. Coin flipped: ${resultText}.`)
            onWin();
        } else if (chosenOption !== resultText && attempts >= 2) {
            showResultCard("lose", `You chose: ${chosenOption}. Coin flipped: ${resultText}. No attempts left!`)
            onLose()
        }

        if (chosenOption !== resultText && attempts < 2) {
            flipButtonEl.disabled = false;
            selectEl.disabled = false;
            showResultCard("try", `You chose: ${chosenOption}. Coin flipped: ${resultText}. You lose.`)
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

    describeGamePara = createParagraphElement("game1Description", "Select HEADS or TAILS and press Flip button. To win your choice should match computer's choice.")
    levelOneContainer.appendChild(describeGamePara)

    selectEl = createSelectElement("level1Select", optionsArray)
    levelOneContainer.appendChild(selectEl)

    flipButtonEl = createButtonElement("playBtn", "FLIP")
    flipButtonEl.addEventListener("click", () => {
        handleFlipCoin(onWin, onLose)
    })
    levelOneContainer.appendChild(flipButtonEl)

    addCoin(levelOneContainer);
}

export default levelOne;