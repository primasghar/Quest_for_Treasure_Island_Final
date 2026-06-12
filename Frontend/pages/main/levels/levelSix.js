let playerInputSeq;
let seq;
let randSequence;

let btnEl;
let submitSeqBtnEl;

let result = document.querySelector('.result')
let trialCount = document.querySelector('.trials')

let attempts = 0
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

const showSeqBtn = () => {
    btnEl = document.createElement("button")
    btnEl.className = "playBtn"
    btnEl.innerHTML = "Play"
    gameDiv.appendChild(btnEl)
}

const submitSeqBtn = () => {
    submitSeqBtnEl = document.createElement("button")
    submitSeqBtnEl.className = "submitBtn"
    submitSeqBtnEl.innerHTML = "Submit"
    gameDiv.appendChild(submitSeqBtnEl)

    submitSeqBtnEl.addEventListener("click", handleSubmitSequence);
}

const playerInput = () => {
    playerInputSeq = document.createElement('input');
    playerInputSeq.type = 'text';
    playerInputSeq.id = 'playerInput';
    playerInputSeq.placeholder = 'Enter sequence...';
    gameDiv.appendChild(playerInputSeq);
}

const seqEl = (seq) => {
    randSequence = document.createElement('p')
    randSequence.innerText = seq;
    randSequence.className = "sequence"
    gameDiv.appendChild(randSequence)
}

const handleShowSequence = () => {
    btnEl.disabled = true;
    seq = generateRandomSequence();
    console.log("seq", seq)

    seqEl(seq)

    setTimeout(() => {
        randSequence.innerText = "";
        playerInput()
        submitSeqBtn()


    }, 8000)

}

const handleSubmitSequence = () => {
    console.log("handle submit", playerInputSeq.value, seq)

    const playerGuess = playerInputSeq.value.trim().toUpperCase();

    if (playerGuess === seq) {
        result.textContent = `Your sequence ${playerGuess} matches the sequence${seq}. Congrads! You won! `;
        attempts = 3
        playerWon = true
        submitSeqBtnEl.disabled = true;
    } else {
        attempts += 1;
        trialCount.innerText = attempts

        if (attempts <= 2) {
            result.textContent = `Your sequence ${playerGuess} does not match ${seq}. Please try again`
            btnEl.disabled = false
        } else {
            submitSeqBtnEl.disabled = true;
            btnEl.disabled = true
            result.textContent = `Your sequence ${playerGuess} does not match ${seq}`
        }

    }

    if (attempts === 3) {
        submitSeqBtnEl.disabled = true;
        btnEl.disabled = true
        if (playerWon === false) {
            let gameLost = document.createElement('p').innerText = ` Game Over!.`
            result.append(gameLost)
        }

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

    showSeqBtn()

    btnEl.addEventListener("click", handleShowSequence);

}