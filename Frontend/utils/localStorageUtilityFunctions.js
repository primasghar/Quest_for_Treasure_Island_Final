//-------------------------Accessing Elements------------
export const getPlayerProgressData = () => JSON.parse(localStorage.getItem('playerDetails'));
export const setPlayerProgress = (player) =>  localStorage.setItem("playerDetails", JSON.stringify(player));
export const removePlayerProgressData =  () => localStorage.removeItem('playerDetails');