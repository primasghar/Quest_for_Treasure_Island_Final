const form = document.querySelector(".nameForm");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    fetchNewPlayerData();
})

const fetchNewPlayerData = async () => {
    let nameInput = document.querySelector('[name=userName]').value;

    try {
        const response = await fetch(`http://127.0.0.1:5000/player/${nameInput}`)
        const newPlayerData = await response.json();
        localStorage.setItem("playerDetails", JSON.stringify(newPlayerData) );
        window.location.href ='../main/main.html';

    } catch (error) {
        console.log(error.message);
    }
};