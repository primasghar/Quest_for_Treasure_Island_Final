//-----------------Accessing Elements
export const gameTitle = (gameName) => {
    let gameTitle = document.querySelector('.gameNameHeading')
    if (!gameTitle) {
        console.error("gameTitle element not found — check your selector and HTML structure")
    }
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

export const createInputElement = (placeholder) => {
    let inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.id = 'playerInput';
    inputElement.placeholder = placeholder;
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
// const fetchPlayerData = async (playerID) => {
//
//     try {
//         const response = await fetch(`http://127.0.0.1:5000/player/${playerID}`)
//         const playerData = await response.json();
//         console.log(playerData)
//         localStorage.setItem("playerDetails", JSON.stringify(playerData));
//         return JSON.stringify(playerData);
//     } catch (error) {
//         console.log(error.message);
//     }
// };

//updates the table in the BE
export const updatePlayerProgress = async (gameLevel, gameScore, gameCFP, gamePlayerID) => {
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

// const distanceBetweenAirports = (prev, current) => {
//     //      airportA = airportData(prev)
// //      airportB = airportData(current)
// //      return distance.distance((airport_a[3], airport_a[4]),
// //                               (airport_b[3], airport_b[4])).km
// }
//
//
// const calcCarbonEmissionBtwAirports = (prevLevel, currentLevel) => {
//     let avgCO2PerKm = 150
//     let travelledDistance = distanceBetweenAirports(prevLevel, currentLevel)
//      return travelledDistance * avgCO2PerKm
//
// }

export const allICAOCodes = async () => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/airports/icao`)
        const allAirportsICAO = await response.json();
        console.log(allAirportsICAO)
        return allAirportsICAO;
    } catch (error) {
        console.log(error.message);
    }
};

export const airportData = async (icao) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/airportDetail/${icao}`)
        const airportDetails = await response.json();
        console.log(airportDetails)
        return JSON.stringify(airportDetails);
    } catch (error) {
        console.log(error.message);
    }
};



export const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km (use 3958.8 for miles)

    const toRad = deg => deg * (Math.PI / 180); //To convert deg to radian unit

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    //  Haversine formula based
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // distance in km
}

export const deletePlayerData = async () => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/quit`)
        const quitConfirmed = await response.json();
        console.log(await response)
        return quitConfirmed;

    } catch (error) {
        console.log(error.message);
    }
};
