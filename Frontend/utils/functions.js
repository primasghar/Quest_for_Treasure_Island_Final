//-------------------------Accessing Elements-------------

export const gameTitle = (gameName) => {
    let gameTitle = document.querySelector('.gameNameHeading')

    if (!gameTitle) {
        console.error("gameTitle element not found — check your selector and HTML structure", gameTitle)
    }
    gameTitle.innerText = gameName;
}

export const gameDescription = (describeGame) => {
    let gameInfo = document.querySelector('.gameDescription');

    if (!gameInfo) {
        gameInfo = document.createElement('p');
        gameInfo.className = 'gameDescription';
        document.querySelector('.gameArea').appendChild(gameInfo); // or wherever it belongs
    }

    gameInfo.innerText = `You have three opportunities to win this game and go to your next airport destination.\r ${describeGame}`;
}

//------------Creating Elements Button, Select, Input--------

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

//--------------------------------------------------------------
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

//Updates the UI using player data (not,ally accessed from local storage)
export const updatePlayerBoardUI = (player) => {

    let playerName = player['name']
    let playerGameLevel = player['level']
    let playerCarbonFootPrints = player['carbonPrint']
    let playerScore = player['score']
    let playerId = player['playerId']
// let playerProgressId = player['progressId']

    let sbId = document.querySelector('.id')
    let sbName = document.querySelector('.name')
    let sbLevel = document.querySelector('.level')
    let sbCarbon = document.querySelector('.carbon')
    let sbScore = document.querySelector('.score')

    sbId.innerText = playerId
    sbName.innerText = playerName;
    sbLevel.innerText = playerGameLevel;
    sbCarbon.innerText = `${Math.floor(playerCarbonFootPrints / 1000)} kg`;
    sbScore.innerText = playerScore;
}

//Updates the table in the BE
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
        return airportDetails;
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

//Getting prev and next airport data with icao codes and extracting lat and lon to get distance and then calc emissions.
export const calcCarbonEmission = async (prevLevel, nextLevel) => {
    let allGameAirportICAO = await allICAOCodes()

    let currentAirportICAO = allGameAirportICAO[prevLevel][1];
    let nextAirportICAO = allGameAirportICAO[nextLevel][1];

    let currentAirportData = await airportData(currentAirportICAO);
    let nextAirportData = await airportData(nextAirportICAO);

    let currentLat = currentAirportData['lat'];
    let currentLon = currentAirportData['lon'];
    let nextLat = nextAirportData['lat'];
    let nextLon = nextAirportData['lon'];

    let distanceBtwAirports = getDistance(currentLat, currentLon, nextLat, nextLon)
    //per km CO2 emissions to be 150.
    return 150 * distanceBtwAirports;
}


export const showMap = () => {
    const map = L.map('map', {
        center: [60.3184, 24.9633],
        zoom: 7,
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    L.circle([60.3184, 24.9633], {radius: 500}).addTo(map);
    const marker = L.marker([60.3184, 24.9633]).addTo(map);
    let trailPoints = [[60.3184, 24.9633]]; // starts with initial location
    let trailLine = L.polyline(trailPoints, {color: 'blue', weight: 3, dashArray: '10, 10'}).addTo(map);
}
export const goToLocation = (lat, lng, zoom = 7, label = '', duration = 1500) => {
    const start = trailPoints[trailPoints.length - 1]; // last known point
    const end = [lat, lng];
    const startTime = performance.now();

    // const marker = L.marker([60.3184, 24.9633]).addTo(map);
    // let trailPoints = [[60.3184, 24.9633]]; // starts with initial location
    // let trailLine = L.polyline(trailPoints, {color: 'blue', weight: 3, dashArray: '10, 10'}).addTo(map);

    // Move map + marker at the same time
    map.flyTo(end, zoom, {duration: duration / 1000});

    function animateStep(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1); // 0 → 1

        // Linear interpolation between start and end
        const lat = start[0] + (end[0] - start[0]) * progress;
        const lng = start[1] + (end[1] - start[1]) * progress;

        // Update marker position along the path
        marker.setLatLng([lat, lng]);

        // Redraw trail with the in-progress point appended
        trailLine.setLatLngs([...trailPoints, [lat, lng]]);

        if (progress < 1) {
            requestAnimationFrame(animateStep);
        } else {
            // Finalize — lock in the real endpoint
            trailPoints.push(end);
            trailLine.setLatLngs(trailPoints);
            if (label) marker.bindPopup(label).openPopup();
        }
    }

    requestAnimationFrame(animateStep);
}

export const nextAirportOnMap = async () => {
    let player = JSON.parse(localStorage.getItem('playerDetails'));

    let allGameAirportICAO = await allICAOCodes();
    let nextAirportICAO = allGameAirportICAO[player.level][1]
    console.log("next-icao", nextAirportICAO)

    let nextAirportData = await airportData(nextAirportICAO)
    console.log("next-airport data", nextAirportData)

    let nextLat = nextAirportData['lat']
    let nextLon = nextAirportData['lon']
    let locationLabel = `${nextAirportData['airportName']},${nextAirportData['country']}`

    goToLocation(nextLat, nextLon, 7, locationLabel)
}

export const clearGameAreas = () => {
    const title = document.querySelector(".gameNameHeading");
    const gameDiv = document.querySelector('.gameArea')
    const resultDiv = document.querySelector('.showResult')
    title.innerText = ""
    gameDiv.innerHTML = ""
    resultDiv.innerHTML = ""
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
