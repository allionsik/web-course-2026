import { state } from './state.js';
import * as actions from './actions.js';
import { render } from './render.js';

const form       = document.getElementById('todo-form');
const input      = document.getElementById('todo-input');
const filtersBox = document.getElementById('filters');

// ==== Перерисовка с передачей обработчиков ====
function refresh() {
    render({
        onToggle: (id) => { actions.toggleTodo(id); refresh(); },
        onDelete: (id) => { actions.deleteTodo(id); refresh(); }
    });
}

// ==== Показ ошибки ====
function showInputError() {
    input.classList.add('error');
    setTimeout(() => input.classList.remove('error'), 600);
}

// ==== Отправка формы ====
form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!actions.addTodo(input.value)) {
        showInputError();
        return;
    }

    input.value = '';
    input.focus();
    refresh();
});

// ==== Фильтры (делегирование) ====
filtersBox.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    actions.setFilter(btn.dataset.filter);
    refresh();
});

// ==== Первичный рендер ====
refresh();