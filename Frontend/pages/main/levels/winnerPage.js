const winnerPage = (gameDiv, resultArea, playerName) => {
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
    confetti()
    confetti()
    confetti()
    let winner = document.createElement('p');
    winner.className = "winner"
    winner.innerText = `Congratulations! ${playerName}.`

    let goingToIsland = document.createElement('p');
    goingToIsland.className = "islandGoer"
    goingToIsland.innerText = `Awesome! You have completed all stages. We will taken you to the land of 
            hidden riches, the Treasure Island. Our associate is waiting outside airport to take you there.`


    gameDiv.appendChild(winner)
    resultArea.appendChild(goingToIsland)
}

export default winnerPage