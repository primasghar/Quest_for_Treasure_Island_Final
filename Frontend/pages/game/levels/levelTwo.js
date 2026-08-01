import {
    gameTitle,
    showResultCard,
    incrementAttempts
} from '../utils/utilityFunctions.js';
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
import {Attempts} from "../utils/enums.js";

let levelTwoContainer;
let describeGame2Para;
let selectEl;
let buttonEl;

let playerChoice;
let computerChoice;

const GameStatus = {
    NOT_WON : "No",
    WON : "Yes",
    DRAW: "draw"
}
const Selection = {
    ROCK: "ROCK",
    PAPER: "PAPER",
    SCISSORS: "SCISSORS"
}
let playerWon = GameStatus.NOT_WON;

let optionsArray = [{value: "", nodeText: "-- Player's choice --"},
    {value: Selection.ROCK, nodeText: Selection.ROCK},
    {value: Selection.PAPER, nodeText: Selection.PAPER},
    {value: Selection.SCISSORS, nodeText: Selection.SCISSORS}];

const playGame = async (onWin, onLose) => {
    let player = getPlayerProgressData();
    let attempts = player.attempts;

    const options_list = [Selection.ROCK, Selection.PAPER, Selection.SCISSORS]
    const choiceNumber = Math.floor(Math.random() * 3);

    computerChoice = options_list[choiceNumber];
    playerChoice = selectEl.value;


    if (playerChoice === Selection.ROCK || playerChoice === Selection.PAPER || playerChoice === Selection.SCISSORS) {

        await incrementAttempts()

        if (playerChoice === Selection.ROCK && computerChoice === Selection.SCISSORS ||
            playerChoice === Selection.PAPER && computerChoice === Selection.ROCK ||
            playerChoice === Selection.SCISSORS && computerChoice === Selection.PAPER) {

            playerWon = GameStatus.WON
            selectEl.disabled = true;
            buttonEl.disabled = true;

            showResultCard("win", `You choose: ${playerChoice}. Computer choose: ${computerChoice}`)
            onWin()

        } else if (computerChoice === Selection.ROCK && playerChoice === Selection.SCISSORS ||
            computerChoice === Selection.PAPER && playerChoice === Selection.ROCK ||
            computerChoice === Selection.SCISSORS && playerChoice === Selection.PAPER) {

            playerWon = GameStatus.NOT_WON

            if (attempts < Attempts.SECOND) {
                showResultCard("try", `You choose: ${playerChoice}. Computer choose: ${computerChoice}.`)
            }

        } else if (computerChoice === playerChoice) {

            playerWon = GameStatus.DRAW

            if (attempts < Attempts.SECOND) {
                showResultCard("draw", `You choose: ${playerChoice}. Computer choose: ${computerChoice}.`)
            }

        }
    } else {
        warningMessageModal("Please select a valid option.")
    }

    if (attempts === Attempts.SECOND && (playerWon === GameStatus.NOT_WON || playerWon === GameStatus.DRAW)) {
        selectEl.disabled = true;
        buttonEl.disabled = true;
        showResultCard("lose", `Your choose: ${playerChoice}. Computer's choose: ${computerChoice}. No attempts left. You lose.`)
        onLose()
    }
}

// --------------------------------Main Function------------------------

const levelTwo = (gameDiv, onWin, onLose) => {
    gameTitle("ROCK, PAPER, SCISSORS")

    levelTwoContainer = createDivElement("game2Container")
    gameDiv.appendChild(levelTwoContainer)

    describeGame2Para = createParagraphElement("game2Description", "Select ROCK, PAPER, or SCISSORS and press the button.")
    levelTwoContainer.appendChild(describeGame2Para)

    selectEl = createSelectElement("rpsSelectEl", optionsArray);
    levelTwoContainer.appendChild(selectEl)

    buttonEl = createButtonElement("playBtn", "Play")
    buttonEl.addEventListener("click", () => {
        playGame(onWin, onLose)
    });
    levelTwoContainer.appendChild(buttonEl)
}

export default levelTwo