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
let lastOperator = '';
let lastValue = '';

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
  handleDecimal();

  currentScreen.textContent = currentValue;
});

equalBtn.addEventListener('click', () => {
  calculate();

  previousScreen.textContent = '';
  currentScreen.textContent = currentValue;
});

deleteBtn.addEventListener('click', () => {
  deleteValue();

  currentScreen.textContent = currentValue;
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
}

// Handles interactions with Operators

function handleOperator(op) {
  // Prevents entering an Operator if there is an error

  if (currentValue === 'Error') {
    return;
  }

  // Prevents entering an Operator if number ends with a dot
  if (currentValue.endsWith('.')) {
    return;
  }

  // Handles negative starting numbers and prevents bugs with '-' operator
  if (!currentValue && op === '-') {
    if (previousValue) {
      return;
    } else {
      currentValue = '-';
      return;
    }
  } else if (currentValue === '-' && op !== '') {
    return;
  } else if (!currentValue && op !== '-') {
    return;
  }

  // Automatic calculation after each increment step
  if (previousValue) {
    calculate();

    if (currentValue === 'Error') {
      return;
    }
  }

  operator = op;
  previousValue = currentValue;
  currentValue = '';
}

// Handles decimal

function handleDecimal() {
  // Prevents adding a decimal on those instances

  if (
    !currentValue ||
    currentValue.includes('.') ||
    currentValue.length === 12 ||
    currentValue === 'Error'
  ) {
    return;
  } else {
    currentValue += '.';
  }
}

// Handles deletion of last character from currentValue

function deleteValue() {
  if (!currentValue || currentValue === 'Error') {
    return;
  }

  currentValue = currentValue.slice(0, -1);
}

// Resets the calculator

function resetCalculator() {
  currentValue = '';
  previousValue = '';
  operator = '';
  lastOperator = '';
  lastValue = '';

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

// Utility, rounds a number to 4 decimals

function roundNumber(num) {
  return Math.round(num * 10000) / 10000;
}

// Utility, displays error and resets calculator

function showError() {
  resetCalculator();
  currentValue = 'Error';
  currentScreen.classList.add('error');
}

// CALCULATION
// Handles calculation based on given values and operators

function calculate() {
  // If operator and previousValue are empty, calculate with lastOperator and lastValue from last calculation if available (for equals button click)

  if (!operator && !previousValue && lastOperator && lastValue) {
    operator = lastOperator;
    previousValue = currentValue;
    currentValue = lastValue;
  }

  // Unable to calculate if empty operator/values

  if (!operator || !currentValue || !previousValue) {
    showError();
    return;
  }

  // Unable to calculate if any currentValue ends with a dot

  if (currentValue.endsWith('.')) {
    showError();
    return;
  }

  // Stores operator and currentValue  for future use

  lastOperator = operator;
  lastValue = currentValue;

  // Converts values to numbers from strings

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
      currentValue = multiply(previousValue, currentValue);
      break;
    case '÷':
      if (currentValue === 0) {
        showError();
        return;
      } else {
        currentValue = divide(previousValue, currentValue);
      }
      break;
    default:
      break;
  }

  // Converts result to a string and rounds it to 5 decimals

  currentValue = roundNumber(currentValue).toString();

  // If result is longer than 12 characters show error

  if (currentValue.length > 12) {
    showError();
    return;
  }

  previousValue = '';
  operator = '';
}

// Handles keyboard support

function handleKeyEvents() {
  window.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9') {
      handleNumber(event.key);
      currentScreen.textContent = currentValue;
    } else if (
      event.key === '+' ||
      event.key === '-' ||
      event.key === '*' ||
      event.key === '/'
    ) {
      // Convert keyboard operators to correct operators used in code

      let operatorKey = event.key;

      if (operatorKey === '*') {
        operatorKey = 'x';
      }

      if (operatorKey === '/') {
        operatorKey = '÷';
      }

      handleOperator(operatorKey);
      previousScreen.textContent = `${previousValue} ${operator}`;
      currentScreen.textContent = currentValue;
    } else if (event.key === '.') {
      handleDecimal();
      currentScreen.textContent = currentValue;
    } else if (event.key === 'Backspace') {
      deleteValue();
      currentScreen.textContent = currentValue;
    } else if (event.key === 'Enter') {
      calculate();
      previousScreen.textContent = '';
      currentScreen.textContent = currentValue;
    } else if (event.key === 'Delete') {
      resetCalculator();
    }
  });
}

handleKeyEvents();
