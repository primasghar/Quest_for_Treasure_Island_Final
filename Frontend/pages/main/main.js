// import levelOne from "./levels/levelOne";
import levelTwo from "./levels/levelTwo.js";
// import levelThree from "./levels/levelThree"
// import levelFour from "./levels/levelFour"
// import levelFive from "./levels/levelFive"
// import levelSix from "./levels/levelSix"
// import levelSeven from "./levels/levelSeven"
// import levelEight from "./levels/levelEight"

let newPlayer = JSON.parse(localStorage.getItem('playerDetails'));

console.log(newPlayer);

document.querySelector('.name').innerText = newPlayer['name'];
document.querySelector('.level').innerText = newPlayer['level'];
document.querySelector('.carbon').innerText = newPlayer['carbonPrint'];
document.querySelector('.score').innerText = newPlayer['score'];

// localStorage.removeItem('playerDetails');

const gameDiv = document.querySelector('.gameArea')

console.log('gameDiv', gameDiv)
if (newPlayer['level'] === 1) {
    // levelOne(gameDiv);
    levelTwo(gameDiv);
    // levelThree(gameDiv);
    // levelFour(gameDiv);
    // levelFive(gameDiv);
    // levelSix();
    // levelSeven();
    // levelEight();
}



