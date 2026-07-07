import levelOne from "./levels/levelOne.js";
import levelTwo from "./levels/levelTwo.js";
import levelThree from "./levels/levelThree.js"
import levelFour from "./levels/levelFour.js"
import levelFive from "./levels/levelFive.js"
import levelSix from "./levels/levelSix.js"
import levelSeven from "./levels/levelSeven.js"
import levelEight from "./levels/levelEight.js"
import winnerPage from "./levels/winnerPage.js";

import {deletePlayerData, updatePlayerProgress} from "../../utils/functions.js"

//Initializing MAP

const goToLocation = (lat, lng, zoom = 7, label = '', duration = 1500) => {
    const start = trailPoints[trailPoints.length - 1]; // last known point
    const end = [lat, lng];
    const startTime = performance.now();

    // Move map + marker at the same time
    map.flyTo(end, zoom, { duration: duration / 1000 });

    function animateStep(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1); // 0 → 1

        // Linear interpolation between start and end
        const lat = start[0] + (end[0] - start[0]) * progress;
        const lng = start[1] + (end[1] - start[1]) * progress;

        // Update marker position along the path
        marker.setLatLng([lat, lng]);

        // Redraw trail with the in-progress point appended
        trailLine.setLatLngs([...trailPoints, [lat, lng]]);

        if (progress < 1) {
            requestAnimationFrame(animateStep);
        } else {
            // Finalize — lock in the real endpoint
            trailPoints.push(end);
            trailLine.setLatLngs(trailPoints);
            if (label) marker.bindPopup(label).openPopup();
        }
    }

    requestAnimationFrame(animateStep);
}

const map = L.map('map', {
    center: [60.3184, 24.9633],
     zoom: 7,
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const marker = L.marker([60.3184, 24.9633]).addTo(map);
let trailPoints = [[60.3184, 24.9633]]; // starts with initial location
let trailLine = L.polyline(trailPoints, { color: 'blue', weight: 3, dashArray: '10, 10' }).addTo(map);


L.circle([60.3184, 24.9633], { radius: 500 }).addTo(map);

// Testing map

goToLocation(60.3184,24.9633,  7, "Helsinki Airport")

setTimeout(()=>{
    goToLocation(59.409831694 ,24.792830162, 7,"Tallin Airport")
}, 2000)



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


let playerName = player['name']
let playerGameLevel = player['level']
let playerCarbonFootPrints = player['carbonPrint']
let playerScore = player['score']
let playerId = player['playerId']
// let playerProgressId = player['progressId']

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

    const onLose = () => {
        player = JSON.parse(localStorage.getItem('playerDetails'));
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

changeLevel(playerGameLevel);

nextGameBtn.addEventListener("click", () => {
    location.reload();
    player = JSON.parse(localStorage.getItem('playerDetails'));
    changeLevel(player.level);

    sbLevel.innerText = player.level;
    sbScore.innerText = player.score;
})

quitBtn.addEventListener("click", () => {
    deletePlayerData()
    localStorage.removeItem('playerDetails');
    window.location.href = '../playerName/index.html';
})

playAgainBtn.addEventListener("click", () => {
    player = JSON.parse(localStorage.getItem('playerDetails'));
    player.score -= 500;

    localStorage.setItem("playerDetails", JSON.stringify(player));
    updatePlayerProgress(player.level, player.score, player.carbonPrint, player.playerId)

    location.reload();
})