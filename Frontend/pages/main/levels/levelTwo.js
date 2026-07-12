import {
    gameTitle,
    gameDescription,
    createSelectElement,
    createButtonElement,
    showResultCard, createDivElement, createParagraphElement
} from '../../../utils/functions.js'

let levelTwoContainer;
let describeGame2Para;
let selectEl;
let buttonEl;

let playerChoice;
let computerChoice;

let playerWon = "No";
let attempts = 0;

let optionsArray = [{value: "", nodeText: "-- Player's choice --"},
    {value: "ROCK", nodeText: "ROCK"},
    {value: "PAPER", nodeText: "PAPER"},
    {value: "SCISSORS", nodeText: "SCISSORS"}];

const playGame = (onWin, onLose) => {
    const options_list = ["ROCK", "PAPER", "SCISSORS"]
    const choiceNumber = Math.floor(Math.random() * 3);

    computerChoice = options_list[choiceNumber];
    playerChoice = selectEl.value;


    if (playerChoice === "ROCK" || playerChoice === "PAPER" || playerChoice === "SCISSORS") {

        attempts += 1;

        if (playerChoice === "ROCK" && computerChoice === "SCISSORS" ||
            playerChoice === "PAPER" && computerChoice === "ROCK" ||
            playerChoice === "SCISSORS" && computerChoice === "PAPER") {

            playerWon = "Yes"
            attempts = 3
            selectEl.disabled = true;
            buttonEl.disabled = true;

            showResultCard("win", `You choose: ${playerChoice}. Computer choose: ${computerChoice}`)
            onWin()

        } else if (computerChoice === "ROCK" && playerChoice === "SCISSORS" ||
            computerChoice === "PAPER" && playerChoice === "ROCK" ||
            computerChoice === "SCISSORS" && playerChoice === "PAPER") {

            playerWon = "No"

            if (attempts < 3) {
                showResultCard("try", `You choose: ${playerChoice}. Computer choose: ${computerChoice}. ${attempts <= 2 ? `(${3 - attempts} attempts left) Good luck!` : ""}`)
            }

        } else if (computerChoice === playerChoice) {

            playerWon = "Draw"

            if (attempts < 3) {
                showResultCard("draw", `You choose: ${playerChoice}. Computer choose: ${computerChoice}. ${attempts <= 2 ? `${3 - attempts} attempts left` : ""}`)
            }

        }
    } else {
        alert("Please choose from given option")
    }

    if (attempts === 3 && (playerWon === "No" || playerWon === "Draw")) {
        selectEl.disabled = true;
        buttonEl.disabled = true;
        showResultCard("lose", `Your choose: ${playerChoice}. Computer's choose: ${computerChoice}. No attempts left!.`)
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