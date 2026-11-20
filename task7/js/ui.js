const postsContainer = document.getElementById('postsContainer');
const loader = document.getElementById('loader');
const endMessage = document.getElementById('endMessage');
const errorMessage = document.getElementById('errorMessage');

export function renderPosts(posts) {
    postsContainer.innerHTML = '';

    if (posts.length === 0) {
        postsContainer.innerHTML = '<p style="text-align:center; color:#94a3b8;">Ничего не найдено</p>';
        return;
    }

    posts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'post-card';
        card.innerHTML = `
            <h2>${post.title}</h2>
            <p class="body">${post.body}</p>
            <div class="author">Автор ID: ${post.userId}</div>
        `;
        postsContainer.appendChild(card);
    });
}

export function toggleLoader(show) {
    if (show) {
        loader.classList.remove('hidden');
    } else {
        loader.classList.add('hidden');
    }
}

export function showEndMessage() {
    endMessage.classList.remove('hidden');
}

export function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    setTimeout(() => {
        errorMessage.classList.add('hidden');
    }, 5000);
}

export function hideError() {
    errorMessage.classList.add('hidden');
}