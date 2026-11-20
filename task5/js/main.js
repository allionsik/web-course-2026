import { DOM } from './config.js';
import { initAudio } from './audio.js';
import { startGame, handleSectorClick } from './game.js';

// Инициализация обработчиков событий
function initEvents() {
    // Кнопка "Старт"
    DOM.startBtn.addEventListener('click', () => {
        initAudio(); // Разблокировка звука (требование браузеров)
        startGame();
    });

    // Клики по секторам
    DOM.sectors.forEach((sector, index) => {
        sector.addEventListener('click', () => handleSectorClick(index));
    });
}

// Запуск после загрузки страницы
document.addEventListener('DOMContentLoaded', initEvents);