let newPlayer = JSON.parse(localStorage.getItem('playerDetails'));

console.log(newPlayer);

document.querySelector('.name').innerText = newPlayer['name'];
document.querySelector('.level').innerText = newPlayer['level'];
document.querySelector('.carbon').innerText = newPlayer['carbonPrint'];
document.querySelector('.score').innerText = newPlayer['score'];

// localStorage.removeItem('playerDetails');

const gameDiv = document.querySelector('.gameArea')

if (newPlayer['level'] === 1) {
    levelOne();
}


