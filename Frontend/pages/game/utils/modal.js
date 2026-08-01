import {deletePlayerData} from "./functions.js";
import {
    createButtonElement,
    createDivElement,
    createParagraphElement,
} from './domUtilityFunctions.js'

import {removePlayerProgressData} from "./localStorageUtilityFunctions.js";


export const showMessageModal = (message, buttonText = null, onButtonClick = () => {
}) => {

    const overlay = createDivElement('modal-overlay');
    document.body.appendChild(overlay);
    const box = createDivElement('modal-box');
    overlay.appendChild(box);
    const messageEl = createParagraphElement('modal-message', message);
    box.appendChild(messageEl);
    const quitButton = createButtonElement('modal-quit', "quit");


    // Close modal helper
    const closeModal = () => {
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 200);
    }

    if (buttonText) {
        const button = createButtonElement('modal-button', buttonText);
        button.addEventListener('click', () => {
            closeModal();
            onButtonClick();
        });
        box.appendChild(button);
    }

    quitButton.addEventListener('click', async () => {
        closeModal();
        await deletePlayerData()
        removePlayerProgressData();
        window.location.href = '../playerName/index.html';
    })
    box.appendChild(quitButton)


    // Trigger fade-in
    requestAnimationFrame(() => overlay.classList.add('show'));
}

// Warning msg modal
export const warningMessageModal = (message) => {

    const overlay = createDivElement('modal-overlay');
    document.body.appendChild(overlay);
    const box = createDivElement('modal-box');
    overlay.appendChild(box);
    const messageEl = createParagraphElement('modal-message', message);
    box.appendChild(messageEl);

    // Close modal helper
    const closeModal = () => {
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 200);
    }

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    // Trigger fade-in
    requestAnimationFrame(() => overlay.classList.add('show'));
}