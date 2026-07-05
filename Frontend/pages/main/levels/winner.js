import {gameTitle} from "../../../utils/functions";

const winner = (gameDiv, playerName) => {
    gameTitle("Winner")
    let playerCongrads = document.createElement("p")
    playerCongrads.innerText = `Congratulations ${playerName}. You have passed the final stage of the quest. You will be taken to the Treasure Island by boat.`
    gameDiv.appendChild(playerCongrads)
}

export default winner