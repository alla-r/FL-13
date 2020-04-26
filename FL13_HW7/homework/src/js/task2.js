function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const input = confirm('Do you want to play a game?');
let min = 0;
let max = 5;
let winningNumber = getRandom(min, max);
let attempts = 3;
let totalPrize = 0;
let maxPrize = 100;

// Start a game
if (!input) {
  alert('You did not become a billionaire, but can.');
} else {
  game(maxPrize);
}

// Game
function game (prize) {
  const maxPossiblePrize = prize;
  let usersNumber = void 0;
  while (attempts !== 0) {
    usersNumber = +prompt(`
      Choose a roulette pocket number from ${min} to ${max}
      Attempts left: ${attempts}
      Total prize: ${totalPrize}$
      Possible prize on current attempt: ${prize}$ `);
    
    if (usersNumber === winningNumber) {
      break;
    }

    prize = prize / 2;
    attempts--;
  }
  if (usersNumber === winningNumber) {
    totalPrize = totalPrize + prize;
    const wantContinue = confirm(`Congratulation, you won! Your prize is: ${prize}$. Do you want to continue?`);
    if (wantContinue) {
      max = max + 5;
      attempts = 3;
      winningNumber = getRandom(min, max);
      game(maxPossiblePrize * 2);
    } else {
      loseGame();
    }
  } else {
    loseGame();
  }
}

// lose game
function loseGame() {
  alert(`Thank you for your participation. Your prize is: ${totalPrize}$`);
  const playAgain = confirm('Do you want to play again?');
  if (playAgain) {
    max = 5;
    attempts = 3;
    maxPrize = 100;
    winningNumber = getRandom(min, max);
    game(maxPrize);
  } 
}


