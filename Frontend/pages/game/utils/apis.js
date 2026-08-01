

//Updates the table in the BACKEND
export const updatePlayerProgress = async (player) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/update/progress`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                level: player.level,
                score: player.score,
                carbon_fp: player.carbonPrint,
                player_id: player.playerId,
                attempts: player.attempts,
                collectibles: player.collectibles
            }),

        })
        return await response.json();
    } catch (error) {
        console.log(error.message);
    }
};


//Fetches all airports ICAO from BACKEND -- selected to be used in this game.
export const allICAOCodes = async () => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/airports/icao`)
        return await response.json();
    } catch (error) {
        console.log(error.message);
    }
};

//Fetches airports data from BACKEND  with ICAO--Returns "list" of airports as objects
export const airportData = async (icao_list) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/airportDetail/${icao_list}`)
        return await response.json();
    } catch (error) {
        console.log(error.message);
    }
};

export const playerCollectables = async (playerId) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/player/collectables/${playerId}`)
        return await response.json();
    } catch (error) {
        console.log(error.message);
    }
};

//Deletes everything when QUIT button is pressed.
export const deletePlayerData = async () => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/quit`)
        return await response.json();

    } catch (error) {
        console.log(error.message);
    }
};

//Fetching all riddles from BE
export const fetchRiddles = async () => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/riddles`)
        return await response.json();
    } catch (error) {
        console.log(error.message);
    }
};

//fetching all questions from BE
export const fetchQuizQuestions = async () => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/quiz/questions`)
        return await response.json();
    } catch (error) {
        console.log(error.message);
    }
};