import { allICAOCodes, airportData, updatePlayerProgress} from './apis.js'

//-------------------------Accessing Elements------------
export const getPlayerProgressData = () => JSON.parse(localStorage.getItem('playerDetails'));
export const setPlayerProgress = (player) =>  localStorage.setItem("playerDetails", JSON.stringify(player));
export const removePlayerProgressData =  () => localStorage.removeItem('playerDetails');

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
        const el = document.querySelector(`[data-id="${id}"]`);
        if (el) el.setAttribute('data-unlocked', 'true');
    })
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
    const btnText = document.createElement('span')
    btnText.innerText = buttonText
    buttonElement.appendChild(btnText)
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
        removePlayerProgressData();
        window.location.href = '../playerName/index.html';
    })
    box.appendChild(quitButton)


    // Trigger fade-in
    requestAnimationFrame(() => overlay.classList.add('show'));
}
// Warning msg modal
export const warningMessageModal = (message) => {

    const overlay = createDivElement('modal-overlay');
    document.body.appendChild(overlay);
    const box = createDivElement('modal-box');
    overlay.appendChild(box);
    const messageEl = createParagraphElement('modal-message', message);
    box.appendChild(messageEl);

    // Close modal helper
    const closeModal = () => {
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 200);
    }

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    // Trigger fade-in
    requestAnimationFrame(() => overlay.classList.add('show'));
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

    let playerName = player['name']
    let playerGameLevel = player['level']
    let playerCarbonFootPrints = player['carbonPrint']
    let playerScore = player['score']
    let playerId = player['playerId']
    let playerGameAttempts = player['attempts']
// let playerProgressId = player['progressId']
// let playerCollectibles = player['collectibles']

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
    let player = getPlayerProgressData() || {};
    console.log("attempts updated LS", player.attempts)
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

//gets all data of an airport ( score, level, carbon emission, playerId, attempts )
export const getAirportData = async (level) => {
    // As passing a single level, so will get data for a single airport as object in an array.
    let allGameAirportICAO = await allICAOCodes();

    let airportICAO = [allGameAirportICAO[level - 1][1]]// Considering 0 indexed ICAO array and Pass ICAO in an array

    let data = await airportData(airportICAO)
    console.log("getAirport", data)

    return data['airports'][0];
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



