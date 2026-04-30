const form = document.querySelector(".nameForm");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    fetchNewPlayerData();
    window.location.href = '../main/main.html'
})

const fetchNewPlayerData = async () => {
    let nameInput = document.querySelector('[name=userName]').value;

    try {
        const response = await fetch(`http://127.0.0.1:5000/player/${nameInput}`)
        const newPlayerData = await response.json();
        console.log(newPlayerData);
        localStorage.setItem("playerDetails", JSON.stringify(newPlayerData) )

    } catch (error) {
        console.log(error.message);
    }
};