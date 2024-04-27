// Gestion du stockage local
export function loadFromStorage(key, defaultValue) {
    return parseInt(localStorage.getItem(key)) || defaultValue;
}

export function saveToStorage(key, value) {
    localStorage.setItem(key, value.toString());
}
