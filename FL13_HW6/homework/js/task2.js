// Your code goes here
const input = prompt('Enter a word:');

if (input === null) {
  alert(`You didn't enter a word`);
} else if ( input.trim() ) {
  const inputLength = input.length;
  if (inputLength % 2 === 0) {
    alert(`Middle characters are "${input[inputLength/2-1]}${input[inputLength/2]}"`);
  } else if (inputLength === 1) {
    alert(`Middle character is "${input}"`);
  } else {
    alert(`Middle character is "${input[(inputLength-1)/2]}"`);
  }
} else {
  alert('Invalid value');
}