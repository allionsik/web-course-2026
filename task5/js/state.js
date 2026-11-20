// Объект состояния игры
export const state = {
    sequence: [],             // Последовательность компьютера
    playerInput: [],          // Ввод игрока
    level: 0,                 // Текущий уровень
    isPlayingSequence: false, // Флаг: сейчас показывает компьютер
    isWaitingForInput: false, // Флаг: сейчас ход игрока
    isGameOver: true          // Флаг: игра окончена
};

// Сброс состояния при старте новой игры
export function resetState() {
    state.sequence = [];
    state.playerInput = [];
    state.level = 0;
    state.isGameOver = false;
    state.isPlayingSequence = false;
    state.isWaitingForInput = false;
}