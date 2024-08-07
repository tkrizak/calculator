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

equalBtn.addEventListener('click', () => {
  calculate();
  previousScreen.textContent = '';
  currentScreen.textContent = result;
});

clearBtn.addEventListener('click', () => {
  resetCalculator();
});

// Handles interactions with Numbers

function handleNumber(num) {
  // Handles instances if user wants to add another number if 0 is the currentValue
  if (currentValue === '0' || result === 0) {
    currentValue = '';
    result = '';
  }

  currentValue += num;
}

// Handles interactions with Operators

function handleOperator(op) {
  // Handles negative starting numbers
  if (currentValue === '' && op === '-') {
    currentValue = '-';
    return;
  }

  // Automatic calculation after each increment step
  if (previousValue !== '') {
    calculate();
  }

  operator = op;
  previousValue = currentValue;
  currentValue = '';
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

// Handles calculation based on given values and operators

function calculate() {
  // Unable to calculate if empty operator/values
  if (operator === '' || currentValue === '' || previousValue === '') {
    resetCalculator();
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

  currentValue = result;
  previousValue = '';
  operator = '';
}
