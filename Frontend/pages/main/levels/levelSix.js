let playerInputSeq;
let attempts = 0

let result = document.querySelector('.result')
let trialCount = document.querySelector('.trials')
let playerWon = false

const generateRandomSequence = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';

    for (let i = 0; i < 8; i++) {
        // Pick a random index between 0 and 25
        const randomIndex = Math.floor(Math.random() * chars.length);
        // Append the character at that index to the result
        result += chars[randomIndex];
    }

    return result;
}


const addButton = () => {
    buttonEl = document.createElement("button")
    buttonEl.className = "playBtn"
    buttonEl.innerHTML = "Play"
    gameDiv.appendChild(buttonEl)
}

const playerInput = () => {
    playerInputSeq = document.createElement('input');
    playerInputSeq.type = 'text';
    playerInputSeq.id = 'playerInput';
    playerInputSeq.placeholder = 'Enter sequence...';

    gameDiv.appendChild(playerInputSeq);
}

const handleShowSequence = () => {
    // Randon sequence created

    let seq = generateRandomSequence();
    console.log("seq", seq)

    //Sequence repeated/written by user in the input field
    const randSequence = document.createElement('p')
    randSequence.innerText = seq;
    randSequence.className = "sequence"
    gameDiv.appendChild(randSequence)

    setTimeout(() => {
        randSequence.innerText = "";

        playerInput()
    }, 8000)

    if (playerInputSeq.value === seq) {
        result.textContent = `The player's number ${playerInput} and ${seq} matches.Congrads! You won! `;
        attempts = 3
        playerWon = true
    } else {
        attempts += 1;
        result.textContent = `The player's number ${playerInputSeq.value} and ${randSequence} does not match.
            ${attempts <= 2 ? "Please try again" : ""}`
        trialCount.innerText = attempts
    }


}

const levelSix = () => {
    let gameTitle = document.querySelector('.gameNameHeading')
    gameTitle.innerText = "Sequence Memory";
    gameTitle.className = "gameTitle"

    document.querySelector('.gameDescription').innerText =
        "You have three opportunities to win this game and go to your next airport destination. A random sequence of 8 " +
        "capital alphabets will be displayed for 8 seconds, after that you will have to type the sequence.";

    let buttonDescription = document.createElement('p')
    buttonDescription.innerText = "Click button to see the sequence"
    buttonDescription.className = "buttonDescription"
    gameDiv.appendChild(buttonDescription)

    addButton()

    buttonEl.addEventListener("click", handleShowSequence);
}