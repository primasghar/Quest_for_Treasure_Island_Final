let riddlesArray;
let chosenRiddle;
let playerAnsInput;

let submitBtnEl;

let result = document.querySelector('.result')
let trialCount = document.querySelector('.trials')

let attempts = 0
let playerWon = false

//fetching all riddles from BE
const fetchRiddles = async () => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/riddles`)
        return await response.json();
    } catch (error) {
        console.log(error.message);
    }
};

//Creating p element to display riddle text

const riddleEl = (riddleText) => {
    let riddle = document.createElement('p')
    riddle.className = "riddle"
    riddle.innerText = riddleText
    gameDiv.appendChild(riddle)
}

//Creating button element, that when clicked will display a riddle

const showRiddleBtn = () => {
    btnEl = document.createElement("button")
    btnEl.className = "riddleBtn"
    btnEl.innerHTML = "Show Riddle"
    gameDiv.appendChild(btnEl)
}

//Creating button element, that when clicked will submit player's ans and display result.

const submitBtn = () => {
    submitBtnEl = document.createElement("button")
    submitBtnEl.className = "submitBtn"
    submitBtnEl.innerHTML = "Submit"
    gameDiv.appendChild(submitBtnEl)

    submitBtnEl.addEventListener("click", handleSubmitRiddleAnswer);
}

// Creating input element, where user can write their answer

const playerAnswerEl = () => {
    playerAnsInput = document.createElement('input');
    playerAnsInput.type = 'text';
    playerAnsInput.id = 'playerInput';
    playerAnsInput.placeholder = 'Enter sequence...';
    gameDiv.appendChild(playerAnsInput);
}

// function  handling display of riddle text
const handleShowRiddle = () => {
    let availableRiddles = [...riddlesArray]
    let riddleText;

    const randomIndex = Math.floor(Math.random() * availableRiddles.length);

    chosenRiddle = availableRiddles.splice(randomIndex, 1)[0];
    console.log("riddle", chosenRiddle)

    riddleText = chosenRiddle[1];

    riddleEl(riddleText)

    playerAnsInput.disabled = false;
    submitBtnEl.disabled = false;
}

// function  handling submitting of player's answer and showing results.
const handleSubmitRiddleAnswer = () => {
    let playerAnswered = playerAnsInput.value.trim().toUpperCase()
    let correctAnswer = chosenRiddle[2].toUpperCase()

    btnEl.disabled = true;
    submitBtnEl.disabled = true;

    if (playerAnswered === correctAnswer) {
        result.textContent = `You answered correctly. Your answer ${playerAnswered} matches the correct answer ${correctAnswer}. Congratulations! You won! `;
        attempts = 3
        playerWon = true
    } else {
        attempts += 1;
        trialCount.innerText = attempts

        if (attempts <= 2) {
            result.textContent = `Your answer ${playerAnswered} is incorrect. The correct answer is ${correctAnswer}. Please try again. \n 
            Press "Show Riddle" button to see the new riddle. Good luck!`
            btnEl.disabled = false
            playerAnsInput.value = ""
        } else {
            btnEl.disabled = true
            result.textContent = `Your answer ${playerAnswered} does not match ${correctAnswer}. `
        }

    }

    if (attempts === 3) {
        btnEl.disabled = true
        if (playerWon === false) {
            let gameLost = document.createElement('p').innerText = `Game Over!.`
            result.append(gameLost)
        }
    }
}


const levelSeven = async () => {
    let gameTitle = document.querySelector('.gameNameHeading')
    gameTitle.innerText = "Riddles";
    gameTitle.className = "gameTitle"

    document.querySelector('.gameDescription').innerText =
        "You have three opportunities to win this game and go to your next airport destination. " +
        "Please click the button below and answer the riddle correctly.";

    riddlesArray = await fetchRiddles()
    console.log(riddlesArray)

    showRiddleBtn()
    btnEl.addEventListener("click", handleShowRiddle);

    playerAnswerEl()
    playerAnsInput.disabled = true;

    submitBtn()
    submitBtnEl.disabled = true;

    submitBtnEl.addEventListener("click", handleSubmitRiddleAnswer)

}