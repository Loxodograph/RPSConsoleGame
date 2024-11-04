const READLINE = require('readline-sync');

const VALID_CHOICES = ['rock', 'scissors', 'paper', 'lizard', 'Spock'];
const SHORTENED_VALID_CHOICES = ['r', 's', 'p', 'l', 'S'];

const CHOICES = {
  r: ["scissors", "lizard"],
  s: ["paper", "lizard"],
  p: ["rock", "Spock"],
  l: ["Spock", "paper"],
  S: ["rock", "scissors"],
}

let choice;
let gameCount = 1;
let playerScore = 0;
let computerScore = 0;




prompt("===================");
prompt("Welcome to rock, paper, scissors, lizard, Spock");
prompt("===================");

//basic game loop
while (true) {
  roundLoop();

  prompt('Do you want to play again (y/n)?');
  let answer = READLINE.question().toLowerCase();

  while (answer[0] !== 'n' && answer[0] !== 'y') {
    prompt('Please enter "y" or "n".');
    answer = READLINE.question().toLowerCase();
  }

  if (answer[0] === 'y') {
    gameCount = 1;
    playerScore = 0;
    computerScore = 0;
  } else if (answer[0] === "n") {
    prompt("Goodbye and Thanks for Playing");
    break;
  };
}

function roundLoop() {
  while (gameCount <= 5) {
    gameRound();
  }
  if (playerScore > computerScore) {
  prompt(`Player Score: ${playerScore} Computer Score: ${computerScore}`);
  prompt(`You Win!`);
  } else if (computerScore > playerScore) {
  prompt(`Player Score: ${playerScore} Computer Score: ${computerScore}`);
  prompt(`You Lose!`);
  } else if (computerScore === playerScore) {
  prompt(`Player Score: ${playerScore} Computer Score: ${computerScore}`);
  prompt(`Draw!`);
  }
};

function gameRound() {
  let computerChoice = VALID_CHOICES[generateRandomNumber()];
  prompt("---------");
  prompt(`Round ${gameCount}`);
  userChoicePrompt();
  isValidChoice(choice);
  validateInput(choice);
  roundPlay(choice, computerChoice);
}

function validateInput(chosenOption) {
  if (chosenOption.length === 1) {
    prompt(`You chose ${VALID_CHOICES[SHORTENED_VALID_CHOICES.indexOf(chosenOption.slice(0,1))]}`);
    choice = VALID_CHOICES[SHORTENED_VALID_CHOICES.indexOf(chosenOption.slice(0,1))]
  } else {
    prompt(`You chose ${chosenOption}`)
  }
}

function isValidChoice(chosenOption) {
  while ((!VALID_CHOICES.includes(chosenOption)) && (!SHORTENED_VALID_CHOICES.includes(chosenOption.slice(0, 1)))) {
    console.log("Try Again");
    prompt('Choose one: (r)ock, (p)aper, (s)cissors, (l)izard, (S)pock');
    chosenOption = READLINE.question();
  }
  choice = chosenOption;
  return;
};

function userChoicePrompt() {
  prompt("");
  prompt("");
  prompt('Choose one: (r)ock, (p)aper, (s)cissors, (l)izard, (S)pock');
  choice = READLINE.question();
  prompt("");
  return choice;
}

function roundPlay(chosenOption, chosenComputerOption) {
  if (chosenOption === chosenComputerOption) {
    prompt(`Computer chose ${chosenComputerOption}`)
    prompt('Draw');
  } else if (CHOICES[chosenOption.slice(0,1)].includes(chosenComputerOption)) {
    playerScore += 1;
    prompt(`Computer chose ${chosenComputerOption}`);
    prompt('You Win!');
  } else if (!CHOICES[chosenOption.slice(0,1)].includes(chosenComputerOption)) {
    computerScore += 1;
    prompt(`Computer chose ${chosenComputerOption}`);
    prompt('You Lose!');
  }
  gameCount += 1;
  prompt(`Your Score ${playerScore}`);
  prompt(`Computer Score ${computerScore}`);
}

function generateRandomNumber() {
  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  return randomIndex;
}


function prompt(message) {
  console.log(`=> ${message}`);
}