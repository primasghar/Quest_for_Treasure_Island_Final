export const createButtonElement = (buttonClass, buttonText) => {
    const buttonElement = document.createElement("button")
    buttonElement.className = buttonClass
    buttonElement.innerHTML = buttonText
    return buttonElement;
}


export const createSelectElement = (selectId, optionsArray) => {
    const selectElement = document.createElement('select');
    selectElement.id = selectId;

    for (let i = 0; i < optionsArray.length; i++) {
        let valueText = optionsArray[i].value
        let optionText = optionsArray[i].nodeText

        const option = document.createElement("option");
        option.className = "opts"
        option.value = valueText;
        option.textContent = optionText
        selectElement.appendChild(option)
    }

    return selectElement;

};


export const gameTitle = (gameName) => {
    let gameTitle = document.querySelector('.gameNameHeading')
    gameTitle.innerText = gameName;
    gameTitle.className = "gameTitle"
}

export const gameDescription = (describeGame) => {
    let game = document.querySelector('.gameDescription')
    game.innerText = `You have three opportunities to win this game and go to your next airport destination.\r ${describeGame}`;
    game.className = "gameDescription"
}

//
// export const generateRandomSequence = () => {
//     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//     let result = '';
//
//     for (let i = 0; i < 8; i++) {
//         // Pick a random index between 0 and 25
//         const randomIndex = Math.floor(Math.random() * chars.length);
//         // Append the character at that index to the result
//         result += chars[randomIndex];
//     }
//
//     return result;
// }