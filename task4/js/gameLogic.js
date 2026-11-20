/**
 * Генерация случайного 4-значного числа с неповторяющимися цифрами
 */
export function generateSecretNumber() {
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const result = [];
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        result.push(digits[randomIndex]);
        digits.splice(randomIndex, 1);
    }
    return result;
}

/**
 * Подсчет быков и коров
 * @param {Array} secret - загаданное число (массив цифр)
 * @param {string} guess - попытка игрока (строка)
 * @returns {Object} - { bulls, cows }
 */
export function countBullsAndCows(secret, guess) {
    let bulls = 0;
    let cows = 0;
    const guessArray = guess.split('');

    for (let i = 0; i < 4; i++) {
        if (guessArray[i] == secret[i]) {
            bulls++;
        } else if (secret.includes(Number(guessArray[i]))) {
            cows++;
        }
    }

    return { bulls, cows };
}