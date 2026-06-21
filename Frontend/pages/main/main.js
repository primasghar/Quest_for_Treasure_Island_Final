// import levelOne from "./levels/levelOne.js";
// import levelTwo from "./levels/levelTwo.js";
// import levelThree from "./levels/levelThree.js"
// import levelFour from "./levels/levelFour.js"
// import levelFive from "./levels/levelFive.js"
import levelSix from "./levels/levelSix.js"
// import levelSeven from "./levels/levelSeven.js"
// import levelEight from "./levels/levelEight.js"

let newPlayer = JSON.parse(localStorage.getItem('playerDetails'));

console.log(newPlayer);

document.querySelector('.name').innerText = newPlayer['name'];
document.querySelector('.level').innerText = newPlayer['level'];
document.querySelector('.carbon').innerText = newPlayer['carbonPrint'];
document.querySelector('.score').innerText = newPlayer['score'];

// localStorage.removeItem('playerDetails');

const gameDiv = document.querySelector('.gameArea')

if (newPlayer['level'] === 1) {
    // levelOne(gameDiv);
    // // levelTwo(gameDiv);
    // levelThree(gameDiv);
    // levelFour(gameDiv);
    // levelFive(gameDiv);
    levelSix(gameDiv);
    // levelSeven(gameDiv);
    // levelEight(gameDiv);
}



