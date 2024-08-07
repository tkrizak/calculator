// Store all HTML components

const clearBtn = document.querySelector('#clear-btn');
const equalBtn = document.querySelector('.equal');
const decimalBtn = document.querySelector('.decimal');
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const previousScreen = document.querySelector('.previous');
const currentScreen = document.querySelector('.current');
const deleteBtn = document.querySelector('.delete-btn');

// Store calculation

let operator = '';
let previousValue = '';
let currentValue = '';
let result = '';

// Interactions with buttons

numberBtns.forEach((number) => {
  number.addEventListener('click', (event) => {
    handleNumber(event.target.textContent);
    currentScreen.textContent = currentValue;
  });
});

operatorBtns.forEach((operatorBtn) => {
  operatorBtn.addEventListener('click', (event) => {
    handleOperator(event.target.textContent);
    previousScreen.textContent = `${previousValue} ${operator}`;
    currentScreen.textContent = currentValue;
  });
});

decimalBtn.addEventListener('click', () => {
  // Prevents adding a decimal on those instances
  if (
    currentValue === '' ||
    currentValue.includes('.') ||
    currentValue.length === 10 ||
    currentValue === 'Error'
  ) {
    return;
  }

  currentValue += '.';
  currentScreen.textContent = currentValue;
});

equalBtn.addEventListener('click', () => {
  if (currentValue === 'Error') {
    return;
  }

  calculate();

  if (currentValue.length >= 10) {
    currentValue = 'Error';
  }

  previousScreen.textContent = '';
  currentScreen.textContent = currentValue;
});

clearBtn.addEventListener('click', () => {
  resetCalculator();
});

// Handles interactions with Numbers

function handleNumber(num) {
  // Prevents user from entering a number
  if (currentValue === 'Error' || currentValue.length >= 10) {
    return;
  }

  // If currentValue is 0 let user enter a new number
  if (currentValue === '0') {
    currentValue = '';
  }

  currentValue += num;

  console.log(currentValue);
}

// Handles interactions with Operators

function handleOperator(op) {
  // Allows negative starting numbers
  if (currentValue === '' && op === '-') {
    currentValue = '-';
    return;
  } else if (currentValue === '-' && op === '-') {
    return;
  } else if (currentValue === '' && op !== '-') {
    return;
  }

  // Prevents entering an Operator if there is Error displaying
  if (currentValue === 'Error') {
    return;
  }

  // Automatic calculation after each increment step
  if (previousValue !== '') {
    calculate();
  }

  operator = op;
  previousValue = currentValue;
  currentValue = '';

  console.log(previousValue);
}

// Resets the calculator

function resetCalculator() {
  currentValue = '';
  previousValue = '';
  operator = '';
  result = '';
  previousScreen.textContent = currentValue;
  currentScreen.textContent = currentValue;
}

// Rounds number to 3 decimals

function roundNumber(num) {
  return Math.round(num * 1000) / 1000;
}

// Handles calculation based on given values and operators

function calculate() {
  // Unable to calculate if empty operator/values
  if (operator === '' || currentValue === '' || previousValue === '') {
    resetCalculator();
    currentValue = 'Error';
    return;
  }

  currentValue = Number(currentValue);
  previousValue = Number(previousValue);

  switch (operator) {
    case '+':
      result = previousValue + currentValue;
      break;
    case '-':
      result = previousValue - currentValue;
      break;
    case 'x':
      result = previousValue * currentValue;
      break;
    case '/':
      if (currentValue === 0) {
        result = 'Error';
      } else {
        result = previousValue / currentValue;
      }
      break;
    default:
      break;
  }

  currentValue = roundNumber(result).toString();
  previousValue = '';
  operator = '';

  console.log(result);
  console.log(currentValue);
}
