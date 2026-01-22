import { loadState, saveState } from "./storege";

const savedState = loadState();

export const state = savedState ||{
    activeProjectId: null,
    editingTodoId: null,
    formMode: null, // criar datalhes editar
    projects: [],
};

export function updateState() {
    saveState(state);
};