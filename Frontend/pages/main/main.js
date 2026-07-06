import levelOne from "./levels/levelOne.js";
import levelTwo from "./levels/levelTwo.js";
import levelThree from "./levels/levelThree.js"
import levelFour from "./levels/levelFour.js"
import levelFive from "./levels/levelFive.js"
import levelSix from "./levels/levelSix.js"
import levelSeven from "./levels/levelSeven.js"
import levelEight from "./levels/levelEight.js"
import winnerPage from "./levels/winnerPage.js";

import {deletePlayerData, gameTitle, updatePlayerProgress} from "../../utils/functions.js"

const nextGameBtn = document.querySelector(".playNext");
nextGameBtn.disabled = true

const playAgainBtn = document.querySelector(".playAgain");
playAgainBtn.disabled = true

const quitBtn = document.querySelector(".quit");

const title = document.querySelector(".gameNameHeading");
const gameDiv = document.querySelector('.gameArea')
const resultArea = document.querySelector('.showResult')

let player = JSON.parse(localStorage.getItem('playerDetails'));
console.log("player", player)
// if (!player) { /* redirect to start screen, etc. */
// }

let playerName = player['name']
let playerGameLevel = player['level']
let playerCarbonFootPrints = player['carbonPrint']
let playerScore = player['score']
let playerId = player['playerId']
let playerProgressId = player['progressId']

let sbId = document.querySelector('.id')
let sbName = document.querySelector('.name')
let sbLevel = document.querySelector('.level')
let sbCarbon = document.querySelector('.carbon')
let sbScore = document.querySelector('.score')

sbId.innerText = playerId
sbName.innerText = playerName;
sbLevel.innerText = playerGameLevel;
sbCarbon.innerText = playerCarbonFootPrints;
sbScore.innerText = playerScore;


const changeLevel = (levelToShow) => {

    const onWin = () => {
        player = JSON.parse(localStorage.getItem('playerDetails'));
        console.log(player)

        if (player.level === 8) {
            gameDiv.innerHTML = ""
            resultArea.innerHTML = ""
            title.innerText = "WINNER"
            winnerPage(gameDiv, resultArea, player.name)
        }

        if (player.level !== 8) {
            player.level += 1;
        }

        player.score += 500;
        player.carbonPrint += 100;

        localStorage.setItem("playerDetails", JSON.stringify(player));
        updatePlayerProgress(player.level, player.score, player.carbonPrint, player.playerId)

        player.level < 8 ? nextGameBtn.disabled = false : nextGameBtn.disabled = true
    }

    switch (levelToShow) {
        case 1:
            levelOne(gameDiv, onWin);
            break;
        case 2:
            levelTwo(gameDiv, onWin);
            break;
        case 3:
            levelThree(gameDiv, onWin);
            break;
        case 4:
            levelFour(gameDiv, onWin);
            break;
        case 5:
            levelFive(gameDiv, onWin);
            break;
        case 6:
            levelSix(gameDiv, onWin);
            break;
        case 7:
            levelSeven(gameDiv, onWin);
            break;
        case 8:
            levelEight(gameDiv, onWin);
            break;
        default:
            console.log(`Game over`);
    }


}

changeLevel(playerGameLevel);

nextGameBtn.addEventListener("click", () => {
    location.reload();
    player = JSON.parse(localStorage.getItem('playerDetails'));
    changeLevel(player.level);
    console.log("next level btn", player.level)
    sbLevel.innerText = player.level;
    sbScore.innerText = player.score;
})

quitBtn.addEventListener("click", () => {
    console.log("quit")
    deletePlayerData()
    localStorage.removeItem('playerDetails');
    window.location.href = '../playerName/index.html';
})