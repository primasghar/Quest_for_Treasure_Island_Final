import {airportData, allICAOCodes, updatePlayerProgress} from './apis.js'

import {getPlayerProgressData, setPlayerProgress} from './localStorageFunctions.js'

export const showAirportInfo = async (player) => {
    let airport = await getAirportData(player.level)
    const {airportName, country} = airport;

    setAirportName(airportName, country)
    showCountryFlag(country)
}

export const gameTitle = (gameName) => {
    let gameTitle = document.querySelector('.gameNameHeading')

    if (!gameTitle) {
        console.error("gameTitle element not found — check your selector and HTML structure", gameTitle)
    }
    gameTitle.innerText = gameName;
}

export const setAirportName = (airportName, country) => {
    let airportNameTitle = document.querySelector('.airportName');
    airportNameTitle.innerText = `${airportName}, ${country}`;
}

export const showCountryFlag = (countryName) => {
    let flag = document.querySelector('.countryFlag');
    flag.innerHTML = ""

    let flagImg = document.createElement("img")
    flagImg.className = "smallFlags"
    flagImg.src = "../../images/flag-" + countryName + ".svg";
    flagImg.alt = `flag of ${countryName}`;
    flag.appendChild(flagImg)
}

export const unlockCollectibles = (collectibleIds) => {
    collectibleIds.map(id => {
        const element = document.querySelector(`[data-id="${id}"]`);
        if (element) {
            element.setAttribute('data-unlocked', 'true');
        }
    })
}

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

//Updates the UI using player data ( accessed from local storage)
export const updatePlayerBoardUI = (player) => {
    let sbId = document.querySelector('.id')
    let sbName = document.querySelector('.name')
    let sbLevel = document.querySelector('.level')
    let sbCarbon = document.querySelector('.carbon')
    let sbScore = document.querySelector('.score')
    let sbAttempts = document.querySelector('.attempts')

    sbId.innerText = player.playerId
    sbName.innerText = player.name;
    sbLevel.innerText = player.level;
    sbAttempts.innerText = player.attempts;
    sbCarbon.innerText = `${Math.floor( player.carbonPrint / 1000)} kg`;
    sbScore.innerText = player.score;
}

//Updates the attempts in UI and BE
export const incrementAttempts = async () => {
    let player = getPlayerProgressData() || {};

    player.attempts += 1;

    await updatePlayerProgress(player)//Setting BE with new val

    setPlayerProgress(player);//Setting LS with new value
    updatePlayerBoardUI(player)//Setting UI
}

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
    return Math.floor(150 * distanceBtwAirports);
}

//gets all data of an airport ( score, level, carbon emission, playerId, attempts )
export const getAirportData = async (level) => {
    // As passing a single level, so will get data for a single airport as object in an array.
    let allGameAirportICAO = await allICAOCodes();

    let airportICAO = [allGameAirportICAO[level - 1][1]]// Considering 0 indexed ICAO array and Pass ICAO in an array

    let data = await airportData(airportICAO)

    return data['airports'][0];
}


//Clears the game areas including result div.
export const clearGameAreas = () => {
    document.querySelector(".gameNameHeading").innerHTML = "";
    document.querySelector('.gameArea').innerHTML = "";
    document.querySelector('.showResult').innerHTML = "";
}





