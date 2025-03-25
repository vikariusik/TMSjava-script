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
  
  const originalString = "This is a test string with some words.";
  
  const trimmedString1 = trimString(originalString, 5, 10);
  console.log(`Result of trimming - '${trimmedString1}'`);