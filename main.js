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
    currentValue.length === 12 ||
    currentValue === 'Error'
  ) {
    return;
  }

  currentValue += '.';
  currentScreen.textContent = currentValue;
});

equalBtn.addEventListener('click', () => {
  calculate();

  if (currentValue === 'Error') {
    currentScreen.classList.add('error');
  }

  previousScreen.textContent = '';
  currentScreen.textContent = currentValue;
});

deleteBtn.addEventListener('click', () => {
  deleteValue();

  currentScreen.textContent = currentValue;
  console.log(currentValue);
});

clearBtn.addEventListener('click', () => {
  resetCalculator();
});

// Handles interactions with Numbers

function handleNumber(num) {
  // Prevents user from entering a number
  if (currentValue === 'Error' || currentValue.length >= 12) {
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
  // Handles negative starting numbers and prevents bugs with '-' operator
  if (currentValue === '' && op === '-') {
    if (previousValue) {
      return;
    } else {
      currentValue = '-';
      return;
    }
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
}

// Handles deleting the current number

function deleteValue() {
  if (currentValue === '' || currentValue === 'Error') {
    return;
  }

  currentValue = currentValue.slice(0, -1);
}

// Resets the calculator

function resetCalculator() {
  currentValue = '';
  previousValue = '';
  operator = '';

  previousScreen.textContent = currentValue;
  currentScreen.textContent = currentValue;

  currentScreen.classList.remove('error');
}

// Functions to handle calculations

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

// Rounds a number to 3 decimals

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

  if (currentValue === 'Error') {
    return;
  }

  currentValue = Number(currentValue);
  previousValue = Number(previousValue);

  switch (operator) {
    case '+':
      currentValue = add(previousValue, currentValue);
      break;
    case '-':
      currentValue = subtract(previousValue, currentValue);
      break;
    case 'x':
      currentValue = previousValue * currentValue;
      break;
    case '÷':
      if (currentValue === 0) {
        currentValue = 'Error';
        return;
      } else {
        currentValue = divide(previousValue, currentValue);
      }
      break;
    default:
      break;
  }

  currentValue = roundNumber(currentValue).toString();

  if (currentValue.length > 12) {
    resetCalculator();
    currentValue = 'Error';
    return;
  }

  previousValue = '';
  operator = '';

  console.log(currentValue);
}
