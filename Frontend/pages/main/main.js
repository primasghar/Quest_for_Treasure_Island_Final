let newPlayer = JSON.parse(localStorage.getItem('playerDetails'));

console.log(newPlayer);

document.querySelector('.name').innerText = newPlayer['name'];
document.querySelector('.level').innerText = newPlayer['level'];
document.querySelector('.carbon').innerText = newPlayer['carbonPrint'];
document.querySelector('.score').innerText = newPlayer['score'];

// localStorage.removeItem('playerDetails');

const gameDiv = document.querySelector('.gameArea')

if (newPlayer['level'] === 1) {
    document.querySelector('.gameNameHeading').innerText = "Flip the coin";
    document.querySelector('.gameDescription').innerText = "You will have three opportunities to win the game " +
        "and go to your next airport destination. Select HEADS or TAILS and click on the coin to flip it.";
      const result= document.querySelector('.result');

    // Creating select and its options
    let selectEl = document.createElement('Select');
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

    selectEl.addEventListener("change", () => {
        if (selectEl.value === "HEADS" || selectEl.value === "TAILS") {
            coin.addEventListener('click', flipCoin)
        } else {
            alert("Please choose from given option")
        }
    });

    //Creating coin container (H and T)
    let coinContainer = document.createElement('div');
    coinContainer.className = "coinContainer";
    gameDiv.appendChild(coinContainer);
    let coin = document.createElement('div');
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

    //Creating reset buttons
    let resetButton = document.createElement('button');
    resetButton.className = "resetButton";

    //Adding functionality
    let isFlipping = false;

    const flipCoin = () => {
        if (isFlipping) return;

        isFlipping = true;
        result.textContent = '';

        coin.classList.add('flipping');

        // Generate random result (true = heads, false = tails)
        let isHeads = Math.random() < 0.5;

        setTimeout(function () {
            showResult(isHeads);
            coin.classList.remove('flipping');
            isFlipping = false;
        }, 2000);
    }

    // Function to show the result
    const showResult = (isHeads) => {
        let resultText;

        if (isHeads) {
            resultText = 'HEADS';
            coin.style.transform = 'rotateY(0deg)';
        } else {
            resultText = 'TAILS';
            coin.style.transform = 'rotateY(180deg)';
        }

        if (resultText === selectEl.value) {
            result.textContent = 'Result: ' + resultText + '. You won! 🎉 '
            coin.removeEventListener('click', flipCoin)
        } else {
            result.textContent = 'Result: ' + resultText + '. Sorry! You lost.'
            coin.removeEventListener('click', flipCoin)
        }

    }

}