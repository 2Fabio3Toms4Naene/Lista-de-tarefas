import { state, updateState } from './state.js';
import { format } from 'date-fns';

// CRIAR UM PROJETO
export function createProject(title) {
    const project = {
        id: Date.now(),
        title,
        todos: [],
        isDafault: false,
    };
    state.projects.push(project);
    if(!state.activeProjectId) {
        state.activeProjectId = project.id;
    };

    updateState();
};

// RETORNAR PROJETO ATIVO
export function getActiveProject() {
    return state.projects.find(project => project.id === state.activeProjectId);
};

// SELECIONAR PROJETO
export function selectProject(id) {
    state.activeProjectId = id;

    updateState();
};

// REMOVER PROJETO
export function removeProject(projectId) {
    const project = state.projects.find(project => project.id === projectId);

    // NAO REMOVER PROJETO PADRAO
    if (project?.isDefault) {
        alert('Nao é possivel remover o projeto padrão');
        return;
    };

    // REMOVER PROJETO
    state.projects = state.projects.filter(project => project.id !== projectId);

    // SE REMOVER PROJETO ATIVOESCOLHER OUTRO
    if (state.activeProjectId == projectId) {
        state.activeProjectId = state.projects.length
        ? state.projects[0].id
        : null;
    };
    updateState();
};

// PROJETO PADRAO
const now = new Date();

export function inicializeDefaultProject() {
    const defaultProject = {
        id: 0,
        title: 'Projeto padrão',
        todos: [
            {
                id: crypto.randomUUID(),
                title: 'Minha tarefa',
                description: 'você pode editar essa tarefa',
                due: '01-01-2026',
                priority: 'normal',
                isDefault: true,
                checked: false,
                createdAt: now.toISOString(),
                displayDate: format(now, 'dd/MM/yyyy'),
            },
        ],
        isDefault: true,
    };

    state.projects.push(defaultProject);
    state.activeProjectId = defaultProject.id;

    updateState();
};
