export const state = {
    allPosts: [],
    displayedPosts: [],
    currentPage: 1,
    hasMore: true,
    searchQuery: '',
    totalPostsLimit: 100
};

export function addPosts(newPosts) {
    state.allPosts = [...state.allPosts, ...newPosts];
    
    if (newPosts.length === 0 || state.allPosts.length >= state.totalPostsLimit) {
        state.hasMore = false;
    }
    
    state.currentPage++;
    updateDisplayedPosts();
}

export function updateDisplayedPosts() {
    if (!state.searchQuery) {
        state.displayedPosts = [...state.allPosts];
    } else {
        state.displayedPosts = state.allPosts.filter(post => 
            post.title.toLowerCase().includes(state.searchQuery)
        );
    }
}

export function setSearchQuery(query) {
    state.searchQuery = query.trim().toLowerCase();
    updateDisplayedPosts();
}