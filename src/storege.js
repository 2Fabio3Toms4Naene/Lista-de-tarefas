const STOREGE_KEY = 'todoAppState';

export function saveState(state) {
    localStorage.setItem(STOREGE_KEY, JSON.stringify(state));
}
export function loadState() {
    const data = localStorage.getItem(STOREGE_KEY);
    return data ? JSON.parse(data) : null;
}