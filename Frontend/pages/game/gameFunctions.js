import GameOver from "./levels/GameOver.js";
import levelOne from "./levels/levelOne.js";
import levelTwo from "./levels/levelTwo.js";
import levelThree from "./levels/levelThree.js"
import levelFour from "./levels/levelFour.js"
import levelFive from "./levels/levelFive.js"
import levelSix from "./levels/levelSix.js"
import levelSeven from "./levels/levelSeven.js"
import levelEight from "./levels/levelEight.js"
import winnerPage from "./levels/winnerPage.js";

import {
    calcCarbonEmission,
    clearGameAreas, deletePlayerData, getAirportData,
    showAirportInfo, showCountryFlag,
    unlockCollectibles, updatePlayerBoardUI
} from "./utils/utilityFunctions.js";
import { showMessageModal } from './utils/modals.js'
import {
    getPlayerProgressData,
    setPlayerProgress,
    removePlayerProgressData
} from './utils/localStorageFunctions.js'

import {playerCollectables, updatePlayerProgress} from "./utils/apis.js";
import {addLocation, mapVisitedAirportsOnLoad, showMapOnLoad} from "./utils/mapFunctions.js";

const collectiblesArray = ["compass", "coin", "key", "gem", "anchor", "scroll", "chest", "map"]

const Level = Object.freeze({
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOURTH: 4,
    FIVE: 5,
    SIX: 6,
    SEVEN: 7,
    EIGHT: 8,
    NINE: 9
})

const Attempts = Object.freeze({
    FIRST: 1,
    SECOND: 2,
    THIRD: 3,
})

let locations = [];

//----------------------Accessing button and other elements------------------------------------
const nextGameBtn = document.querySelector(".playNextBtn");
nextGameBtn.disabled = true
const gameDiv = document.querySelector('.gameArea')
const quitBtn = document.querySelector(".quitBtn");

export const onWin = async () => {
    let player = getPlayerProgressData();
    unlockCollectibles([collectiblesArray[player.level - 1]])//passing the name of the collectible from array using level completed, considering 0 indexed array.
    player.collectibles = collectiblesArray[player.level - 1]

    nextGameBtn.disabled =  player.level > Level.EIGHT;

    if (player.level === Level.EIGHT) {
        setTimeout(async () => {
            player.score += 500;
            setPlayerProgress(player);
            await updatePlayerProgress(player)
            playLevel(9)
        }, 2000)
    }

    let carbonEmission = await calcCarbonEmission(player.level)

    if (player.level !== Level.NINE) {
        player.level += 1;
        player.attempts = 0;
    }

    player.score += 500;
    player.carbonPrint = player.carbonPrint + carbonEmission;

    setPlayerProgress(player);
    //  await updatePlayerProgress(player)
    updatePlayerBoardUI(player)
}

export const onLose = () => {
    let player = getPlayerProgressData();

    setTimeout(() => {
        if (player.score >= 500 && player.attempts === Attempts.THIRD) {
            showMessageModal(`Want to Play again ? \n-500 scores & +1 kg Carbon Footprints`, "Yes", onReplay)
        } else if (player.score < 500 && player.attempts === Attempts.THIRD) {
            GameOver(player.name)
        }
    }, 1000)
}


export const onReplay = async () => {
    let player = getPlayerProgressData();

    player.score -= 500;
    player.attempts = 0;
    player.carbonPrint += 1000;

    clearGameAreas()
    playLevel(player.level)
    setPlayerProgress(player);

    await updatePlayerProgress(player)

    locations = await mapVisitedAirportsOnLoad(player.level);
    updatePlayerBoardUI(player);
}


// ---------------------Buttons and Event Listeners------------------------------------------

nextGameBtn.addEventListener("click", async () => {
    let airportNameTitle = document.querySelector('.airportName');
    airportNameTitle.innerText = ""
    clearGameAreas()

    let player = getPlayerProgressData();
    const {level} = player //level already changed on win which also activate the next button.
    updatePlayerBoardUI(player)

    playLevel(level);

    nextGameBtn.disabled = true

    let airport = await getAirportData(player.level)
    const {airportName, country, lat, lon} = airport;
    airportNameTitle.innerText = `${airportName}, ${country}`;
    showCountryFlag(country)
    addLocation({name: name, coords: [lat, lon]}, locations)

})

quitBtn.addEventListener("click", async () => {
    await deletePlayerData()
    removePlayerProgressData();
    window.location.href = '../playerName/index.html';
})

// ----------------------------Game-----------------------------------------------------------

export const playLevel = () => {
    let player = getPlayerProgressData();
    console.log("playerLevel", player)
    switch (player.level) {
        case Level.ONE:
            levelOne(gameDiv, onWin, onLose);
            break;
        case Level.TWO:
            levelTwo(gameDiv, onWin, onLose);
            break;
        case Level.THREE:
            levelThree(gameDiv, onWin, onLose);
            break;
        case Level.FOURTH:
            levelFour(gameDiv, onWin, onLose);
            break;
        case Level.FIVE:
            levelFive(gameDiv, onWin, onLose);
            break;
        case Level.SIX:
            levelSix(gameDiv, onWin, onLose);
            break;
        case Level.SEVEN:
            levelSeven(gameDiv, onWin, onLose);
            break;
        case Level.EIGHT:
            levelEight(gameDiv, onWin, onLose);
            break;
        case 9:
            winnerPage(player.name);
            break;
        case 10:
            GameOver(player.name);
            break;

    }
}

export const initGame = async () => {
    let player = getPlayerProgressData();
    showAirportInfo(player);
    locations = await mapVisitedAirportsOnLoad(player.level);

    // In case player don't choose any option in message modal and reload the modals comes back.
    // When the player lose the game, and they refresh it without selecting to play again or quit,
    if (player.score >= 500 && player.attempts === 3) {
        showMessageModal(`Want to Play again ? \n-500 scores & +1 kg Carbon Footprints`, "Yes", onReplay)
    } else if (player.score < 500 && player.attempts === 3) {
        GameOver(player.name)
    }

    const collectiblesArr = await playerCollectables(player.playerId)
    unlockCollectibles(collectiblesArr)

    showMapOnLoad(locations); // now called AFTER locations is fully populated

    updatePlayerBoardUI(player);

    playLevel();
}