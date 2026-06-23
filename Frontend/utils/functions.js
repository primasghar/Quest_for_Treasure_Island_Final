//-----------------Accessing Elements
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

//-------------------Creating Elements Button, Select, Input
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

export const createNumberSelect = (selectId, noArray) => {
    const selectElement = document.createElement('select');
    selectElement.id = selectId;

    let opt = document.createElement("option");
    opt.value = ""
    opt.textContent = "--Number (1-10)--"
    selectElement.appendChild(opt)

    for (let i = 1; i <= noArray.length; i++) {
        let opt = document.createElement("option");
        opt.className = "opts"
        opt.value = `${i}`
        opt.textContent = `${i}`
        selectElement.appendChild(opt)
    }

    return selectElement;

}

export const createInputElement = (plcholder) => {
    let inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.id = 'playerInput';
    inputElement.placeholder = plcholder;
    return inputElement;
}

//-------------------------
export const generateRandomSequence = () => {
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

//Fetches the player data and update local storage that updates the UI
const fetchPlayerData = async (playerID) => {

    try {
        const response = await fetch(`http://127.0.0.1:5000/player/${playerID}`)
        const playerData = await response.json();
        console.log(playerData)
        localStorage.setItem("playerDetails", JSON.stringify(playerData) );
        return JSON.stringify(playerData);
    } catch (error) {
        console.log(error.message);
    }
};

//updates the table in the BE
export const updateScoreBoard = async (gameLevel, gameScore, gameCFP, gamePlayerID) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/update/progress`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({level: gameLevel, score: gameScore, carbon_fp: gameCFP, player_id: gamePlayerID}),

        })
        return await response.json();
    } catch (error) {
        console.log(error.message);
    }
};