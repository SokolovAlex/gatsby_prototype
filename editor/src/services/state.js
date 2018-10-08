import { createEmptyState } from 'ory-editor-core'

const storageKey = 'page_state';
const states = { };

const setItem = (key = storageKey, state) => {
    states[key] = state;
};

const getSavedItem = (key = storageKey) => {
    const storagedContent = localStorage.getItem(key);
    return storagedContent ? JSON.parse(storagedContent) : createEmptyState();
};

const saveItem = (key = storageKey) => {
    const state = getCurrentItem(key);
    localStorage.setItem(key, JSON.stringify(state));
};

const getCurrentItem = (key = storageKey) => {
    return states[key];
};

const clearState = (key = storageKey) => {
    localStorage.clear(key);
};

export { setItem, getSavedItem, getCurrentItem, saveItem, clearState };