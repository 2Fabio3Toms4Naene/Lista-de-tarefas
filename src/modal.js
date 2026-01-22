import { state } from './state.js';
import { createTodo, getTodo, updateTodo } from './todos.js';
import { renderApp } from './render.js';

// FORMULARIO
const modal = document.querySelector('.container-add-todo');
const form = document.querySelector('.container-add-todo-form');
const title = document.querySelector('.todo-form-title');

const inputTitle = document.querySelector('#todo-name');
const inputDescription = document.querySelector('#todo-description');
const inputDate = document.querySelector('#todo-date');
const inputPriority = document.querySelector('#todo-priority');
const buttonSubmit = document.querySelector('#todo-criate');
const buttonCancel = document.querySelector('#todo-cancel');

// ABRIR FORMULARIO CRIAR
export function openCreateTodo() {
    state.formMode = 'create';
    state.editingTodoId = null;

    title.textContent = 'Criar tarefa';
    buttonSubmit.textContent = 'criar';

    clearForm();
    setReadonly();
    show();
};

// ABRIR FORMULARIO DE DETALHES
export function openDetailsTodo(todoId) {
    state.formMode = 'details';
    state.editingTodoId = todoId;

    const todo = getTodo(todoId);
    fillForm(todo);

    title.textContent = 'Detalhes da tarefa';
    buttonSubmit.disabled = true;

    setReadonly(true);
    show();
};

// ABRIR FORMULARIO DE EDICAO
export function openEditTodo(todoId) {
    state.formMode = 'edit';
    state.editingTodoId = todoId;

    title.textContent = 'Editar tarefa';
    buttonSubmit.textContent = 'Salvar';
    buttonSubmit.disabled = false;

    setReadonly();
    show();
};

buttonSubmit.addEventListener('click', () => {
    const data = {
        title: inputTitle.value,
        description: inputDescription.value,
        due: inputDate.value,
        priority: inputPriority.value,
    };

    if(state.formMode === 'create') {
        createTodo(data);
    }
    if(state.formMode === 'edit') {
        updateTodo(data);
    }

    close();
    renderApp();
});

buttonCancel.addEventListener('click', () => {
    close();
});

function fillForm(todo) {
    inputTitle.value = todo.title;
    inputDescription.value = todo.description;
    inputDate.value = todo.due;
    inputPriority.value = todo.priority;
};

function clearForm() {
    inputTitle.value = '';
    inputDescription.value = '';
    inputDate.value = '';
    inputPriority.value = '';
};

function setReadonly(value) {
    [inputTitle, inputDescription, inputDate, inputPriority].forEach(element => {
        element.disabled = value;
    });
};

function show() {
    modal.classList.remove('hidden');
};

function close() {
    modal.classList.add('hidden');
};