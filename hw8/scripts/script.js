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

  // 2. Create initial Todo Items 
  const initialTodos = [
    { text: 'Todo item 1', date: '2024-11-06' },
    { text: 'Another todo item', date: '2024-11-07' }
  ];

  initialTodos.forEach(todo => {
    const todoItemDiv = createTodoItem(todo.text, todo.date);
    root.appendChild(todoItemDiv);
  });

  // --- Helper Functions ---

  function createTodoItem(text, date) {
    const todoItemDiv = document.createElement('div');
    todoItemDiv.className = 'todo-item';

    const completeButton = document.createElement('button');
    completeButton.className = 'complete-button';
    completeButton.textContent = '✓'; 
    todoItemDiv.appendChild(completeButton);

    const todoTextDiv = document.createElement('div');
    todoTextDiv.className = 'todo-text';
    todoTextDiv.textContent = text;
    todoItemDiv.appendChild(todoTextDiv);

    const dateDeleteDiv = document.createElement('div');
    dateDeleteDiv.className = 'date-delete-wrapper'
    todoItemDiv.appendChild(dateDeleteDiv)

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'X';
    dateDeleteDiv.appendChild(deleteButton);
    
    const dateSpan = document.createElement('div');
    dateSpan.className = 'date';
    dateSpan.textContent = date;

    dateDeleteDiv.appendChild(dateSpan);

    return todoItemDiv;
  }

  // --- Event Listeners ---

  addButton.addEventListener('click', () => {
    const newTodoText = todoInput.value.trim();
    if (newTodoText !== '') {
      const newTodoItem = createTodoItem(newTodoText, new Date().toLocaleDateString());
      root.appendChild(newTodoItem);
      todoInput.value = ''; 
    }
  });

  deleteAllButton.addEventListener('click', () => {
    const todoItems = root.querySelectorAll('.todo-item');
    todoItems.forEach(item => item.remove());
  });


  root.addEventListener('click', (event) => {
    if (event.target.classList.contains('complete-button')) {
      const todoItem = event.target.closest('.todo-item'); 
      todoItem.classList.toggle('completed'); // Toggle 'completed' class
    } else if (event.target.classList.contains('delete-button')) {
      const todoItem = event.target.closest('.todo-item');
      todoItem.remove();
    }
  });

});