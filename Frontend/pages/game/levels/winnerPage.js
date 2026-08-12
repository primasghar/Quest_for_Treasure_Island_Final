import {
    deletePlayerData
} from "../utils/apis.js";

import {
    createButtonElement,
    createDivElement,
    createParagraphElement,
} from '../utils/domFunctions.js'

import {
    getPlayerProgressData,
    removePlayerProgressData
} from '../utils/localStorageFunctions.js'

const winnerPage = () => {
    let player = getPlayerProgressData();
    let carbonEmission = player.carbonPrint / 1000;

    console.log("winner page", player)

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
    winnerTitle.innerText = `Congratulations! ${player.name}.`;
    winnerDiv.appendChild(winnerTitle)

    const goingToIsland = createParagraphElement("islandGoer", `Your quest has ended. You will be taken to the Treasure Island by our associate.`);
    winnerDiv.appendChild(goingToIsland)

    if (carbonEmission > 953) {
        const penalityForAddedCarbon = createParagraphElement("carbonPenality", `As you have emitted more carbon than the standard allowed for travel. 
        You are obligated to plant 100,000 trees or you can donate tenth of your treasure any environmental protection agency of your choice`);
        winnerDiv.appendChild(penalityForAddedCarbon)
    }

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