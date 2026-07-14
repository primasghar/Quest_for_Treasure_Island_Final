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

//------------Creating Elements Div, Paragraph, Button, Select, Input--------

export const createDivElement = (divClass) => {
    const divElement = document.createElement("div")
    divElement.className = divClass
    return divElement;
}


export const createParagraphElement = (paraClass, paraText) => {
    const paraElement = document.createElement("p")
    paraElement.className = paraClass
    paraElement.innerHTML = paraText
    return paraElement;
}

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
export const showResultCard = (status, message) => {
    const resultArea = document.querySelector('.showResult');
    if (!resultArea) {
        console.error("showResult element not found");
        return;
    }

    const config = {
        win: {icon: "🎉", label: "Congratulations! You win!", bg: "#e8f5e9", border: "#2e7d32", text: "#1b5e20"},
        lose: {icon: "😢", label: "Sorry! You lose!", bg: "#fdecea", border: "#c62828", text: "#b71c1c"},
        draw: {icon: "🤝", label: "Oops! It's a draw", bg: "#fff8e1", border: "#f9a825", text: "#8d6e00"},
        try: {icon: "🔄", label: "Please try again", bg: "#ccc9c9", border: "#b1a8a8", text: "#180101"}
    };

    const {icon, label, bg, border, text} = config[status] || config.lose;

    resultArea.innerHTML = `
        <div class="resultCard" style="border-left: 6px solid ${border}; background: ${bg}; color: ${text};">
            <span class = "resultIcon">${icon}</span>
            <div>
                <strong class = "resultLabel">${label}</strong>
                <p class="resultMsg">${message}</p>
            </div>
        </div>
    `;
};


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

//Updates the UI using player data ( accessed from local storage)
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

export const airportData = async (icao_list) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/airportDetail/${icao_list}`)
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

let map;
let markers = []
let trailPoints = []
let trailLine;

export const showMapOnLoad = (locations) => {
    // locations = initialLocations;
    console.log(locations)

    map = L.map('map', {
        center: [60.3184, 24.9633],
        zoom: 7,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Add a circle, marker, and label for each location
    markers = locations.map((loc, i) => {
        L.circle(loc.coords, {radius: 500}).addTo(map);

        const marker = L.marker(loc.coords).addTo(map);

        marker.bindTooltip(`${i + 1}. ${loc.name}`, {
            permanent: true,
            direction: 'right',
            offset: [10, 0],
            className: 'stop-label'
        });

        marker.bindPopup(`<strong>Stop ${i + 1}</strong><br>${loc.name}`);

        return marker;
    });

    // Build the trail connecting all locations in order
    trailPoints = locations.map(loc => loc.coords);
    trailLine = L.polyline(trailPoints, {
        color: 'blue',
        weight: 3,
        dashArray: '10, 10'
    }).addTo(map);

    // map.fitBounds(trailLine.getBounds(), {padding: [30, 30]});
}

// Push a new location and update the map to show it
export const addLocation = (loc, locations) => {
    if (!map) {
        console.warn('Map not initialised — call showMapOnLoad first');
        return;
    }

    locations.push(loc);
    const i = locations.length - 1;

    // Circle + marker for the new location
    L.circle(loc.coords, {radius: 500}).addTo(map);

    const marker = L.marker(loc.coords).addTo(map);

    marker.bindTooltip(`${i + 1}. ${loc.name}`, {
        permanent: true,
        direction: 'right',
        offset: [10, 0],
        className: 'stop-label'
    });

    marker.bindPopup(`<strong>Stop ${i + 1}</strong><br>${loc.name}`);

    markers.push(marker);

    // Extend the trail to include the new point
    trailPoints.push(loc.coords);
    trailLine.setLatLngs(trailPoints);

    // Optionally re-fit the map to include the new point
    // map.fitBounds(trailLine.getBounds(), { padding: [30, 30] });
}


export const getAirportData = async (level) => {
    let nextAirportDataForMap;

    let allGameAirportICAO = await allICAOCodes();

    let nextAirportICAO = [allGameAirportICAO[level - 1][1]]//Pass ICAO in an array
    console.log("next-icao", nextAirportICAO)

    let nextAirportData = await airportData(nextAirportICAO)
    console.log("next-airport data", nextAirportData)//{"airports": result} result is array of objects of airport data

    console.log("shape of airport", nextAirportData.airports)

    for (const airport of nextAirportData.airports) {
        const airportName = airport.airportName;
        const lat = airport.lat;
        const lon = airport.lon;
        nextAirportDataForMap = {name: airportName, coords: [lat, lon]}
    }

    return nextAirportDataForMap;
}

export const mapVisitedAirportsOnLoad = async (level) => {
    const airportDataForMap = [];

    let allGameAirportICAO = await allICAOCodes();

    const allVisitedICAO = allGameAirportICAO.slice(0, level).map(pair => pair[1]);

    let allAirportsVisitedData = await airportData(allVisitedICAO)
    console.log("next-airport data", allAirportsVisitedData)

    //Getting only necessary data for map, name and lat/lon
    for (const airport of allAirportsVisitedData.airports) {
        const airportName = airport.airportName;
        const lat = airport.lat;
        const lon = airport.lon;

        airportDataForMap.push({name: airportName, coords: [lat, lon]})
    }

    return airportDataForMap;
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
