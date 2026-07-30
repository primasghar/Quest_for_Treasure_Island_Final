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
    deletePlayerData,
    updatePlayerBoardUI,
    updatePlayerProgress, getAirportData, showMapOnLoad, addLocation, clearGameAreas,
    mapVisitedAirportsOnLoad, calcCarbonEmission, showMessageModal, setAirportName, getFlag, unlockCollectibles,
    playerCollectables, warningMessageModal, getPlayerProgressData, setPlayerProgress, removePlayerProgressData
} from "../../utils/functions.js"
import GameOver from "./levels/GameOver.js";


//----------------------Accessing button and other elements------------------------------------

const nextGameBtn = document.querySelector(".playNextBtn");
nextGameBtn.disabled = true

const quitBtn = document.querySelector(".quitBtn");

const gameDiv = document.querySelector('.gameArea')

const collectiblesArray = ["compass", "coin", "key", "gem", "anchor", "scroll", "chest", "map"]

// onLoad--------------------------------------------------------

let player = getPlayerProgressData();

let locations = [];

const initMap = async () => {

    let airport = await getAirportData(player.level)
    const {airportName, country} = airport;
    setAirportName(airportName, country)
    getFlag(country)

    locations = await mapVisitedAirportsOnLoad(player.level);


    // In case player don't choose any option in message modal and reload the modals comes back.
    if (player.score >= 500 && player.attempts === 3) {
        showMessageModal(`Want to Play again ? \n-500 scores & +1 kg Carbon Footprints`, "Yes", onReplay)
    } else if (player.score < 500 && player.attempts === 3) {
        GameOver(player.name)
    }

    const collectiblesArr = await playerCollectables(player.playerId)
    unlockCollectibles(collectiblesArr)

    showMapOnLoad(locations); // now called AFTER locations is fully populated

    updatePlayerBoardUI(player);
}

initMap();

// ----------------------------Game-----------------------------------------------------------

const changeLevel = (levelToShow) => {

    const onWin = async () => {

        let player = getPlayerProgressData();
        unlockCollectibles([collectiblesArray[player.level - 1]])//passing the name of the collectible from array using level completed, considering 0 indexed array.
        player.collectibles = collectiblesArray[player.level - 1]

        player.level < 8 ? nextGameBtn.disabled = false : nextGameBtn.disabled = true

        if (player.level === 8) {
            setTimeout(async () => {
                player.score += 500;
               setPlayerProgress(player);
                await updatePlayerProgress(player.level, player.score, player.carbonPrint, player.playerId, player.attempts, player.collectibles)
                changeLevel(9)
            }, 2000)
        }

        let carbEmit = await calcCarbonEmission(player.level)

        if (player.level !== 9) {
            player.level += 1;
            player.attempts = 0;
        }

        player.score += 500;
        player.carbonPrint = player.carbonPrint + carbEmit;

        setPlayerProgress(player);
        await updatePlayerProgress(player.level, player.score, player.carbonPrint, player.playerId, player.attempts, player.collectibles)
        updatePlayerBoardUI(player)
    }

    const onLose = () => {
        let player = getPlayerProgressData();

        setTimeout(() => {
            if (player.score >= 500 && player.attempts === 3) {
                showMessageModal(`Want to Play again ? \n-500 scores & +1 kg Carbon Footprints`, "Yes", onReplay)
            } else if (player.score < 500 && player.attempts === 3) {
                 GameOver(player.name)
            }
        }, 1000)
    }

    switch (levelToShow) {
        case 1:
            levelOne(gameDiv, onWin, onLose);
            break;
        case 2:
            levelTwo(gameDiv, onWin, onLose);
            break;
        case 3:
            levelThree(gameDiv, onWin, onLose);
            break;
        case 4:
            levelFour(gameDiv, onWin, onLose);
            break;
        case 5:
            levelFive(gameDiv, onWin, onLose);
            break;
        case 6:
            levelSix(gameDiv, onWin, onLose);
            break;
        case 7:
            levelSeven(gameDiv, onWin, onLose);
            break;
        case 8:
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

changeLevel(player.level);

// ---------------------Buttons and Event Listeners------------------------------------------

nextGameBtn.addEventListener("click", async () => {
    let airportNameTitle = document.querySelector('.airportName');
    airportNameTitle.innerText = ""
    clearGameAreas()

    let player = getPlayerProgressData();
    const {level} = player //level already changed on win which also activate the next button.
    updatePlayerBoardUI(player)

    changeLevel(level);

    nextGameBtn.disabled = true

    let airport = await getAirportData(player.level)
    const {airportName, country, lat, lon} = airport;
    airportNameTitle.innerText = `${airportName}, ${country}`;
    getFlag(country)
    addLocation({name: name, coords: [lat, lon]}, locations)

})

quitBtn.addEventListener("click", async () => {
    await deletePlayerData()
    removePlayerProgressData();
    window.location.href = '../playerName/index.html';
})


const onReplay = async () => {
    let player = getPlayerProgressData();
    console.log("before reload carbon", player.carbonPrint)
    player.score -= 500;
    player.attempts = 0;
    player.carbonPrint += 1000;
    console.log("reload carbon", player.carbonPrint)
    clearGameAreas()
    changeLevel(player.level)
    setPlayerProgress(player);

    await updatePlayerProgress(player.level, player.score, player.carbonPrint, player.playerId, player.collectibles)

    locations = await mapVisitedAirportsOnLoad(player.level);
    updatePlayerBoardUI(player);

}


