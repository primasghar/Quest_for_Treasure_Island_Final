import {createDivElement, createParagraphElement} from "./functions.js";

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