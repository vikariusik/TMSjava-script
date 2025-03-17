let x = 20
let y = 58
let z = 42

console.log(x + y + z)

//2

let secondsInMinute = 60
let minutesInHour = secondsInMinute
let hoursInDay = 24
let daysInYear = 365
let daysInMonth = 30.5

myAgeInSeconds = (42 * daysInYear + 9 * daysInMonth + 11 ) * hoursInDay * minutesInHour * secondsInMinute

console.log('My age in seconds - ' + myAgeInSeconds)

//3

let count = 42
let userName = '42'

let stringCount = String(count)
let numberUserName = Number(userName)

console.log(stringCount + ' - ' + numberUserName)

stringCount =  count.toString()
numberUserName = +numberUserName

console.log(stringCount + ' - ' + numberUserName)

//4

let a = 1
let b = 2
let c = 'белых медведей'

console.log(a.toString() + b + ' ' + c)

//5

let s1 = 'доступ'
let s2 = 'морпех'
let s3 = 'наледь'
let s4 = 'попрек'
let s5 = 'рубило'

let totalLength = s1.length + s2.length + s3.length + s4.length + s5.length

console.log('Кол-во всех символов - ' + totalLength)

//6
let s6 = 'доступ'
let b6 = true
let n6 = 6
console.log(`Variable: ${s6} have type: ${typeof(s6)}`)
console.log(`Variable: ${b6} have type: ${typeof(b6)}`)
console.log(`Variable: ${n6} have type: ${typeof(n6)}`)

//7
let name = prompt('Введите имя: ')
let age = prompt('Введите возвраст: ', 18)

console.log(`Привет, ${name}, c возврастом - ${age}`)