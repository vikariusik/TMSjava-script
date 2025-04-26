export { getData, createTodoItem }

function getData() {
    const data = localStorage.getItem('todos');
    if (data !== null)
    {
      return JSON.parse(data);
    }
    return [];
  }

  function createTodoItem({ id, date, text, isChecked }) {

   const todoItemDiv = document.createElement('div');
   todoItemDiv.className = 'todo-item';
   if (!isChecked) {
     todoItemDiv.classList.add('completed');
   }
   todoItemDiv.id = id;
 
   const completeButton = document.createElement('button');
   completeButton.className = 'complete-button';
   completeButton.textContent = '✓';
 
   const todoTextDiv = document.createElement('div');
   todoTextDiv.className = 'todo-text';
   todoTextDiv.textContent = text;
 
   const dateDeleteDiv = document.createElement('div');
   dateDeleteDiv.className = 'date-delete-wrapper';
 
   const deleteButton = document.createElement('button');
   deleteButton.className = 'delete-button';
   deleteButton.textContent = 'X';
 
   const dateSpan = document.createElement('div');
   dateSpan.className = 'date';
   dateSpan.textContent = date;
 
   dateDeleteDiv.appendChild(deleteButton);
   dateDeleteDiv.appendChild(dateSpan);
   todoItemDiv.appendChild(completeButton);
   todoItemDiv.appendChild(todoTextDiv);
   todoItemDiv.appendChild(dateDeleteDiv);
 
   return todoItemDiv;
  }