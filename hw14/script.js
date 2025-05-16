function fetchTodoById(id) {
  return fetch(
    `https://6811f5633ac96f7119a647e4.mockapi.io/PinterestClone/Api/todos/${id}`
  ).then((response) => {
    if (!response.ok) throw new Error(`Ошибка загрузки todo с id ${id}`);
    return response.json();
  });
}

function printTodos(todos) {
  const ul = document.createElement("ul");
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.id + " - " + todo.text;
    ul.appendChild(li);
  });
  document.body.appendChild(ul);
}

const ids = [15, 23, 7, 3, 5];
function loadTodosInOrder(ids) {
  const results = [];
  let chain = Promise.resolve();

  ids.forEach((id) => {
    chain = chain
      .then(() => fetchTodoById(id))
      .then((todo) => {
        results.push(todo);
      });
  });

  chain
    .then(() => {
      printTodos(results);
    })
    .catch((error) => {
      console.error(error);
    });
}

loadTodosInOrder(ids);