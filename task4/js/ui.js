// Экспортируем сами элементы для удобства
export const elements = {
    inputField: document.getElementById('guess-input'),
    checkBtn: document.getElementById('check-btn'),
    newGameBtn: document.getElementById('new-game-btn'),
    errorMsg: document.getElementById('error-message'),
    winMsg: document.getElementById('win-message'),
    attemptsCount: document.getElementById('attempts-count'),
    historyList: document.getElementById('history-list')
};

/**
 * Отрисовка истории из массива данных
 */
export function renderHistory(history) {
    elements.historyList.innerHTML = '';
    
    history.forEach(item => {
        const li = document.createElement('li');
        
        // Склонение для красоты
        let bullText = item.bulls === 1 ? 'бык' : (item.bulls > 1 && item.bulls < 5 ? 'быка' : 'быков');
        let cowText = item.cows === 1 ? 'корова' : (item.cows > 1 && item.cows < 5 ? 'коровы' : 'коров');

        li.textContent = `${item.guess} → ${item.bulls} ${bullText}, ${item.cows} ${cowText}`;
        elements.historyList.appendChild(li);
    });
}

/**
 * Обновление счетчика попыток
 */
export function updateAttemptsDisplay(attempts) {
    elements.attemptsCount.textContent = attempts;
}

/**
 * Показать сообщение об ошибке
 */
export function showError(message) {
    elements.errorMsg.textContent = message;
    elements.errorMsg.classList.remove('hidden');
}

/**
 * Скрыть сообщение об ошибке
 */
export function hideError() {
    elements.errorMsg.classList.add('hidden');
}

/**
 * Отрисовка победы и блокировка интерфейса
 */
export function showWin(attempts) {
    elements.winMsg.textContent = `Победа! Угадано за ${attempts} попыток.`;
    elements.winMsg.classList.remove('hidden');
    elements.inputField.disabled = true;
    elements.checkBtn.disabled = true;
}

/**
 * Сброс интерфейса к начальному состоянию
 */
export function resetUI() {
    elements.inputField.value = '';
    elements.inputField.disabled = false;
    elements.checkBtn.disabled = false;
    hideError();
    elements.winMsg.classList.add('hidden');
    elements.inputField.focus();
}