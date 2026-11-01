import { state } from './state.js';

// ==== Добавление задачи ====
export function addTodo(text) {
    const trimmed = text.trim();
    if (!trimmed) return false;

    state.todos.push({
        id: state.nextId++,
        text: trimmed,
        completed: false
    });
    return true;
}

// ==== Переключение статуса «выполнено» ====
export function toggleTodo(id) {
    state.todos = state.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
}

// ==== Удаление задачи ====
export function deleteTodo(id) {
    state.todos = state.todos.filter(todo => todo.id !== id);
}

// ==== Фильтрация ====
export function setFilter(filter) {
    state.currentFilter = filter;
}