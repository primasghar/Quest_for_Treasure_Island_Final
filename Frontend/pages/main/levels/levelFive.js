let selectNoEl;
let attempts = 0

let result = document.querySelector('.result')
let trialCount = document.querySelector('.trials')
let playerWon = false

const addNumberSelect = () => {

    let numberDiv = document.createElement('div')
    numberDiv.className = "numberDiv"
    gameDiv.appendChild(numberDiv)

    let numberLabelEl = document.createElement('label');
    numberLabelEl.setAttribute("for", "selectNumberOpt");
    numberLabelEl.className = "selectionLabel"
    numberLabelEl.textContent = "Player's choice: ";
    numberLabelEl.style.color = "black";
    numberDiv.appendChild(numberLabelEl)

    selectNoEl = document.createElement('select');
    selectNoEl.id = "selectNumberOpt";
    numberDiv.appendChild(selectNoEl);

    let opt = document.createElement("option");
    opt.setAttribute("value", "");
    let node = document.createTextNode("--Number (1-10)--");
    opt.appendChild(node);
    selectNoEl.appendChild(opt)

    for (let i = 1; i <= 10; i++) {
        let opt = document.createElement("option");
        opt.className = "opts"
        opt.setAttribute("value", `${i}`);
        let node = document.createTextNode(`${i}`);
        opt.appendChild(node);
        selectNoEl.appendChild(opt)
    }

}

const addButton = () => {
    buttonEl = document.createElement("button")
    buttonEl.className = "playBtn"
    buttonEl.innerHTML = "Play"
    gameDiv.appendChild(buttonEl)
}

const handleGuessNo = () => {
    if (selectNoEl.value === "") {
        alert('Please select a Number')
    } else {
        setTimeout(() => {
            let playerSelectedNo = selectNoEl.value;
            let computerSelectedNo = Math.floor(Math.random() * 10 + 1)

            let computerChoice = document.createElement('p')
            computerChoice.className = "computerChoice"
            computerChoice.innerText = `Computer's choice: ${computerSelectedNo.toString()} `
            gameDiv.appendChild(computerChoice)

            if (playerSelectedNo === computerSelectedNo) {
                result.textContent = `The player's number ${playerSelectedNo} and ${computerSelectedNo} matches.Congrads! You won! `;
                attempts = 3
                playerWon = true
            } else {
                attempts += 1;
                result.textContent = `The player's number ${playerSelectedNo} and ${computerSelectedNo} does not match.
            ${attempts <= 2 ? "Please try again" : ""}`
                trialCount.innerText = attempts
            }

            if (attempts === 3) {
                buttonEl.disabled = true
                if (playerWon === false) {
                    let gameLost = document.createElement('p').innerText = `You have lost the game.`
                    result.append(gameLost)
                }

            }

        }, 500)
    }
}

const levelFive = () => {
    let gameTitle = document.querySelector('.gameNameHeading')
    gameTitle.innerText = "Guess the Number";
    gameTitle.className = "gameTitle"

    document.querySelector('.gameDescription').innerText =
        "You have three opportunities to win this game and go to your next airport destination. Select the number, if it matches the computer's selection you will win.";

    addNumberSelect()
    addButton()

    buttonEl.addEventListener('click', handleGuessNo)
}