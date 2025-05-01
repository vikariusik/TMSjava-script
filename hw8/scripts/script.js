import { getData, createTodoItem  } from './helpers.js';
import { Todo } from './Todo.js';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');

  // 1. Create Controls Section
  const controlsDiv = document.createElement('div');
  controlsDiv.className = 'controls';

  const deleteAllButton = document.createElement('button');
  deleteAllButton.textContent = 'Delete All';
  controlsDiv.appendChild(deleteAllButton);

  const todoInput = document.createElement('input');
  todoInput.type = 'text';
  todoInput.placeholder = 'Enter todo...';
  controlsDiv.appendChild(todoInput);

  const addButton = document.createElement('button');
  addButton.textContent = 'Add';
  controlsDiv.appendChild(addButton);

  root.appendChild(controlsDiv);

  let todos = [];
  todos = getData()

  let lastId = todos.length === 0 ? 0 : todos[todos.length - 1].id;

  todos.forEach(todo => {
    const todoItemDiv = createTodoItem(todo);
    root.appendChild(todoItemDiv);
  });

  // --- Event Listeners ---

  window.onbeforeunload = function ()
  {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  addButton.addEventListener('click', () => {
    const newTodoText = todoInput.value.trim();
    if (newTodoText !== '') {
      const todo = new Todo(++lastId, newTodoText);
      todos.push(todo);

      const newTodoItem = createTodoItem(todo);
      root.appendChild(newTodoItem);
      todoInput.value = ''; 
    }
  });

  deleteAllButton.addEventListener('click', () => {
    const todoItems = root.querySelectorAll('.todo-item');
    todoItems.forEach(item => item.remove());
    todos = [];
  });

  root.addEventListener('click', (event) => {
    if (event.target.classList.contains('complete-button')) {
      const todoItem = event.target.closest('.todo-item'); 
      todoItem.classList.toggle('completed'); // Toggle 'completed' class
      let todo = todos.find(t => t.id == todoItem.id);
      todo.isChecked = !todo.isChecked;
      event.target.textContent = todo.isChecked ? '✓' : '';
    } else if (event.target.classList.contains('delete-button')) {
      const todoItem = event.target.closest('.todo-item');
      todoItem.remove();
      todos.splice(todos.findIndex(t => t.id == todoItem.id),1)
    }
  });
});
