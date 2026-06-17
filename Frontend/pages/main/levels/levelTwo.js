import {gameTitle, gameDescription, createSelectElement, createButtonElement} from '../../../utils/functions.js'

let selectEl;
let buttonEl;

let playerChoice;
let computerChoice;

let playerWon = "No";
let attempts = 0;

let result = document.querySelector('.result');
let trialCount = document.querySelector('.trials');

let optionsArray = [{value: "", nodeText: "-- Player's choice --"},
    {value: "ROCK", nodeText: "ROCK"},
    {value: "PAPER", nodeText: "PAPER"},
    {value: "SCISSORS", nodeText: "SCISSORS"}];

const runGame = () => {
    const options_list = ["ROCK", "PAPER", "SCISSORS"]
    const choiceNumber = Math.floor(Math.random() * 3);

    computerChoice = options_list[choiceNumber];
    playerChoice = selectEl.value;


    if (playerChoice === "ROCK" || playerChoice === "PAPER" || playerChoice === "SCISSORS") {

        attempts += 1;
        trialCount.innerHTML = `(${attempts})`;

        if (playerChoice === "ROCK" && computerChoice === "SCISSORS" ||
            playerChoice === "PAPER" && computerChoice === "ROCK" ||
            playerChoice === "SCISSORS" && computerChoice === "PAPER") {

            playerWon = "Yes"
            attempts = 3
            selectEl.disabled = true;
            buttonEl.disabled = true;

            result.textContent = `You choose: ${playerChoice}. Computer choose: ${computerChoice}. Congrads! You win! 🎉🏆.`

        } else if (computerChoice === "ROCK" && playerChoice === "SCISSORS" ||
            computerChoice === "PAPER" && playerChoice === "ROCK" ||
            computerChoice === "SCISSORS" && playerChoice === "PAPER") {

            playerWon = "No"

            if (attempts < 3) {
                result.textContent = `You choose: ${playerChoice}. Computer choose: ${computerChoice}. \r You lose! 😢. ${attempts <= 2 ? " Please try again!" : ""}`
            }

        } else if (computerChoice === playerChoice) {

            playerWon = "Draw"

            if (attempts < 3) {
                result.textContent = `You choose: ${playerChoice}. Computer choose: ${computerChoice}. \r It's a draw! 🤝. ${attempts <= 2 ? " Please try again!" : ""}`
            }

        }
    } else {
        alert("Please choose from given option")
    }

    if (attempts === 3 && (playerWon === "No" || playerWon === "Draw")) {
        selectEl.disabled = true;
        buttonEl.disabled = true;
        result.textContent = `You choose: ${playerChoice}. Computer choose: ${computerChoice}. \r You lose! 😢 GAME OVER!`
    }

}

const levelTwo = (gameDiv) => {
    gameTitle("ROCK, PAPER, SCISSORS")
    gameDescription("Select ROCK, PAPER, or SCISSORS.")

    selectEl = createSelectElement("selectOptions", optionsArray);
    gameDiv.appendChild(selectEl)

    buttonEl = createButtonElement("playBtn", "Play")
    buttonEl.addEventListener("click", runGame);
    gameDiv.appendChild(buttonEl)
}

export default levelTwo