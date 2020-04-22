// Your code goes here
const numberForRounding = 2;
const checkNumber = parseFloat((+prompt('Enter a check number:')).toFixed(numberForRounding));
const tip = parseFloat((+prompt('Enter a tip percentage:')).toFixed(numberForRounding));
let tipAmount;
let totalSum;

function validTip (tip) {
  if ( tip > 0 && tip <= 100 ) {
    return true;
  } else { 
    return false; 
  } 
}

function isNumber (number) {
  return !isNaN(number);
}

if ( isNumber(tip) && isNumber(checkNumber) && validTip(tip) ) {
  tipAmount = parseFloat((tip * checkNumber / 100).toFixed(numberForRounding));
  totalSum = parseFloat((tipAmount + checkNumber).toFixed(numberForRounding));
  if (totalSum > 0) {
    alert(
      `
      Check number: ${checkNumber}
      Tip: ${tip}%
      Tip amount: ${tipAmount}
      Total sum to pay: ${totalSum}
      `
    );
  } else {
    alert('Invalid input data');
  }
} else {
  alert('Invalid input data');
}