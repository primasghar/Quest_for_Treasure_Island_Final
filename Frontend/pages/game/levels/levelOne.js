import {
    gameTitle,
    showResultCard,
    incrementAttempts
} from '../utils/utilityFunctions.js'
import {
    createButtonElement,
    createSelectElement,
    createDivElement,
    createParagraphElement,
} from '../utils/domFunctions.js'

import { warningMessageModal } from '../utils/modals.js'
import {
    getPlayerProgressData
} from '../utils/localStorageFunctions.js'
import { Attempts } from "../utils/enums.js";

let levelOneContainer;
let describeGamePara;
let selectEl;
let flipButtonEl;

let coin;

let isFlipping = false;
let resultText = "";

let coinContainer;

const Selection = {
    HEADS: "HEADS",
    TAILS: "TAILS"
}

const optionsArray = [{value: "", nodeText: "-- Player's choice --"},
    {value: Selection.HEADS, nodeText: Selection.HEADS},
    {value: Selection.TAILS, nodeText: Selection.TAILS}];

// Creates the coin
const addCoin = () => {
    coinContainer = createDivElement('coinContainer')
    levelOneContainer.appendChild(coinContainer);

    coin = createDivElement('coin')
    coin.className = "coin";
    coinContainer.appendChild(coin)

    let heads = createDivElement('heads')
    coin.appendChild(heads)

    let tails = createDivElement('tails')
    coin.appendChild(tails)
}

const handleFlipCoin = async (onWin, onLose) => {
    let player = getPlayerProgressData();
    let attempts = player.attempts;

    const chosenOption = selectEl.value;

    if (chosenOption !== Selection.HEADS && chosenOption !== Selection.TAILS) {
        warningMessageModal("Please select a valid option.")
        return;
    }

    flipButtonEl.disabled = true;
    selectEl.disabled = true;

    if (isFlipping || attempts >= Attempts.THIRD) {
        return;
    }

    isFlipping = true;
    await incrementAttempts()
    coin.classList.add('flipping');

    let isHeads = Math.random() < 0.5;

    setTimeout(function () {
        resultText = isHeads ? Selection.HEADS : Selection.TAILS;
        coin.style.transform = isHeads ? 'rotateY(0deg)' : 'rotateY(180deg)';

        if (chosenOption === resultText && attempts < Attempts.THIRD) {
            showResultCard("win", `You chose: ${chosenOption}. Coin flipped: ${resultText}.`)
            onWin();
        } else if (chosenOption !== resultText && attempts >= Attempts.SECOND) {
            showResultCard("lose", `You chose: ${chosenOption}. Coin flipped: ${resultText}. No attempts left!`)
            onLose()
        }

        if (chosenOption !== resultText && attempts < Attempts.SECOND) {
            flipButtonEl.disabled = false;
            selectEl.disabled = false;
            showResultCard("try", `You chose: ${chosenOption}. Coin flipped: ${resultText}. You lose.`)
        }

        coin.classList.remove('flipping');
        isFlipping = false;
    }, 2100);

};

// --------------------------------Main Function------------------------

const levelOne = (gameDiv, onWin, onLose) => {

    gameTitle("FLIP THE COIN")

    levelOneContainer = createDivElement("game1Container")
    gameDiv.appendChild(levelOneContainer)

    describeGamePara = createParagraphElement("game1Description", "Select HEADS or TAILS and press button. To win, your choice should match computer's choice.")
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