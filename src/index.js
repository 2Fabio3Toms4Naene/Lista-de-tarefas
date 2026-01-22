import '../src/styles.css';

import { getActiveProject, inicializeDefaultProject } from './projects.js';
import { renderApp } from './render.js';
import { createProject, selectProject, removeProject } from './projects.js';
import { removeTodo } from './todos.js';
import { 
    openCreateTodo,
    openEditTodo,
    openDetailsTodo
 } from './modal.js';
import { state, updateState } from './state.js';
import { createTodo } from './todos.js';

// SELETORES
const allButtons = document.querySelectorAll('button');
const containerProjects = document.querySelector('.projects');
const addProjectButton = document.querySelector('#button-add-project-sidebar');
const asideContainerProjects = document.querySelector('.aside-container-projects');
const containerForm = document.querySelector('.container-form-add-project');
const formProject = document.querySelector('.form-add-project');
const inputTitle = document.querySelector('#title');

const cancelProjectButton = document.querySelector('#button-calcel');
const createProjectButton = document.querySelector('#button-criate');

const todoCheckbox = document.querySelectorAll('.todo-checkbox');

allButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
    });
});
// PROJETOS
addProjectButton.addEventListener('click', () => {
    if (asideContainerProjects.children.length >= 7) {
        alert('Lamentamos, você atingiu o limite de projetos');
    }
    else{
        containerForm.style.display = 'block';
    }
});

cancelProjectButton.addEventListener('click', () => {
    containerForm.style.display = 'none';
    formProject.reset();
});

createProjectButton.addEventListener('click', () => {
    if (inputTitle.value.length <= 0) {
        alert('Por favor, Digite o nome do projeto');
        return;
    }
    if(inputTitle.value.length > 18) {
        alert('O título do projeto de ter entre 1 a 18 caracteres')
    }
    if(inputTitle.value.length <= 18){
        createProject(inputTitle.value);
        formProject.reset();
        containerForm.style.display = 'none';
        renderApp();
    }
});

// EVENTOS GERAIS
document.addEventListener('click', (event) => {
    // ABRIR FORMULARIO PARA CRIAR TAREFA
    if (event.target.classList.contains('add-todo')) {
        if (containerProjects.children.length >= 7) {
            alert('Lamentamos, você atingiu o limite de tarefas');
        } else {
            openCreateTodo();
        }
    };

    // DETALHES DA TAREFA (SOMENTE LEITURA)
    if (event.target.classList.contains('details-todo')) {
        const todoId = event.target.closest('.todo-item').dataset.id;
        openDetailsTodo(todoId);
    };

    // EDITAR TAREFA
    if (event.target.classList.contains('edit-todo')) {
        const todoId = event.target.closest('.todo-item').dataset.id;
        openEditTodo(todoId);
    };

    // REMOVER TAREFA
    if (event.target.classList.contains('icon-delete-todo')) {
        const todoId = event.target.closest('.todo-item').dataset.id;
        removeTodo(todoId);
        renderApp();
    };

    // SELECIONAR PROJETO
    if (event.target.classList.contains('project-item')) {
        selectProject(Number(event.target.dataset.id));
        renderApp();
    };

    // REMOVER PROJETO
    if (event.target.classList.contains('icon-delete')) {
        const projectItem = event.target.closest('.container-project-button');
        if (!projectItem) {
            return;
        }

        const projectId = Number(event.target.closest('.container-project-button').dataset.id);

        if (Number.isNaN(projectId)) {
            return;
        }

        removeProject(projectId);
        renderApp();
    };
    if (event.target.classList.contains('todo-checkbox')) {
        const todoId = event.target.dataset.id;

        const project = getActiveProject();
        const todo = project.todos.find(todo => todo.id === todoId);

        if (!todo) {
            return;
        };

        todo.checked = event.target.checked;

        updateState();
    };
    
});

// INICIALIZACAO DO PROJETO PADRA
if (state.projects.length === 0) {
    inicializeDefaultProject();
}

// INICIAR PROJETO
renderApp();