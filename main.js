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

clearBtn.addEventListener('click', () => {
  currentValue = '';
  previousValue = '';
  operator = '';
  previousScreen.textContent = currentValue;
  currentScreen.textContent = currentValue;
});

equalBtn.addEventListener('click', () => {
  calculate();
  previousScreen.textContent = '';
  currentScreen.textContent = currentValue;
});

function handleNumber(num) {
  if (currentValue.length <= 8) {
    currentValue += num;
    console.log(currentValue);
  }
}

function handleOperator(op) {
  operator = op;
  previousValue = currentValue;
  currentValue = '';
}

function calculate() {
  if (operator === '' || currentValue === '') {
    return;
  }

  currentValue = Number(currentValue);
  previousValue = Number(previousValue);

  switch (operator) {
    case '+':
      currentValue = previousValue + currentValue;
      break;
    case '-':
      currentValue = previousValue - currentValue;
      break;
    case 'x':
      currentValue = previousValue * currentValue;
      break;
    case '/':
      if (currentValue === 0) {
        currentValue = 'Error';
      } else {
        currentValue = previousValue / currentValue;
      }
      break;
    default:
      break;
  }

  previousValue = '';
  operator = '';
}
