let currentStep = 0;

function checkInput() {
  const inputString = document.getElementById('inputString').value;
  const transitionsTable = document.getElementById('transitionsTable');
  const descriptionsTable = document.getElementById('descriptionsTable');
  const resultContainer = document.getElementById('resultContainer');
  const resultText = document.getElementById('resultText');

  // Limpiar las tablas y el resultado
  clearTable(transitionsTable);
  clearTable(descriptionsTable);
  resultText.innerText = '';

  const { position, description } = findInvalidTransition(inputString);

  if (position === inputString.length) {
    // La cadena es válida
    const transitions = generateTransitions(inputString);
    displayTransitions(transitions, transitionsTable);
    displayDescriptions(description, descriptionsTable);
    resultText.innerText = 'CADENA VÁLIDA';
    resultContainer.classList.add('valid');
  } else {
    // Mostrar transiciones hasta la posición y descripción
    const validSubstring = inputString.substring(0, position);
    resultText.innerText = `CADENA NO VÁLIDA\nHasta: ${validSubstring}`;
    resultContainer.classList.add('invalid');
    displayDescriptions(description, descriptionsTable);
  }
}
console.log(inputString.substring(0, position));

function findInvalidTransition(inputString) {
  const n = inputString.length;
  let stack = [];
  let currentState = 'q0';
  let description = [];
  
  for (let i = 0; i < n; i++) {
    const symbol = inputString[i];
    let nextState = '';
    let action = '';

    if (symbol === 'a') {
      stack.push(symbol);
      nextState = `q${i + 1}`;
      action = `Push ${symbol}`;
    } else if (symbol === 'b') {
      if (stack.length > 0) {
        stack.pop();
        nextState = `q${i + 1}`;
        action = 'Pop';
      } else {
        return { position: i, description };
      }
    } else {
      // El símbolo no es 'a' ni 'b', la cadena no es válida
      return { position: i, description };
    }

    description.push({ step: i, state: currentState, stack: stack.join(''), input: inputString.substring(i), transition: `(${symbol}) -> ${nextState}`, action });
    currentState = nextState;
  }

  return { position: n, description };
}

function isMatching(inputString) {
  const stack = [];
  const n = inputString.length;

  for (let i = 0; i < n; i++) {
    const symbol = inputString[i];

    if (symbol === 'a') {
      stack.push(symbol);
    } else if (symbol === 'b') {
      if (stack.length > 0) {
        stack.pop();
      } else {
        return false;
      }
    } else {
      // El símbolo no es 'a' ni 'b', la cadena no es válida
      return false;
    }
  }

  // Verifica si la pila está vacía al final
  return stack.length === 0;
}

// Resto de las funciones y código existente, incluyendo clearTable, generateTransitions, y generateDescriptions

function clearTable(table) {
  const rowCount = table.rows.length;
  for (let i = rowCount - 1; i > 0; i--) {
    table.deleteRow(i);
  }
}

function generateTransitions(inputString) {
  const transitions = [];
  const n = inputString.length;

  let currentState = 'q0';
  for (let i = 0; i < n; i++) {
    const symbol = inputString[i];

    if (symbol == 'a'){
      nextState = currentState;
    }else if(symbol == 'b'){
      nextState = `q${'1'}`;
    }

    transitions.push({currentState, symbol, nextState, action: `Push ${symbol}`});
    currentState = nextState;
  }

  transitions.push({ currentState, symbol: '$', currentState, action: `Pop` });

  return transitions;
}

function displayTransitions(transitions, table) {
  for (const transition of transitions) {
    const row = table.insertRow(-1);
    const currentStateCell = row.insertCell(0);
    const symbolCell = row.insertCell(1);
    const nextStateCell = row.insertCell(2);

    currentStateCell.innerText = transition.currentState;
    symbolCell.innerText = transition.symbol;
    nextStateCell.innerText = transition.nextState;
  }
}

function generateDescriptions(inputString) {
  const descriptions = [];
  const n = inputString.length;
  let stack = [];

  for (let i = 0; i <= n; i++) {
    const state = `q${i}`;
    const remainingInput = inputString.substring(i);
    const description = {
      step: i,
      state,
      stack: stack.join(''),
      input: remainingInput,
      transition: (i < n) ? `(${inputString[i]}) -> q${i + 1}` : ''
    };

    descriptions.push(description);

    if (i < n) {
      stack.push(inputString[i]);
    }
  }

  return descriptions;
}

function displayDescriptions(descriptions, table) {
  for (const description of descriptions) {
    const row = table.insertRow(-1);
    const stepCell = row.insertCell(0);
    const stateCell = row.insertCell(1);
    const stackCell = row.insertCell(2);
    const inputCell = row.insertCell(3);
    const transitionCell = row.insertCell(4);

    stepCell.innerText = description.step;
    stateCell.innerText = description.state;
    stackCell.innerText = description.stack;
    inputCell.innerText = description.input;
    transitionCell.innerText = description.transition;
  }
}

function isMatching(inputString) {
  const stack = [];
  const n = inputString.length;

  for (let i = 0; i < n; i++) {
    const symbol = inputString[i];

    if (symbol === 'a') {
      stack.push(symbol);
    } else if (symbol === 'b') {
      if (stack.length > 0) {
        stack.pop();
      } else {
        return false;
      }
    } else {
      // El símbolo no es 'a' ni 'b', la cadena no es válida
      return false;
    }
  }

  // Verifica si la pila está vacía al final
  return stack.length === 0;
}