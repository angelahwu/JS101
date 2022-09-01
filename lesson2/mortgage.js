const readline = require("readline-sync");

function prompt(message) {
  console.log(`***~${message}~***`);
}

function invalidNumber(num) {
  return num.trimStart() === "" || Number.isNaN(Number(num)) || Number(num) < 0;
}

prompt("Welcome to the Mortage Calculator!");

while (true) {
  prompt("What is the your loan amount?");
  let loanAmount = readline.question();
  while (invalidNumber(loanAmount)) {
    prompt("Please enter a positive number.");
    loanAmount = readline.question();
  }

  prompt("What is the annual percentage rate in decimal form?");
  let annualPR = readline.question();
  while (invalidNumber(annualPR)) {
    prompt("Please enter a positive number");
  }

  prompt("How long is your loan duration in years?");
  let durationInYears = readline.question();
  while (invalidNumber(durationInYears)) {
    prompt("Please enter a positive number");
    durationInYears = readline.question();
  }

  let monthlyInterest = annualPR / 12;
  let durationInMonths = durationInYears * 12;

  let monthlyPayment =
    loanAmount *
    (monthlyInterest / (1 - Math.pow(1 + monthlyInterest, -durationInMonths)));

  prompt(
    `Your monthly payment with interest is ${monthlyPayment.toFixed(
      2
    )} dollars.`
  );

  prompt("Would you like to do another calculation?");
  let answer = readline.question().toLowerCase();
  while (answer[0] !== "n" && answer[0] !== "y") {
    prompt("Please enter y or n.");
    answer = readline.question().toLowerCase();
  }
  if (answer[0] === "n") break;
}
