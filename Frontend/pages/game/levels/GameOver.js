import {
    deletePlayerData
} from "../utils/functions.js";
import {
    createButtonElement,
    createDivElement,
    createParagraphElement,
} from '../utils/domUtilityFunctions.js'
import {
    removePlayerProgressData
} from '../utils/localStorageUtilityFunctions.js'

const GameOver = (playerName) => {
    const gameSection = document.querySelector('.gameAndResultSection');
    gameSection.innerHTML = "";

    const gameOverDiv = createDivElement('gameOverDiv')
    gameSection.appendChild(gameOverDiv)

    const noMapFoundIcon = createDivElement("noMap")
    noMapFoundIcon.innerHTML = `<i class="ti ti-map-off" aria-hidden="true"></i>`;
    gameOverDiv.appendChild(noMapFoundIcon)

    const gameOverText = createParagraphElement("gameOverText", `Game Over!`)
    gameOverDiv.appendChild(gameOverText)

    const explainerText = createParagraphElement("explainerText", `You don't have enough score to play the game again.`)
    gameOverDiv.appendChild(explainerText)

    const sorryPlayer = createParagraphElement("sorryPlayer", `Sorry, ${playerName}! You cannot reach the Treasure Island.`)
    gameOverDiv.appendChild(sorryPlayer)


    const quitPlayAgain = createButtonElement("quitAndPlayBtn", "Quit / Play Again")
    gameOverDiv.appendChild(quitPlayAgain)

    quitPlayAgain.addEventListener("click", async () => {
        await deletePlayerData()
       removePlayerProgressData();
        window.location.href = '../playerName/index.html';

    })
}

export default GameOver