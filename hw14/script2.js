async function fetchTodoById(id) {
  let response = await fetch(
    `https://6811f5633ac96f7119a647e4.mockapi.io/PinterestClone/Api/todos/${id}`
  );
  if (!response.ok) throw new Error(`Ошибка загрузки todo с id ${id}`);
  return response.json();
}

function printTodos(todos) {
  const ul = document.createElement('ul');
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo.id + ' ' + todo.text;;
    ul.appendChild(li);
  });
  document.body.appendChild(ul);
}

async function loadTodosInOrder(ids) {
  const results = [];
  try {
    for (const id of ids) {
      const todo = await fetchTodoById(id);
      results.push(todo);
    }
    printTodos(results);
  } catch (error) {
    console.error(error);
  }
}

const ids = [15, 23, 7, 3];
loadTodosInOrder(ids);
