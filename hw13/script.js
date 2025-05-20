async function getTodos() {
  const response = await fetch('https://6811f5633ac96f7119a647e4.mockapi.io/PinterestClone/Api/todos');
  if (!response.ok) {
    throw new Error('Ошибка загрузки данных');
  }
  return response.json();
}

function printTodos(todos) {
  const ul = document.createElement('ul');
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo.id + ' ' + todo.text;
    ul.appendChild(li);
  });
  document.body.appendChild(ul);
}

getTodos()
  .then(printTodos)
  .catch(error => {
    const errorDiv = document.createElement('div');
    errorDiv.textContent = 'Ошибка загрузки';
    errorDiv.style.color = 'red';
    document.body.appendChild(errorDiv);
  });