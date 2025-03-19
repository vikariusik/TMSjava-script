let v1 = "true";
let v2 = false;
let v3 = 17;
let v4 = undefined;
let v5 = null;

console.log(`Variable: ${v1} have type: ${typeof v1}`);
console.log(`Variable: ${v2} have type: ${typeof v2}`);
console.log(`Variable: ${v3} have type: ${typeof v3}`);
console.log(`Variable: ${v4} have type: ${typeof v4}`);
console.log(`Variable: ${v5} have type: ${typeof v5}`);

//2

let height = 15;
let width = 20;
let result = height > width ? "height" : "width";

console.log("The biggest - " + result);

//3
console.log("Числа кратные 3м:");

for (let i = 1; i <= 21; i++) {
  if (i % 3 === 0) {
    console.log(i);
  }
}
//4

let key = true;
let documents = true;
let pen = true;
let apple = false;
let orange = true;

let ready =
  key && documents && pen && (apple || orange) ? "готовы" : "не готовы";

console.log(`Мы ${ready}`);

//5

let n = prompt("Введите число: ", 1);
let result5 = n % 3 === 0 ? "Fiz" : "";
result5 += n % 5 === 0 ? "Buz" : "";

console.log("Результат - " + result5);

//6
let age = prompt("Введите возвраст: ", 18);

if (age >= 18) {
  console.log("Не пей пиво - алькоголь разрушает и тело и душу!");
} else if (age < 16) {
  console.log("Попей колы, а лучше свежевыжетого сока)");
} else {
  console.log(
    "Не кури. Не обогащай алчных беспринципных толстосумов за счет твоего здоровья!"
  );
}

//7
let isValidInput = false;
let result7 
let direction = ""
while (result7 === undefined) {
  switch (direction) {
    case "юг":
      result7 = "на юг пойдешь счастье найдешь";
      break;
    case "север":
      result7 = "на север пойдешь много денег найдешь";
      break;
    case "запад":
      result7 = "на запад пойдешь верного друга найдешь";
      break;
    case "восток":
      result7 = "на восток пойдешь разработчиком станешь";
      break;
    default:
        direction = prompt("Введите направление: ");
  }
} 
console.log(result7);
