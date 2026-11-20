import { state, resetState } from './state.js';
import { CONFIG, sleep } from './config.js';
import * as UI from './ui.js';
import { playGameOverSound } from './audio.js';

// Воспроизведение последовательности компьютером
async function playSequence() {
    state.isPlayingSequence = true;
    state.isWaitingForInput = false;
    UI.toggleBoardLock(true); // Блокируем клики
    
    await sleep(CONFIG.startDelay);

    for (let i = 0; i < state.sequence.length; i++) {
        // Если игра была прервана (ошибка/перезапуск) - выходим из цикла
        if (state.isGameOver) return; 
        await UI.flashSector(state.sequence[i], sleep);
        await sleep(CONFIG.pauseBetweenFlashes);
    }

    // Показ окончен, даем ход игроку
    state.isPlayingSequence = false;
    state.isWaitingForInput = true;
    UI.toggleBoardLock(false);
}

// Переход на следующий уровень
function nextRound() {
    state.level++;
    UI.updateLevelUI(state.level);
    state.playerInput = [];
    
    // Добавляем случайный элемент (0-3)
    const randomIndex = Math.floor(Math.random() * 4);
    state.sequence.push(randomIndex);
    
    UI.showMessage(`Уровень ${state.level}`);
    
    playSequence();
}

// Обработка клика игрока по сектору
export async function handleSectorClick(index) {
    // Игнорируем, если сейчас не наш ход или игра окончена
    if (!state.isWaitingForInput || state.isGameOver) return;

    await UI.flashSector(index, sleep, CONFIG.clickFlashDuration);
    state.playerInput.push(index);
    
    const currentStep = state.playerInput.length - 1;
    
    // Проверка на ошибку
    if (state.playerInput[currentStep] !== state.sequence[currentStep]) {
        endGame();
        return;
    }

    // Если вся последовательность введена верно
    if (state.playerInput.length === state.sequence.length) {
        state.isWaitingForInput = false;
        await sleep(500);
        nextRound();
    }
}

// Старт новой игры
export function startGame() {
    resetState();
    UI.setStartButtonText("Играть");
    UI.showMessage("Игра началась!");
    UI.updateLevelUI(0);
    nextRound();
}

// Конец игры (ошибка игрока)
function endGame() {
    state.isGameOver = true;
    state.isWaitingForInput = false;
    state.isPlayingSequence = false;
    
    UI.showMessage(`Вы дошли до уровня ${state.level}`, true);
    UI.setStartButtonText("Старт");
    playGameOverSound();
}