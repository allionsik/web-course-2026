// Сбор DOM-элементов
export const DOM = {
    startBtn: document.getElementById('start-btn'),
    levelDisplay: document.getElementById('level'),
    messageDisplay: document.getElementById('message'),
    board: document.getElementById('game-board'),
    sectors: document.querySelectorAll('.sector')
};

// Константы настроек игры
export const CONFIG = {
    flashDuration: 400,       // Длительность подсветки компьютера
    pauseBetweenFlashes: 200, // Пауза между подсветками
    clickFlashDuration: 200,  // Длительность подсветки при клике игрока
    startDelay: 500,          // Задержка перед началом показа
    frequencies: [329.63, 261.63, 220.00, 164.81] // Частоты звуков (E4, C4, A3, E3)
};

// Вспомогательная функция: setTimeout, обернутый в Promise
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}