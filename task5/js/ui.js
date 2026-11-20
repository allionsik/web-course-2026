import { DOM, CONFIG } from './config.js';
import { playSound } from './audio.js';

export function updateLevelUI(level) {
    DOM.levelDisplay.textContent = level;
}

export function showMessage(text, isError = false) {
    DOM.messageDisplay.textContent = text;
    // Красный цвет для ошибки, фиолетовый для обычного текста
    DOM.messageDisplay.style.color = isError ? '#ff6b6b' : '#a18cd1';
}

export function toggleBoardLock(isLocked) {
    if (isLocked) {
        DOM.board.classList.add('locked');
    } else {
        DOM.board.classList.remove('locked');
    }
}

export function setStartButtonText(text) {
    DOM.startBtn.textContent = text;
}

export async function flashSector(index, sleepFn, duration = CONFIG.flashDuration) {
    const sector = DOM.sectors[index];
    sector.classList.add('active');
    playSound(index);
    
    await sleepFn(duration);
    sector.classList.remove('active');
}