function getSum(number) 
{
    if (typeof(number) !== 'number') {
        return 'Error! Argument of getSum must be number';
      }

    var result = 0;

    for (let i = 1; i <= number; i++) 
    {
        result += i;
    }
    return result;
}

let result = getSum(100)

console.log('Result = ' + result)

//2

function getCreditOverpayment(creditSum) {
    if (typeof(creditSum) !== 'number') {
        return 'Error! Argument of getCreditOverpayment must be number';
      }

    const percent = 0.17; 
    const period = 5;

    const monthlyPercent = percent / 12;

    const periodInMonths = period * 12;

    const monthlyPayment =
      (creditSum * monthlyPercent) /
      (1 - Math.pow(1 + monthlyPercent, -periodInMonths));
  
    const totalPayment = monthlyPayment * periodInMonths;

    const overpayment = totalPayment - creditSum;
  
    return overpayment;
  }
  let sum = 'a'

  console.log(`Overpayment for sum credit = ${sum} is ${getCreditOverpayment(sum)}`)

//3

function trimString(str, fromPosition, toPosition) {
    if (typeof str !== 'string') {
      console.error("Error! First argument must be string.")
    }
  
    let startIndex = 0;
    let endIndex = str.length;
  
    if (typeof(fromPosition) === 'number' && fromPosition >= 0 && fromPosition <= str.length) {
      startIndex = fromPosition;
    } else if (typeof fromPosition !== 'undefined' && fromPosition !== null) {
        console.warn("Invalid fromPosition. Using default value (0).");
    }
  
    if (typeof(toPosition) === 'number' && toPosition >= 0 && toPosition <= str.length) {
      endIndex = toPosition;
    } else if (typeof(toPosition) !== 'undefined' && toPosition !== null) {
        console.warn("Invalid toPosition. Using default value (string.length).");
    }
  
    return str.substring(startIndex, endIndex);
  }
  
  const originalString = "Hello world!!!";
  
  const trimmedString1 = trimString(originalString, 5, 10);
  console.log(`Result of trimming - '${trimmedString1}'`);

  //4
  function getSumNumbers(number) 
  {

    if (typeof(number) !== 'number') {
        return 'Error! Argument of getSumNumbers must be number';
      }

    const numberString = number.toString();

    let sum = 0;

    for (let i = 0; i < numberString.length; i++) {
        sum += parseInt(numberString[i]); 
    }
  
    return sum;
  }
  
  console.log(getSumNumbers(2021));

  //5
  function getSum(a, b) {
    if (a === b) {
      return a;
    }
  
    let sum = 0;
    let start = Math.min(a, b);
    let end = Math.max(a, b);
    for (let i = start; i <= end; i++) {
      sum += i;
    }
  
    return sum;
  }
  
  console.log(getSum(1, 0));  
  console.log(getSum(1, -5));  

  //6
  function fooBoo(boolValue, fooFunc, booFunc) {
    if (typeof boolValue !== 'boolean') {
      console.error("Error: boolValue must be a boolean.");
      return;
    }
    if (typeof fooFunc !== 'function') {
      console.error("Error: fooFunc must be a function.");
      return;
    }
    if (typeof booFunc !== 'function') {
      console.error("Error: booFunc must be a function.");
      return;
    }
  
    if (boolValue) {
      fooFunc();
    } else {
      booFunc();
    }
  }
  
  function foo() {
    console.log("foo");
  }
  
  function boo() {
    console.log("boo");
  }
  
  fooBoo(false, foo, boo); 