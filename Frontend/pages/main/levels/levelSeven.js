const showRiddleBtn = () => {
    btnEl = document.createElement("button")
    btnEl.className = "playBtn"
    btnEl.innerHTML = "Play"
    gameDiv.appendChild(btnEl)
}

const handleShowRiddle = () =>{

}


const levelSeven = () => {
    let gameTitle = document.querySelector('.gameNameHeading')
    gameTitle.innerText = "Riddles";
    gameTitle.className = "gameTitle"

    document.querySelector('.gameDescription').innerText =
        "You have three opportunities to win this game and go to your next airport destination. " +
        "Please answer the riddle correctly.";

    let buttonDescription = document.createElement('p')
    buttonDescription.innerText = "Click to see the riddle: "
    buttonDescription.className = "buttonDescription"
    gameDiv.appendChild(buttonDescription)

    showRiddleBtn()
     btnEl.addEventListener("click", handleShowRiddle);

}