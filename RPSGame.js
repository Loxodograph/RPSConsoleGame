const READLINE = require('readline-sync');

const VALID_CHOICES = ['rock', 'scissors', 'paper', 'lizard', 'Spock'];
const SHORTENED_VALID_CHOICES = ['r', 's', 'p', 'l', 'S'];
const MAX_ROUNDS = 5;

const WINNING_COMBOS = {
  r: ["scissors", "lizard"],
  s: ["paper", "lizard"],
  p: ["rock", "Spock"],
  l: ["Spock", "paper"],
  S: ["rock", "scissors"],
}

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

  if (answer === 'y' || answer.toLowerCase() === "yes" || answer.toLowerCase() === "yass") {
    console.clear();
    gameCount = 1;
    playerScore = 0;
    computerScore = 0;
  } else if (answer !== "y" && answer.toLowerCase() !== "yes" || answer.toLowerCase() !== "yass") {
    console.clear();
    prompt("Goodbye and Thanks for Playing");
    break;
  };
}

function roundLoop() {
  while (gameCount <= MAX_ROUNDS) {
    gameRound();
    gameCount += 1;
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
  let choice = userChoicePrompt();
  isValidChoice(choice);
  let validatedChoice = validateInput(choice);
  roundPlay(validatedChoice, computerChoice);
}

function validateInput(chosenOption) {
  if (chosenOption.length === 1) {
    prompt(`You chose ${VALID_CHOICES[SHORTENED_VALID_CHOICES.indexOf(chosenOption.slice(0, 1))]}`);
    chosenOption = VALID_CHOICES[SHORTENED_VALID_CHOICES.indexOf(chosenOption.slice(0, 1))]
  } else {
    prompt(`You chose ${chosenOption}`)
  }
  return chosenOption;
}

function isValidChoice(chosenOption) {
  if (chosenOption === "spock") {
    chosenOption = "Spock"
  };
  while ((!VALID_CHOICES.includes(chosenOption)) && (!SHORTENED_VALID_CHOICES.includes(chosenOption.slice(0, 1)))) {
    console.log("Try Again");
    prompt('Choose one: (r)ock, (p)aper, (s)cissors, (l)izard, (S)pock');
    chosenOption = READLINE.question();
  }
  return chosenOption;
};

function userChoicePrompt() {
  prompt("");
  prompt("");
  prompt('Choose one: (r)ock, (p)aper, (s)cissors, (l)izard, (S)pock');
  let choice = READLINE.question();
  prompt("");
  return choice;
}

function roundPlay(chosenOption, chosenComputerOption) {
  if (chosenOption === chosenComputerOption) {
    prompt(`Computer chose ${chosenComputerOption}`)
    prompt('Draw');
  } else if (WINNING_COMBOS[chosenOption.slice(0, 1)].includes(chosenComputerOption)) {
    playerScore += 1;
    prompt(`Computer chose ${chosenComputerOption}`);
    prompt('You Win!');
  } else {
    computerScore += 1;
    prompt(`Computer chose ${chosenComputerOption}`);
    prompt('You Lose!');
  }
  
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