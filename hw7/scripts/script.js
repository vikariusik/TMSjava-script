const fibonacci = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987]

function print(n)
{
    console.log(n)
}

fibonacci.forEach(print)
fibonacci.forEach((n) => console.log(n))

//2
const users = ['Darya', 'Masha', 'Denis', 'Vitaliy', 'Polina', 'Anton'];

function transformUsers(usersArray) {
    return usersArray.map(function(user, index) {
      return `member ${index + 1}: ${user}`;
    });
  }
  
  const transformedUsers = transformUsers(users);
  console.log(transformedUsers);

const transformedUsers2 = users.map((user, index) => `member ${index + 1}: ${user}`);

console.log(transformedUsers2);

// 3
const numbers = [7, -4, 32, -90, 54, 32, -21];

const positiveNumbers = numbers.filter(function(number) {
    return number >= 0;
  });
console.log(positiveNumbers);

const positiveNumbers2 = numbers.filter(number => number >= 0);

console.log(positiveNumbers2);

// 4

console.log(fibonacci.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
  }, 0))

console.log(fibonacci.reduce((accumulator, currentValue) => accumulator + currentValue, 0))

// 5
const numbers5 = [5, 9, 13, 24, 54, 10, 13, 99, 1, 5];

print(numbers5.find(function(number) {
    return number % 2 === 0;
  }))

print(numbers5.find(number => number % 2 === 0))