const readline = require("readline-sync");
const VALID_CHOICES = ["rock", "paper", "scissors", "lizard", "spock"];
const VALID_CHOICES_ABBR = ["ro", "pa", "sc", "li", "sp"];
let gamesPlayed = 1;
let winningNumber = 3;
let userWins = 0;
let computerWins = 0;

function prompt(msg) {
  console.log(`~=> ${msg}`);
}

function playerWins(choiceShort, computerChoice) {
  return (
    (choiceShort === "ro" && computerChoice === "sc") ||
    (choiceShort === "ro" && computerChoice === "li") ||
    (choiceShort === "pa" && computerChoice === "ro") ||
    (choiceShort === "pa" && computerChoice === "sp") ||
    (choiceShort === "sc" && computerChoice === "pa") ||
    (choiceShort === "sc" && computerChoice === "li") ||
    (choiceShort === "sp" && computerChoice === "sc") ||
    (choiceShort === "sp" && computerChoice === "ro") ||
    (choiceShort === "li" && computerChoice === "pa") ||
    (choiceShort === "li" && computerChoice === "sp")
  );
}

function displayWinner(choiceShort, computerChoice) {
  if (playerWins(choiceShort, computerChoice)) {
    prompt("You win this round!");
  } else if (choiceShort === computerChoice) {
    prompt("It's a tie for this round.");
  } else {
    prompt("Computer wins this round...");
  }
}

function scores(choiceShort, computerChoice) {
  if (playerWins(choiceShort, computerChoice)) {
    userWins++;
  } else if (playerWins(computerChoice, choiceShort)) {
    computerWins++;
  }
  prompt(
    `The current score is User: ${userWins} and Computer: ${computerWins}.`
  );
}

function ultimateWinner(userWins, computerWins) {
  if (
    userWins === winningNumber ||
    (gamesPlayed === 5 && userWins > computerWins)
  ) {
    prompt("The User is the ultimate winner!");
  } else if (
    computerWins === winningNumber ||
    (gamesPlayed === 5 && computerWins > userWins)
  ) {
    prompt("The computer is the ultimate winner...");
  } else if (gamesPlayed < 5) {
    prompt("Keep playing until there is an ultimate winner~");
  } else {
    prompt("No one won :(.");
  }
}

while (
  gamesPlayed <= 5 &&
  userWins !== winningNumber &&
  computerWins !== winningNumber
) {
  prompt(
    `Let's play the best of 5! This is Round ${gamesPlayed}.\nChoose one: ${VALID_CHOICES.join(
      ", "
    )} or ${VALID_CHOICES_ABBR.join(", ")} for short.`
  );
  let choice = readline.question();

  while (!VALID_CHOICES_ABBR.includes(choice.substring(0, 2))) {
    prompt("That's not a valid choice.");
    choice = readline.question();
  }

  let choiceShort = choice.substring(0, 2);
  let randomIndex = Math.floor(Math.random() * VALID_CHOICES_ABBR.length);
  let computerChoice = VALID_CHOICES_ABBR[randomIndex];

  prompt(`You chose ${choice}, computer chose ${computerChoice}`);

  displayWinner(choiceShort, computerChoice);

  scores(choiceShort, computerChoice);

  ultimateWinner(userWins, computerWins);

  gamesPlayed++;
}
