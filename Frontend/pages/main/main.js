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
    updatePlayerProgress, getAirportData, showMapOnLoad, addLocation, gameTitle, clearGameAreas,
    mapVisitedAirportsOnLoad, calcCarbonEmission, showMessageModal, setAirportName
} from "../../utils/functions.js"


//----------------------Accessing button and other elements------------------------------------

const nextGameBtn = document.querySelector(".playNext");
nextGameBtn.disabled = true

const quitBtn = document.querySelector(".quit");

const gameDiv = document.querySelector('.gameArea')
const resultArea = document.querySelector('.showResult')

// onLoad--------------------------------------------------------

let player = JSON.parse(localStorage.getItem('playerDetails'));

let locations = [];

const initMap = async () => {

    if (player.level === 1) {

        let airport = await getAirportData(1)
        const {airportName, country, lat, lon} = airport;

        setAirportName(airportName, country)

        locations = [{name: airportName, coords: [lat, lon]}];
    } else {
        let airport = await getAirportData(player.level)
        const {airportName, country} = airport;

        setAirportName(airportName, country)

        locations = await mapVisitedAirportsOnLoad(player.level);
    }

    console.log("on reload", player.score, player.attempts)
    // In case player don't choose any option in message modal and reload the modals comes back.
    if (player.score >= 500 && player.attempts === 3) {
         showMessageModal(`Want to Play again ? \n-500 scores & +1 kg Carbon Footprints`, "Yes", onReplay)
    } else if (player.score < 500 && player.attempts === 3) {
        showMessageModal("You don't have enough score to play. Game Over! ")
    }


    showMapOnLoad(locations); // now called AFTER locations is fully populated

    updatePlayerBoardUI(player);
}

initMap();

// ----------------------------Game-----------------------------------------------------------

const changeLevel = (levelToShow) => {

    const onWin = async () => {

        let player = JSON.parse(localStorage.getItem('playerDetails'));

        let carbEmit = await calcCarbonEmission(player.level)

        if (player.level === 8) {
            setTimeout(() => {
                clearGameAreas()
                gameTitle("WINNER")
                winnerPage(gameDiv, resultArea, name)
            }, 2000)

        }

        if (player.level !== 8) {
            player.level += 1;
            player.attempts = 0;
        }

        player.score += 500;
        player.carbonPrint = player.carbonPrint + carbEmit;
        console.log(player.carbonPrint)

        localStorage.setItem("playerDetails", JSON.stringify(player));
        await updatePlayerProgress(player.level, player.score, player.carbonPrint, player.playerId, player.attempts)

        player.level < 8 ? nextGameBtn.disabled = false : nextGameBtn.disabled = true
    }

    const onLose = () => {
        let player = JSON.parse(localStorage.getItem('playerDetails'));
        if (player.score >= 500 && player.attempts === 3) {
            showMessageModal(`Want to Play again ? \n-500 scores & +1 kg Carbon Footprints`, "Yes", onReplay)
        } else if (player.score < 500 && player.attempts === 3) {
            showMessageModal("You don't have enough score to play. Game Over! ")
        }

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
        default:
            console.log(`Game over`);
    }

}

changeLevel(player.level);

// ---------------------Buttons and Event Listeners------------------------------------------

nextGameBtn.addEventListener("click", async () => {
    let airportNameTitle = document.querySelector('.airportName');
    airportNameTitle.innerText = ""
    clearGameAreas()

    let player = JSON.parse(localStorage.getItem('playerDetails'));
    const {level} = player //level already changed on win which also activate the next button.
    updatePlayerBoardUI(player)

    changeLevel(level);

    nextGameBtn.disabled = true

    let airport = await getAirportData(player.level)
    const {airportName, country, lat, lon} = airport;

    airportNameTitle.innerText = `${airportName}, ${country}`;

    addLocation({name: name, coords: [lat, lon]}, locations)


})

quitBtn.addEventListener("click", async () => {
    await deletePlayerData()
    localStorage.removeItem('playerDetails');
    window.location.href = '../playerName/index.html';
})


const onReplay = async () => {
    let player = JSON.parse(localStorage.getItem('playerDetails'));
    console.log("before reload carbon", player.carbonPrint)
    player.score -= 500;
    player.attempts = 0;
    player.carbonPrint += 1000;
    console.log("reload carbon", player.carbonPrint)
    clearGameAreas()
    changeLevel(player.level)
    localStorage.setItem("playerDetails", JSON.stringify(player));
    await updatePlayerProgress(player.level, player.score, player.carbonPrint, player.playerId)

    locations = await mapVisitedAirportsOnLoad(player.level);
    updatePlayerBoardUI(player);

}