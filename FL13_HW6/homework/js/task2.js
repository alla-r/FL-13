// Your code goes here
const input = prompt('Enter a word:');

function isNotEmpty (word) {
  return Boolean(word.trim());
}

if ( isNotEmpty(input) ) {
  const inputLength = input.length;
  if (inputLength % 2 === 0) {
    alert(`${input[inputLength/2-1]}${input[inputLength/2]}`);
  } else if (inputLength === 1) {
    alert(input);
  } else {
    alert(input[(inputLength-1)/2]);
  }
} else {
  alert('Invalid value');
}