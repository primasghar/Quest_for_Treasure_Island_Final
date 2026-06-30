import levelOne from "./levels/levelOne.js";
import levelTwo from "./levels/levelTwo.js";
import levelThree from "./levels/levelThree.js"
import levelFour from "./levels/levelFour.js"
import levelFive from "./levels/levelFive.js"
import levelSix from "./levels/levelSix.js"
import levelSeven from "./levels/levelSeven.js"
import levelEight from "./levels/levelEight.js"

const nextGameBtn = document.querySelector(".playNext");
nextGameBtn.disabled = true

const playAgainBtn = document.querySelector(".playAgain");
playAgainBtn.disabled = true

const gameDiv = document.querySelector('.gameArea')

let player = JSON.parse(localStorage.getItem('playerDetails') || null);
// if (!player) { /* redirect to start screen, etc. */
// }

let playerName = player['name']
let playerGameLevel = player['level']
let playerCarbonFootPrints = player['carbonPrint']
let playerScore = player['score']

let sbName = document.querySelector('.name')
let sbLevel = document.querySelector('.level')
let sbCarbon = document.querySelector('.carbon')
let sbScore = document.querySelector('.score')


sbName.innerText = playerName;
sbLevel.innerText = playerGameLevel;
sbCarbon.innerText = playerCarbonFootPrints;
sbScore.innerText = playerScore;
// localStorage.removeItem('playerDetails');


const changeLevel = (levelToShow) => {

    const onWin = () => {
        player = JSON.parse(localStorage.getItem('playerDetails'));
        player.level += 1;
        player.score += 500;
        player.carbonPrint += 100;
        console.log("won", player)
        localStorage.setItem("playerDetails", JSON.stringify(player));

        player.level <= 8 ? nextGameBtn.disabled = false : nextGameBtn.disabled = true
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