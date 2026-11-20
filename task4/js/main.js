import { generateSecretNumber, countBullsAndCows } from './gameLogic.js';
import { validateInput } from './validation.js';
import * as UI from './ui.js';

// Состояние игры
let secretNumber = [];
let history = [];
let attempts = 0;
let isGameOver = false;

// Обраюотчики 

function handleCheck() {
    if (isGameOver) return;

    const guess = UI.elements.inputField.value.trim();
    const validationResult = validateInput(guess);

    // Если ошибка валидации
    if (validationResult !== true) {
        UI.showError(validationResult);
        return;
    }

    // Если валидация прошла успешно
    UI.hideError();
    attempts++;
    
    const result = countBullsAndCows(secretNumber, guess);
    
    // Добавляем в историю (состояние)
    history.push({
        guess: guess,
        bulls: result.bulls,
        cows: result.cows
    });

    // Обновляем UI
    UI.updateAttemptsDisplay(attempts);
    UI.renderHistory(history);
    
    UI.elements.inputField.value = '';
    UI.elements.inputField.focus();

    // Проверка на победу
    if (result.bulls === 4) {
        isGameOver = true;
        UI.showWin(attempts);
    }
}

function resetGame() {
    secretNumber = generateSecretNumber();
    history = [];
    attempts = 0;
    isGameOver = false;
    
    UI.resetUI();
    UI.updateAttemptsDisplay(attempts);
    UI.renderHistory(history);
    
    // Для отладки 
    // console.log("Загадано:", secretNumber.join('')); 
}

// Инициализация

// Навешиваем события
UI.elements.checkBtn.addEventListener('click', handleCheck);

// Обработка нажатия Enter в поле ввода
UI.elements.inputField.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        handleCheck();
    }
});

UI.elements.newGameBtn.addEventListener('click', resetGame);

// Запуск при загрузке страницы
window.addEventListener('DOMContentLoaded', resetGame);