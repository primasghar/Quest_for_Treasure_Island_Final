import {
    gameTitle,
    createSelectElement,
    createButtonElement,
    showResultCard, createDivElement, createParagraphElement, incrementAttempts, warningMessageModal
} from '../../../utils/functions.js'
import {
    getPlayerProgressData
} from '../../../utils/localStorageUtilityFunctions.js'

let levelTwoContainer;
let describeGame2Para;
let selectEl;
let buttonEl;

let playerChoice;
let computerChoice;

let playerWon = "No";

let optionsArray = [{value: "", nodeText: "-- Player's choice --"},
    {value: "ROCK", nodeText: "ROCK"},
    {value: "PAPER", nodeText: "PAPER"},
    {value: "SCISSORS", nodeText: "SCISSORS"}];

const playGame = async (onWin, onLose) => {
    let player = getPlayerProgressData();
    let attempts = player.attempts;

    const options_list = ["ROCK", "PAPER", "SCISSORS"]
    const choiceNumber = Math.floor(Math.random() * 3);

    computerChoice = options_list[choiceNumber];
    playerChoice = selectEl.value;


    if (playerChoice === "ROCK" || playerChoice === "PAPER" || playerChoice === "SCISSORS") {

        await incrementAttempts()

        if (playerChoice === "ROCK" && computerChoice === "SCISSORS" ||
            playerChoice === "PAPER" && computerChoice === "ROCK" ||
            playerChoice === "SCISSORS" && computerChoice === "PAPER") {

            playerWon = "Yes"
            selectEl.disabled = true;
            buttonEl.disabled = true;

            showResultCard("win", `You choose: ${playerChoice}. Computer choose: ${computerChoice}`)
            onWin()

        } else if (computerChoice === "ROCK" && playerChoice === "SCISSORS" ||
            computerChoice === "PAPER" && playerChoice === "ROCK" ||
            computerChoice === "SCISSORS" && playerChoice === "PAPER") {

            playerWon = "No"

            if (attempts < 2) {
                showResultCard("try", `You choose: ${playerChoice}. Computer choose: ${computerChoice}.`)
            }

        } else if (computerChoice === playerChoice) {

            playerWon = "Draw"

            if (attempts < 2) {
                showResultCard("draw", `You choose: ${playerChoice}. Computer choose: ${computerChoice}.`)
            }

        }
    } else {
        warningMessageModal("Please select a valid option.")
    }

    if (attempts === 2 && (playerWon === "No" || playerWon === "Draw")) {
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