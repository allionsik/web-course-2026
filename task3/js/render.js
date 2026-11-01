import { state } from './state.js';

const list       = document.getElementById('todo-list');
const counter    = document.getElementById('counter');
const filtersBox = document.getElementById('filters');

// ==== Главная функция отрисовки ====
export function render({ onToggle, onDelete }) {
    const { todos, currentFilter } = state;

    // 1. Фильтрация
    const visibleTodos = todos.filter(todo => {
        if (currentFilter === 'active')    return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true;
    });

    // 2. Очистка
    list.innerHTML = '';

    // 3. Пустое состояние или заполнение
    if (visibleTodos.length === 0) {
        const empty = document.createElement('li');
        empty.className = 'empty';
        empty.textContent = todos.length === 0 ? 'Задач пока нет ' : 'Список пуст';
        list.appendChild(empty);
    } else {
        visibleTodos
            .map(todo => createTodoElement(todo, { onToggle, onDelete }))
            .forEach(el => list.appendChild(el));
    }

    // 4. Счётчик
    updateCounter();

    // 5. Подсветка фильтра
    updateFilterButtons();
}

// ==== Создание строки задачи ====
function createTodoElement(todo, { onToggle, onDelete }) {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.completed ? ' completed' : '');
    li.dataset.id = todo.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => onToggle(todo.id));

    const span = document.createElement('span');
    span.className = 'todo-item__text';
    span.textContent = todo.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'todo-item__delete';
    deleteBtn.innerHTML = '&times;';
    deleteBtn.title = 'Удалить';
    deleteBtn.addEventListener('click', () => onDelete(todo.id));

    li.append(checkbox, span, deleteBtn);
    return li;
}

// ==== Счётчик ====
function updateCounter() {
    const { todos } = state;
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    counter.textContent = `Осталось: ${total - completed}, Выполнено: ${completed}`;
}

// ==== Подсветка активной кнопки фильтра ====
function updateFilterButtons() {
    filtersBox.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === state.currentFilter);
    });
}