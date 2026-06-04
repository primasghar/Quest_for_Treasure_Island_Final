let selectEl;
let buttonEl;
let playerChoice;
let computerChoice;
let playerWon;
let attempts = 0;
let result = document.querySelector('.result')
let trialCount = document.querySelector('.trials')

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
    opt1.className = "opts"
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

const addButton = ()=>{
    buttonEl = document.createElement("button")
    buttonEl.className = "playBtn"
    buttonEl.innerHTML = "Play"
    gameDiv.appendChild(buttonEl)
    
}

const runGame = () => {
    const options_list = ["ROCK", "PAPER", "SCISSORS"]
    const choiceNumber = Math.floor(Math.random() * 3);
    
    computerChoice = options_list[choiceNumber];
    playerChoice = selectEl.value;


    if (playerChoice === "ROCK" || playerChoice === "PAPER" || playerChoice === "SCISSORS") {
        if (playerChoice === "ROCK" && computerChoice === "SCISSORS" ||
            playerChoice === "PAPER" && computerChoice === "ROCK" ||
            playerChoice === "SCISSORS" && computerChoice === "PAPER") {
            playerWon = "Yes"

        } else if (computerChoice === "ROCK" && playerChoice === "SCISSORS" ||
            computerChoice === "PAPER" && playerChoice === "ROCK" ||
            computerChoice === "SCISSORS" && playerChoice === "PAPER") {
            playerWon = "No"

        } else if (computerChoice === playerChoice) {
            playerWon = "Tie"

        }
    } else {
        alert("Please choose from given option")
    }

    if (attempts < 3) {
        if (playerWon === "No" || playerWon === "Tie") {
            attempts += 1;
            result.textContent = `You have lost. ${attempts <= 2 ? "Please try again" : ""}`
            trialCount.innerHTML = `(${attempts})`;

        } else {
            attempts = 3;
            result.textContent = `Congrads! You won.`
            selectEl.disabled = true;
        }
    }

    if (attempts === 3) {
        selectEl.disabled = true;
        buttonEl.disabled = true;
    }

}

const levelTwo = () => {
    document.querySelector('.gameNameHeading').innerText = "ROCK, PAPER, SCISSORS";
    document.querySelector('.gameDescription').innerText = "You have three opportunities to win this game " +
        "and go to your next airport destination. Select ROCK, PAPER, or SCISSORS.";

    addSelectElement();
    addButton()

    buttonEl.addEventListener("click", runGame);
}