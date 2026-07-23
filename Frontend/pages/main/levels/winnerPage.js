import {
    createButtonElement,
    createDivElement,
    createParagraphElement,
    deletePlayerData
} from "../../../utils/functions.js";

const winnerPage = (playerName) => {
    // window.addEventListener("load", () => {
    //     let positionList = [
    //         {x: window.innerWidth * 0.50, y: window.innerHeight * 0.60},
    //         {x: window.innerWidth * 0.25, y: window.innerHeight * 0.40},
    //         {x: window.innerWidth * 0.75, y: window.innerHeight * 0.30},
    //     ];
    //     for (let i = 0; i < positionList.length; i++) {
    //         setTimeout(() => confetti({position: positionList[i]}), i * 250);
    //     }
    // });
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

    const goingToIsland = createParagraphElement("islandGoer", `You have reached the Treasure Island.`);
    winnerDiv.appendChild(goingToIsland)

    const quitPlayAgain = createButtonElement("winnerPageBtn", "Quit / Play Again")
    winnerDiv.appendChild(quitPlayAgain)

    quitPlayAgain.addEventListener("click", async () => {
    await deletePlayerData()
    localStorage.removeItem('playerDetails');
    window.location.href = '../playerName/index.html';
})

    confetti()
    confetti()
    confetti()
}

export default winnerPage