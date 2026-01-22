import { getActiveProject } from './projects.js';
import { state, updateState } from './state.js';

// CRIAR TAREFAS CON DADOS VINDOS DO FORMULARIO
export function createTodo(data) {
    const project = getActiveProject();

    if(!project) {
        return;
    }

    project.todos.push({
        id: crypto.randomUUID(),
        title: data.title,
        description: data.description,
        due: data.due,
        priority: data.priority,
        checked: false,
        
    });

    updateState();
};

// RETORNAR TAREFA PELO ID
export function getTodo(todoId) {
    const project = getActiveProject();
    return project.todos.find(todo => todo.id === todoId);
};

// ATUALIZAR TAREFA
export function updateTodo(data) {
    const todo = getTodo(state.editingTodoId);
    todo.title = data.title;
    todo.description = data.description;
    todo.due = data.due;
    todo.priority = data.priority;

    updateState();
};
// REMOVER TAREFA
export function removeTodo(todoId) {
    const project = getActiveProject();
    const todo = project.todos.find(todo => todo.id === todoId)

    if (!todo) {
        return;
    }

    // NAO REMOVER TAREFA PADRA
    if (todo?.isDefault) {
        alert('Nao é possivel remover a tarefa padrão');
        return;
    }

    project.todos = project.todos.filter(todo => todo.id !== todoId);

    updateState();
};
