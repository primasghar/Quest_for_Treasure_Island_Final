const form = document.querySelector(".nameForm");
const nameInput = document.querySelector('[name=userName]');

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    fetchNewPlayerData();
})

nameInput.addEventListener("keypress", (e)=>{
    if(e.key === "Enter") form.click();
})

const fetchNewPlayerData = async () => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/player/${nameInput.value}`)
        const newPlayerData = await response.json();

        localStorage.setItem("playerDetails", JSON.stringify(newPlayerData) );
        window.location.href ='../game/main.html';

    } catch (error) {
        console.log(error.message);
    }
};