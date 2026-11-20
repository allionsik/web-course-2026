/**
 * Валидация введенных данных
 * @param {string} str - строка ввода
 * @returns {boolean|string} - true, если валидно, строка с ошибкой, если нет
 */
export function validateInput(str) {
    if (!/^\d{4}$/.test(str)) {
        return 'Введите ровно 4 цифры (без букв и символов).';
    }
    
    const digits = str.split('');
    const uniqueDigits = new Set(digits);
    if (uniqueDigits.size !== 4) {
        return 'Все цифры должны быть разными.';
    }

    return true;
}