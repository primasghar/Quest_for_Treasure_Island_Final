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

    // console.log(selectEl.options.length)
    // console.log(selectEl.value)

    selectEl.addEventListener("change", () =>{
        if (selectEl.value === "HEADS") {
            console.log("HEADS");
        }else if(selectEl.value === "TAILS"){
            console.log("TAILS");
        }else{
            alert("choose option")
        }
    });

    //Creating coin div, flip button (reset btn maybe)
    let coinDiv = document.createElement('div');
    gameDiv.appendChild(coinDiv);

}