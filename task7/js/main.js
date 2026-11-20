import { fetchPostsPage } from './api.js';
import { state, addPosts, setSearchQuery } from './state.js';
import { renderPosts, toggleLoader, showEndMessage, showError, hideError } from './ui.js';

const searchInput = document.getElementById('searchInput');
let isLoading = false;

document.addEventListener('DOMContentLoaded', () => {
    loadMorePosts();
    
    window.addEventListener('scroll', handleScroll);
    searchInput.addEventListener('input', handleSearchInput);
});

async function loadMorePosts() {
    if (isLoading || !state.hasMore) return;

    isLoading = true;
    toggleLoader(true);
    hideError();

    try {
        const newPosts = await fetchPostsPage(state.currentPage);
        
        addPosts(newPosts);
        renderPosts(state.displayedPosts);
        
        if (!state.hasMore) {
            showEndMessage();
        }
    } catch (error) {
        console.error('Ошибка загрузки:', error);
        showError('Не удалось загрузить посты. Проверьте интернет.');
    } finally {
        isLoading = false;
        toggleLoader(false);
    }
}

function handleScroll() {
    if (isLoading || !state.hasMore) return;

    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.documentElement.scrollHeight - 200;

    if (scrollPosition >= threshold) {
        loadMorePosts();
    }
}

function handleSearchInput(e) {
    const query = e.target.value;
    
    clearTimeout(window.searchTimeout);
    
    window.searchTimeout = setTimeout(() => {
        setSearchQuery(query);
        renderPosts(state.displayedPosts);
    }, 300);
}