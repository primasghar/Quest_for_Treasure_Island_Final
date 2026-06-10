let selectEl;
let selectNoEl;
let attempts = 0

let result = document.querySelector('.result')
let trialCount = document.querySelector('.trials')
let playerWon = false

const addEvenOddSelect = (selectionDiv) => {
    let evenOddDiv = document.createElement('div')
    evenOddDiv.className = "evenOddDiv"
    selectionDiv.appendChild(evenOddDiv)

    let EvenOddSelectLabelEl = document.createElement('label');
    EvenOddSelectLabelEl.setAttribute("for", "selectTargetOpt");
    EvenOddSelectLabelEl.className = "selectionLabel"
    EvenOddSelectLabelEl.textContent = "Player's target: ";
    EvenOddSelectLabelEl.style.color = "black";
    evenOddDiv.appendChild(EvenOddSelectLabelEl)

    selectEl = document.createElement('select');
    selectEl.id = "selectTargetOpt";
    evenOddDiv.appendChild(selectEl);

    let opt = document.createElement("option");
    opt.setAttribute("value", "");
    let node = document.createTextNode("--Even/Odd-- ");
    opt.appendChild(node);
    selectEl.appendChild(opt)

    let opt1 = document.createElement("option");
    opt1.className = "opts"
    opt1.setAttribute("value", "EVEN");
    let node1 = document.createTextNode("EVEN");
    opt1.appendChild(node1);
    selectEl.appendChild(opt1)

    let opt2 = document.createElement("option");
    opt2.setAttribute("value", "ODD");
    let node2 = document.createTextNode("ODD");
    opt2.appendChild(node2);
    selectEl.appendChild(opt2)

}

const addNumberSelect = (selectionDiv) => {
    let numberDiv = document.createElement('div')
    numberDiv.className = "numberDiv"
    selectionDiv.appendChild(numberDiv)


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


const runEvenOdd = () => {
    if (selectEl.value === "") {
        alert('Please select EVEN or ODD')
    } else if (selectNoEl.value === "") {
        alert('Please select a Number')
    } else {
        setTimeout(() => {
            let playerTarget = selectEl.value;
            let playerSelectedNo = selectNoEl.value;

            let computerSelectedNo = Math.floor(Math.random() * 10 + 1)
            let computerChoice = document.createElement('p')
            computerChoice.className = "computerChoice"
            computerChoice.innerText = `Computer's choice: ${computerSelectedNo.toString()} `
            gameDiv.appendChild(computerChoice)
            let sumOfNos = +playerSelectedNo + +computerSelectedNo;


            if (playerTarget === "EVEN" && sumOfNos % 2 === 0) {
                result.textContent = `The sum of ${playerSelectedNo} and ${computerSelectedNo} is ${sumOfNos}, which is an Even Number.Congrads! You won! `;
                attempts = 3
                playerWon = true
            } else if (playerTarget === "ODD" && sumOfNos % 2 !== 0) {
                result.textContent = `The sum of ${playerSelectedNo} and ${computerSelectedNo} is ${sumOfNos}, which is Odd Number. Congrads! You won! `;
                attempts = 3
                playerWon = true
            } else {
                attempts += 1;
                result.textContent = `The sum of ${playerSelectedNo} and ${computerSelectedNo} is ${sumOfNos}, which is not an ${playerTarget} number.
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

        }, 1000)
    }

}

const levelFour = () => {
    let gameTitle = document.querySelector('.gameNameHeading')
    gameTitle.innerText = "Odds Evens";
    gameTitle.className = "gameTitle"

    document.querySelector('.gameDescription').innerText = "You have three opportunities to win this game " +
        "and go to your next airport destination.\n First select between 'EVEN' or 'ODD'. " +
        "Then select numbers from (1-10).Your selected number will be added to the computer's " +
        "selected number. If their sum matches your EVEN or ODD choice you will win.";

    let selectionDiv = document.createElement('div')
    selectionDiv.className = "selectionDiv"
    gameDiv.appendChild(selectionDiv)

    addEvenOddSelect(selectionDiv)

    addNumberSelect(selectionDiv)

    addButton()

    buttonEl.addEventListener('click', runEvenOdd)
}