import levelOne from "./levels/levelOne.js";
// import levelTwo from "./levels/levelTwo.js";
// import levelThree from "./levels/levelThree.js"
// import levelFour from "./levels/levelFour.js"
// import levelFive from "./levels/levelFive.js"
// import levelSix from "./levels/levelSix.js"
// import levelSeven from "./levels/levelSeven.js"
import levelEight from "./levels/levelEight.js"

let player = JSON.parse(localStorage.getItem('playerDetails'));

console.log(player);


let playerName = player['name']
let playerGameLevel = player['level']
let playerCarbonFootPrints = player['carbonPrint']
let playerScore = player['score']

document.querySelector('.name').innerText = playerName;
//UI nodes in score board that needs to be updated.
document.querySelector('.level').innerText = playerGameLevel;
document.querySelector('.carbon').innerText = playerCarbonFootPrints;
document.querySelector('.score').innerText = playerScore;

// localStorage.removeItem('playerDetails');

const gameDiv = document.querySelector('.gameArea')

if (playerGameLevel === 1) {
    levelOne(gameDiv);
    // levelTwo(gameDiv);
    // levelThree(gameDiv);
    // levelFour(gameDiv);
    // levelFive(gameDiv);
    // levelSix(gameDiv);
    // levelSeven(gameDiv);
    // levelEight(gameDiv);
}



