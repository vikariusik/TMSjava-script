let myObject = {
  name: "John",
  age: 30,
};

delete myObject.name;
delete myObject.age;

console.log("Object after deletion:", myObject);

//2

const object = {
  name: "Alice",
  age: 25,
};

const keyToCheck = "name";

if (keyToCheck in object) {
  console.log(true);
}

//3
const student = {
  name: "John",
  age: 19,
  isHappy: true,
};

console.log("Ключи :", Object.keys(student));
console.log("Значения :", Object.values(student));

//4
const colors = {
  "ru pum pu ru rum": {
    red: "красный",
    green: "зеленый",
    blue: "синий",
  },
};

console.log(colors["ru pum pu ru rum"].red, colors["ru pum pu ru rum"].blue);

//5

let salaries = {
  andrey: 500,
  sveta: 413,
  anton: 987,
  igor: 664,
  alexandra: 199,
};

let sum = 0;
for (let salary of Object.values(salaries)) {
  sum += salary
}

console.log('Средняя зарплата = ', sum / Object.values(salaries).length);

//6

const user = {};

function registerUser() {
  const username = prompt("Придумайте логин:");
  const password = prompt("Придумайте пароль:");

  if (!username || !password) {
    alert("Логин и пароль не могут быть пустыми!");
    return registerUser();
  }

  user.username = username;
  user.password = password;

  alert("Регистрация завершена! Теперь подтвердите ваши данные.");
  verifyUser();
}



function verifyUser() {
  const inputUsername = prompt("Введите ваш логин для подтверждения:");
  const inputPassword = prompt("Введите ваш пароль для подтверждения:");

  if (inputUsername === user.username && inputPassword === user.password) {
    alert("Добро пожаловать, " + user.username + "!");
  } else {
    alert("Неверный логин или пароль. Попробуйте снова.");
    verifyUser();
  }
}

registerUser();