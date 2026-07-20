//-------------------------Accessing Elements------------

export const gameTitle = (gameName) => {
    let gameTitle = document.querySelector('.gameNameHeading')

    if (!gameTitle) {
        console.error("gameTitle element not found — check your selector and HTML structure", gameTitle)
    }
    gameTitle.innerText = gameName;
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

//message Modal

export const showMessageModal = (message, buttonText = null, onButtonClick = () => {
}) => {

    const overlay = createDivElement('modal-overlay');
    document.body.appendChild(overlay);
    const box = createDivElement('modal-box');
    overlay.appendChild(box);
    const messageEl = createParagraphElement('modal-message', message);
    box.appendChild(messageEl);
    const quitButton = createButtonElement('modal-quit', "quit");


    // Close modal helper
    const closeModal = () => {
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 200);
    }

    if (buttonText) {
        const button = createButtonElement('modal-button', buttonText);
        button.addEventListener('click', () => {
            closeModal();
            onButtonClick();
        });
        box.appendChild(button);
    }

    quitButton.addEventListener('click', async () => {
        closeModal();
        await deletePlayerData()
        localStorage.removeItem('playerDetails');
        window.location.href = '../playerName/index.html';
    })
    box.appendChild(quitButton)


    // Trigger fade-in
    requestAnimationFrame(() => overlay.classList.add('show'));
}

// Demo usage
// document.getElementById('demo-trigger').addEventListener('click', () => {
//   showMessageModal(
//     'You have used all 3 attempts. Try again?',
//     'OK',
//     () => {
//       console.log('Button clicked — running callback logic here.');
//     }
//   );
// });


//-------------------------------Result display-------------------------------
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
        try: {icon: "🔄", label: "Try again", bg: "#ccc9c9", border: "#b1a8a8", text: "#180101"}
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
    let playerGameAttempts = player['attempts']
// let playerProgressId = player['progressId']

    let sbId = document.querySelector('.id')
    let sbName = document.querySelector('.name')
    let sbLevel = document.querySelector('.level')
    let sbCarbon = document.querySelector('.carbon')
    let sbScore = document.querySelector('.score')
    let sbAttempts = document.querySelector('.attempts')

    sbId.innerText = playerId
    sbName.innerText = playerName;
    sbLevel.innerText = playerGameLevel;
    sbAttempts.innerText = playerGameAttempts;
    sbCarbon.innerText = `${Math.floor(playerCarbonFootPrints / 1000)} kg`;
    sbScore.innerText = playerScore;
}

//Updates the attempts in UI and BE
export const incrementAttempts = async () => {
    let player = JSON.parse(localStorage.getItem('playerDetails')) || {};
    console.log("attempts updated LS", player.attempts)
    player.attempts += 1;
    await updatePlayerProgress(player.level, player.score, player.carbonPrint, player.playerId, player.attempts)//Setting BE with new val
    localStorage.setItem("playerDetails", JSON.stringify(player));//Setting LS with new value
    updatePlayerBoardUI(player)//Setting UI

}

//Updates the table in the BACKEND
export const updatePlayerProgress = async (gameLevel, gameScore, gameCFP, gamePlayerID, gameAttempts) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/update/progress`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                level: gameLevel,
                score: gameScore,
                carbon_fp: gameCFP,
                player_id: gamePlayerID,
                attempts: gameAttempts
            }),

        })
        return await response.json();
    } catch (error) {
        console.log(error.message);
    }
};

//Fetches all airports ICAO from BACKEND -- selected to be used in this game.
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

//Fetches airports data from BACKEND  with ICAO--Returns "list" of airports as objects
export const airportData = async (icao_list) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/airportDetail/${icao_list}`)
        return await response.json();
    } catch (error) {
        console.log(error.message);
    }
};

//Calculated the distance between current and previous airport (used to calc carbon emission)
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
    console.log(R * c)
    return R * c; // distance in km

}

//Getting prev and next airport data with icao codes and extracting lat and lon to get distance and then calc emissions.
export const calcCarbonEmission = async (currLevel) => {

    let allGameAirportICAO = await allICAOCodes()

    let currentAirportICAO = allGameAirportICAO[currLevel - 1][1];//Considering icao have 0 index and levels start from 1.

    let nextAirportICAO = allGameAirportICAO[currLevel][1];

    let currAndNextAirportData = await airportData([currentAirportICAO, nextAirportICAO]);

    let currentLat = currAndNextAirportData.airports[0]['lat']
    let currentLon = currAndNextAirportData.airports[0]['lon']
    let nextLat = currAndNextAirportData.airports[1]['lat']
    let nextLon = currAndNextAirportData.airports[1]['lon'];

    let distanceBtwAirports = getDistance(currentLat, currentLon, nextLat, nextLon)
    //per km CO2 emissions to be 150g.
    console.log("carbon", 150 * distanceBtwAirports)
    return Math.floor(150 * distanceBtwAirports);
}

// Creates the map
let map;
let markers = []
let trailPoints = []
let trailLine;

export const showMapOnLoad = (locations) => {

    console.log(locations)

    map = L.map('map', {
        center: [60.3184, 24.9633],
        zoom: 4,
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

//gets all data of an airport ( score, level, carbon emission, playerId, attempts )
export const getAirportData = async (level) => {
    // As passing a single level, so will get data for a single airport as object in an array.
    let allGameAirportICAO = await allICAOCodes();

    let airportICAO = [allGameAirportICAO[level - 1][1]]// Considering 0 indexed ICAO array and Pass ICAO in an array

    let data = await airportData(airportICAO)
    console.log("getAirport", data)

    return data['airports'][0];
}

//Gets all the airports visited already to reload them on map, if player reloads the page.
export const mapVisitedAirportsOnLoad = async (level) => {
    const airportDataForMap = [];

    let allGameAirportICAO = await allICAOCodes();

    const allVisitedICAO = allGameAirportICAO.slice(0, level).map(pair => pair[1]);

    let allAirportsVisitedData = await airportData(allVisitedICAO)

    //Getting only necessary data for map, name and lat/lon
    for (const airport of allAirportsVisitedData.airports) {
        const airportName = airport.airportName;
        const lat = airport.lat;
        const lon = airport.lon;

        airportDataForMap.push({name: airportName, coords: [lat, lon]})
    }

    return airportDataForMap;
}

//Clears the game areas including result div.
export const clearGameAreas = () => {
    const title = document.querySelector(".gameNameHeading");
    const gameDiv = document.querySelector('.gameArea')
    const resultDiv = document.querySelector('.showResult')
    title.innerText = ""
    gameDiv.innerHTML = ""
    resultDiv.innerHTML = ""
}

//Deletes everything when QUIT button is pressed.
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

