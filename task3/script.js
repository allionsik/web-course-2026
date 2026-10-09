// ==== Состояние приложения ====
let todos = [];          // массив объектов { id, text, completed }
let currentFilter = 'all'; // 'all' | 'active' | 'completed'
let nextId = 1;          // уникальный ID

// ==== Ссылки на DOM-элементы ====
const form       = document.getElementById('todo-form');
const input      = document.getElementById('todo-input');
const list       = document.getElementById('todo-list');
const counter    = document.getElementById('counter');
const filtersBox = document.getElementById('filters');

// ==== Главная функция отрисовки ====
function render() {
    // 1. Фильтрация списка
    const visibleTodos = todos.filter(todo => {
        if (currentFilter === 'active')    return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true;
    });

    // 2. Очистка списка
    list.innerHTML = '';

    // 3. Пустое состояние или заполнение элементами
    if (visibleTodos.length === 0) {
        const empty = document.createElement('li');
        empty.className = 'empty';
        empty.textContent = todos.length === 0 ? 'Задач пока нет ✨' : 'Список пуст';
        list.appendChild(empty);
    } else {
        visibleTodos
            .map(createTodoElement)
            .forEach(el => list.appendChild(el));
    }

    // 4. Обновление счётчика
    updateCounter();
}

// ==== Создание элемента строки задачи ====
function createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.completed ? ' completed' : '');
    li.dataset.id = todo.id;

    // Чекбокс (кружок)
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleTodo(todo.id));

    // Текст задачи
    const span = document.createElement('span');
    span.className = 'todo-item__text';
    span.textContent = todo.text;

    // Кнопка удаления
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'todo-item__delete';
    deleteBtn.innerHTML = '&times;';
    deleteBtn.title = 'Удалить';
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

    li.append(checkbox, span, deleteBtn);
    return li;
}

// ==== Обновление счетчика задач ====
function updateCounter() {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const left = total - completed;
    counter.textContent = `Осталось: ${left}, Выполнено: ${completed}`;
}

// ==== Добавление задачи ====
function addTodo(text) {
    const trimmed = text.trim();
    if (!trimmed) {
        input.classList.add('error');
        setTimeout(() => input.classList.remove('error'), 600);
        return;
    }

    todos.push({
        id: nextId++,
        text: trimmed,
        completed: false
    });

    input.value = '';
    input.focus();
    render();
}

// ==== Переключение статуса «выполнено» ====
function toggleTodo(id) {
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    render();
}

// ==== Удаление задачи ====
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    render();
}

// ==== Фильтрация ====
function setFilter(filter) {
    currentFilter = filter;

    filtersBox.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });

    render();
}

// ==== Обработчики событий ====
form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo(input.value);
});

filtersBox.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    setFilter(btn.dataset.filter);
});

// ==== Первичный рендер ====
render();