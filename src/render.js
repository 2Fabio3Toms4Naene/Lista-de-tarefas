import { state } from './state.js';
import { getActiveProject } from './projects.js';
import iconDelete from './images/deletar.png';

export function renderProject() {
    const container = document.querySelector('.aside-container-projects');
    container.innerHTML = '';
    state.projects.forEach(prject => {

        const div = document.createElement('div');
        div.classList.add('container-project-button');
        div.dataset.id = prject.id;

        const buttonTitle = document.createElement('button');
        buttonTitle.classList.add('project-item');
        buttonTitle.dataset.id = prject.id;

        const buttonDelete = document.createElement('button');
        buttonDelete.classList.add('delete-project');

        const iconButtonDelete = document.createElement('img');
        iconButtonDelete.classList.add('icon-delete');
        iconButtonDelete.src = iconDelete;
        iconButtonDelete.alt = 'botao deletar';

        if (prject.id === state.activeProjectId) {
            buttonTitle.classList.add('active');
        };

        buttonTitle.textContent = prject.title;
        buttonDelete.appendChild(iconButtonDelete);
        div.append(buttonDelete, buttonTitle)
        container.appendChild(div);
    });
};

// RENDERIZAR TAREFAS
export function renderTodos() {
    const containerProjects = document.querySelector('.projects')
    const containerAddTodoButton = document.querySelector('.container-add-todo-button');
    const project = getActiveProject();

    containerProjects.innerHTML = '';
    containerAddTodoButton.innerHTML = '';

    if (!project) {
        return;
    };

    const h3 = document.createElement('h3');
    h3.textContent = project.title;
    containerProjects.appendChild(h3);

    const addButton = document.createElement('button');
    addButton.textContent = 'Adicionar Tarefa';
    addButton.className = 'add-todo';

    containerAddTodoButton.appendChild(addButton);

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    project.todos.forEach(todo => {
        const div = document.createElement('div');
        div.className = 'todo-item';
        div.dataset.id = todo.id;

        div.innerHTML = `
            <div class='container-check-todo'>
                <input type="checkbox" class="todo-checkbox" data-id='${todo.id}' ${todo.checked ? 'checked' : ''}>
                <strong>${todo.title}</strong>
            </div>
            
            <div class='container-details-todo'>
                <button class='details-todo'>Detalhes</button>
                <button class='edit-todo'>Editar</button>
                <strong>${day}-${month}-${year}</strong>
                <button class='remove-todo'>
                <img src='${iconDelete}' alt='deletar' class='icon-delete-todo'>
                </button>
            </div>
            `;
        
        containerProjects.appendChild(div);
    });
};

export function renderApp() {
    renderProject();
    renderTodos();
};