import {
    deletePlayerData
} from "../utils/apis.js";

import {
    createButtonElement,
    createDivElement,
    createParagraphElement,
} from '../utils/domFunctions.js'

import {
    removePlayerProgressData
} from '../utils/localStorageFunctions.js'

const winnerPage = (playerName) => {
    const gameSection = document.querySelector('.gameAndResultSection');
    gameSection.innerHTML = '';

    const levelAndAttempts = document.querySelector('.levelAndAttempts')
    levelAndAttempts.innerHTML = ''

    const winnerDiv = createDivElement("winnerDiv")
    gameSection.appendChild(winnerDiv)

    const win = createParagraphElement('win', "WINNER")
    winnerDiv.appendChild(win)

    const winnerTitle = document.createElement('h2')
    winnerTitle.className = "winnerTitle";
    winnerTitle.innerText = `Congratulations! ${playerName}.`;
    winnerDiv.appendChild(winnerTitle)

    const goingToIsland = createParagraphElement("islandGoer", `Your quest has ended. You will be taken to the Treasure Island by our associate.`);
    winnerDiv.appendChild(goingToIsland)

    const quitPlayAgain = createButtonElement("quitAndPlayBtn", "Quit / Play Again")
    winnerDiv.appendChild(quitPlayAgain)

    quitPlayAgain.addEventListener("click", async () => {
    await deletePlayerData()
    removePlayerProgressData();
    window.location.href = '../playerName/index.html';
    window.location.href = '../playerName/index.html';
})

    confetti()
    confetti()
    confetti()
}

export default winnerPage