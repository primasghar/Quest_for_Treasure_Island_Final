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
    updatePlayerProgress, nextAirportOnMap, showMap, gameTitle, clearGameAreas
} from "../../utils/functions.js"

//-------------------------------------------MAP---------------------------------------------

showMap()

//----------------------Accessing button and other elements------------------------------------

const nextGameBtn = document.querySelector(".playNext");
nextGameBtn.disabled = true
const playAgainBtn = document.querySelector(".playAgain");
playAgainBtn.disabled = true
const quitBtn = document.querySelector(".quit");

const gameDiv = document.querySelector('.gameArea')
const resultArea = document.querySelector('.showResult')

// ---------------Fetching player data from LOCAL STORAGE and Displaying in UI------------------

let player = JSON.parse(localStorage.getItem('playerDetails'));
updatePlayerBoardUI(player)

// ----------------------------Game-----------------------------------------------------------

const changeLevel = (levelToShow) => {

    const onWin = async () => {
        let player = JSON.parse(localStorage.getItem('playerDetails'));
        console.log(player)

        if (player.level === 8) {
            clearGameAreas()

            gameTitle("WINNER")
            winnerPage(gameDiv, resultArea, player.name)
        }

        if (player.level !== 8) {
            player.level += 1;
        }

        player.score += 500;
        player.carbonPrint += 100;

        localStorage.setItem("playerDetails", JSON.stringify(player));
        await updatePlayerProgress(player.level, player.score, player.carbonPrint, player.playerId)

        player.level < 8 ? nextGameBtn.disabled = false : nextGameBtn.disabled = true
    }

    const onLose = () => {
        let player = JSON.parse(localStorage.getItem('playerDetails'));
        if (player.score >= 500) {
            playAgainBtn.disabled = false
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
    clearGameAreas()

    let player = JSON.parse(localStorage.getItem('playerDetails'));
    const {level} = player
    updatePlayerBoardUI(player)

    changeLevel(level);

    nextGameBtn.disabled = true

    await nextAirportOnMap(level)
})


quitBtn.addEventListener("click", async () => {
    await deletePlayerData()
    localStorage.removeItem('playerDetails');
    window.location.href = '../playerName/index.html';
})

playAgainBtn.addEventListener("click", async () => {
    let player = JSON.parse(localStorage.getItem('playerDetails'));
    player.score -= 500;

    localStorage.setItem("playerDetails", JSON.stringify(player));
    await updatePlayerProgress(player.level, player.score, player.carbonPrint, player.playerId)

    location.reload();
})