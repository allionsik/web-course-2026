const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const LIMIT = 10;

export async function fetchPostsPage(page) {
    const response = await fetch(`${API_URL}?_page=${page}&_limit=${LIMIT}`);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
}