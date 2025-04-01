const colors = ['red', 'green', 'blue']

console.log(colors.length)

//2
const animals = ['monkey', 'dog', 'cat']

console.log(animals[animals.length-1])

//3
const numbers = [5, 43, 63, 23, 90]
let numbers2 =  [...numbers];

numbers.length = 0

console.log(numbers)

numbers2.splice(0);

console.log(numbers2)

//4
const students = ['Polina', 'Dasha', 'Masha']

students.pop()
students.push('Borya')
students.shift()
students.unshift('Andrey')

console.log(students)

//5
const cats = ['Gachito', 'Tom', 'Batman']
for (let i = 0; i < cats.length; i++)
{
  console.log(`${i} : ${cats[i]}`)
}

for (let cat of cats) {
  console.log(cat)
}

//6
const evenNumbers = [2, 4, 6, 8, 10]
const oddNumbers = [1, 3, 5, 7, 9]

const allNumbers = oddNumbers.concat(evenNumbers)

const indexOf8 = allNumbers.indexOf(8)

console.log('Индекс числа 8 в итоговом массиве ', indexOf8 === -1 ? 'не найден' : indexOf8)

//7
const binary = [0, 0, 0, 0]
const transformedString = binary.map(() => "01").join('')

console.log(transformedString)