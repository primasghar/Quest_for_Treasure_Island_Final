let coin;
let result;
//Adding functionality-----------------------
let isFlipping = false;
let resultText = "";
let attempts = 0;
let selectEl;
let coinContainer;

const addSelectElement = () => {
    // Creating select and its options
    selectEl = document.createElement('Select');
    selectEl.id = "selectOptions";
    gameDiv.appendChild(selectEl);

    let opt = document.createElement("option");
    opt.setAttribute("value", "");
    let node = document.createTextNode("--Please choose an option--");
    opt.appendChild(node);
    selectEl.appendChild(opt)

    let opt1 = document.createElement("option");
    opt1.setAttribute("value", "HEADS");
    let node1 = document.createTextNode("HEADS");
    opt1.appendChild(node1);
    selectEl.appendChild(opt1)

    let opt2 = document.createElement("option");
    opt2.setAttribute("value", "TAILS");
    let node2 = document.createTextNode("TAILS");
    opt2.appendChild(node2);
    selectEl.appendChild(opt2)
}

const addCoin = () => {
    //Creating coin container (H and T)
    coinContainer = document.createElement('div');
    coinContainer.className = "coinContainer";
    gameDiv.appendChild(coinContainer);
    coin = document.createElement('div');
    coin.className = "coin";
    coinContainer.appendChild(coin)
    let heads = document.createElement('div');
    heads.className = "heads";
    heads.innerText = "H"
    coin.appendChild(heads)
    let tails = document.createElement('div');
    tails.className = "tails";
    tails.innerText = "T"
    coin.appendChild(tails)
}

const flipCoin = () => {
    console.log('flipCoin', attempts)

    const chosenOption = selectEl.value;
    if (chosenOption === "HEADS" || chosenOption === "TAILS") {
        coin.addEventListener('click', flipCoin)
    } else {
        alert("Please choose from given option")
    }

    if (attempts < 3 && selectEl.value !== resultText) {
        if (isFlipping) return;
        isFlipping = true;
        result.textContent = '';
        coin.classList.add('flipping');
        let isHeads = Math.random() < 0.5;

        setTimeout(function () {
            if (isHeads) {
                resultText = 'HEADS';
                coin.style.transform = 'rotateY(0deg)';
            } else {
                resultText = 'TAILS';
                coin.style.transform = 'rotateY(180deg)';
            }

            result.textContent = `You chose: ${selectEl.value}. Coin flipped: ${resultText}. 
            ${selectEl.value === resultText ? "You won!" : "You lost!"}`

            if (selectEl.value !== resultText) {
                attempts += 1;
            } else {
                  attempts = 3;
            }

            coin.classList.remove('flipping');
            isFlipping = false;
        }, 2000);
    }
}

const levelOne = () => {
    document.querySelector('.gameNameHeading').innerText = "Flip the coin";
    document.querySelector('.gameDescription').innerText = "You have three opportunities to win this game " +
        "and go to your next airport destination. Select HEADS or TAILS to flip the coin.";

    addSelectElement();
    addCoin();

    selectEl.addEventListener("change", flipCoin);

    result = document.querySelector('.result')
}