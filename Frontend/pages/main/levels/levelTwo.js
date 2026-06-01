let selectEl;
let playerChoice;
let computerChoice;
let resultOutcome;
let attempts = 0;

const addSelectElement = () => {
    // Creating select and its options
    selectEl = document.createElement('Select');
    selectEl.id = "selectOptions";
    gameDiv.appendChild(selectEl);

    let opt = document.createElement("option");
    opt.setAttribute("value", "");
    let node = document.createTextNode("-- Player's choice --");
    opt.appendChild(node);
    selectEl.appendChild(opt)

    let opt1 = document.createElement("option");
    opt1.setAttribute("value", "ROCK");
    let node1 = document.createTextNode("ROCK");
    opt1.appendChild(node1);
    selectEl.appendChild(opt1)

    let opt2 = document.createElement("option");
    opt2.setAttribute("value", "PAPER");
    let node2 = document.createTextNode("PAPER");
    opt2.appendChild(node2);
    selectEl.appendChild(opt2)

    let opt3 = document.createElement("option");
    opt3.setAttribute("value", "SCISSORS");
    let node3 = document.createTextNode("SCISSORS");
    opt3.appendChild(node3);
    selectEl.appendChild(opt3)
}

const runGame = () => {
    const options_list = ["ROCK", "PAPER", "SCISSORS"]
    const choiceNumber = Math.floor(Math.random() * 3);

    computerChoice = options_list[choiceNumber];
    playerChoice = selectEl.value;

        if (playerChoice === "ROCK" && computerChoice === "SCISSORS" ||
            playerChoice === "PAPER" && computerChoice === "ROCK" ||
            playerChoice === "SCISSORS" && computerChoice === "PAPER") {
            resultOutcome = "You have won"
        } else if (computerChoice === "ROCK" && playerChoice === "SCISSORS" ||
            computerChoice === "PAPER" && playerChoice === "ROCK" ||
            computerChoice === "SCISSORS" && playerChoice === "PAPER") {
            resultOutcome = "You have lost"
            attempts += 1
        } else if (computerChoice === playerChoice) {
            resultOutcome = "It's a tie."
        }

        // if (attempts < 3){
        // if (attempts < 3){
        //     print("Please try again!\n")
        // }

    if(playerChoice === ""){
        alert("Please choose from the given options")

    }

    result.textContent = resultOutcome;

}

const levelTwo = () => {
    document.querySelector('.gameNameHeading').innerText = "ROCK, PAPER, SCISSORS";
    document.querySelector('.gameDescription').innerText = "You have three opportunities to win this game " +
        "and go to your next airport destination. Select ROCK, PAPER, or SCISSORS.";

    addSelectElement();

    selectEl.addEventListener("change", runGame);

    result = document.querySelector('.result')
}