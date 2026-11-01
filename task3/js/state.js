// ==== Состояние приложения ====

export const state = {
    todos: [],            // массив объектов { id, text, completed }
    currentFilter: 'all', // 'all' | 'active' | 'completed'
    nextId: 1             // уникальный ID
};