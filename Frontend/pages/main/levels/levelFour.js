
const addSelectEvenOdd = (selectionDiv) => {
    // Creating select and its options
    selectEl = document.createElement('Select');
    selectEl.id = "selectOptions";
    selectionDiv.appendChild(selectEl);

    let opt = document.createElement("option");
    opt.setAttribute("value", "");
    let node = document.createTextNode("-- Even/Odd --");
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

const addSelectNumbers = (selectionDiv) => {
    // Creating select and its options
    selectEl = document.createElement('Select');
    selectEl.id = "selectOptions";
    selectionDiv.appendChild(selectEl);

    let opt = document.createElement("option");
    opt.setAttribute("value", "");
    let node = document.createTextNode("-- Number (1-10) --");
    opt.appendChild(node);
    selectEl.appendChild(opt)

    for (let i = 1; i <= 10; i++) {
        let opt = document.createElement("option");
        opt.className = "opts"
        opt.setAttribute("value", `${i}`);
        let node = document.createTextNode(`${i}`);
        opt.appendChild(node);
        selectEl.appendChild(opt)
    }

}


const addButton = () => {
    buttonEl = document.createElement("button")
    buttonEl.className = "playBtn"
    buttonEl.innerHTML = "Play"
    gameDiv.appendChild(buttonEl)

}

const evenOdd = ()=>{



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

    addSelectEvenOdd(selectionDiv)
    addSelectNumbers(selectionDiv)

    addButton()

    buttonEl.addEventListener('click', evenOdd)
}