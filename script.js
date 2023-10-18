function checkInputWithString(input) {
  const inputString = input;
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
    resultText.innerText = 'CADENA VALIDA';
    resultContainer.classList.add('valid');
  } else {
    // Mostrar transiciones hasta la posición y descripción
    const validSubstring = inputString.substring(0, position);
    resultText.innerText = `CADENA NO VÁLIDA\nHasta: ${validSubstring}`;
    resultContainer.classList.add('invalid');
    displayDescriptions(description, descriptionsTable);
  }
}


function clearTable(table) {
  const rowCount = table.rows.length;
  for (let i = rowCount - 1; i > 0; i--) {
    table.deleteRow(i);
  }
}

function checkInput() {
  const inputString = document.getElementById('inputString').value;
  checkInputWithString(inputString);
}

function findInvalidTransition(inputString) {
  const n = inputString.length;
  const description = [];
  let stack = [];
  let mCount = 0;
  let nCount = 0;
  let zFound = false;

  for (let i = 0; i < n; i++) {
    const symbol = inputString[i];
    let nextState = '';
    let action = '';

    if (symbol === 'x') {
      if (mCount < 1 || mCount === nCount) {
        mCount++;
        nCount++;
        nextState = 'q0';
        action = `Push ${symbol}`;
      } else {
        return { position: i, description };
      }
    } else if (symbol === 'y') {
      if (mCount > 0 && mCount === nCount) {
        mCount--;
        nCount--;
        nextState = 'q0';
        action = `Pop ${symbol}`;
      } else {
        return { position: i, description };
      }
    } else if (symbol === 'z') {
      if (mCount === 0 && nCount === 0 && !zFound) {
        zFound = true;
      } else {
        return { position: i, description };
      }
    } else {
      return { position: i, description };
    }

    description.push({ step: i, state: 'q0', stack: stack.join(''), input: inputString.substring(i), transition: `(${symbol}) -> ${nextState}`, action });
  }

  if (zFound && mCount === 0 && nCount === 0) {
    return { position: n, description };
  } else {
    return { position: n - 1, description };
  }
}




function generateTransitions(inputString) {
  const transitions = [];
  const n = inputString.length;

  let currentState = 'q0';
  for (let i = 0; i < n; i++) {
    const symbol = inputString[i];
    const nextState = `q${i + 1}`;
    transitions.push({ currentState, symbol, nextState });
    currentState = nextState;
  }

  transitions.push({ currentState: `q${n}`, symbol: '$', nextState: `q${n}` });

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
  let mCount = 0;
  let nCount = 0;

  for (let i = 0; i <= n; i++) {
    const state = `q${i}`;
    const remainingInput = inputString.substring(i);
    let action = '';

    if (i < n) {
      const symbol = inputString[i];
      if (symbol === 'x') {
        stack.push(symbol);
        mCount++;
        nCount++;
        action = `Push ${symbol}`;
      } else if (symbol === 'y') {
        if (mCount > 0 && nCount > 0) {
          stack.pop();
          mCount--;
          nCount--;
          action = `Pop ${symbol}`;
        } else {
          return { descriptions: [], valid: false };
        }
      } else if (symbol === 'z') {
        if (mCount === 0 && nCount === 0 && i === n - 1) {
          action = `Read ${symbol}`;
        } else {
          return { descriptions: [], valid: false };
        }
      } else {
        return { descriptions: [], valid: false };
      }
    }

    const description = {
      step: i,
      state,
      stack: stack.join(''),
      input: remainingInput,
      transition: (i < n) ? `(${inputString[i]}) -> q${i + 1}` : '',
      action
    };

    descriptions.push(description);
  }

  return { descriptions, valid: true };
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


function generateString() {
  const m = parseInt(document.getElementById('mInput').value);
  const n = parseInt(document.getElementById('nInput').value);
  const z = parseInt(document.getElementById('zInput').value);

  let generatedString = '';
  // Generar (x^2n)(y^m)((xxx)^m)(y^n) z+
  // Generar (x^2n)
  for (let i = 0; i < 2 * n; i++) {
    generatedString += 'x';
  }
    // Generar (y^m)
    for (let i = 0; i < m; i++) {
      generatedString += 'y';
    }
      // Generar (x^3m)
  for (let i = 0; i < 3 * m; i++) {
    generatedString += 'x';
  }
  // Generar (y^n)
  for (let i = 0; i < n; i++) {
    generatedString += 'y';
  }
  // Generar z+
  for (let i = 0; i < z; i++) {
    generatedString += 'z';
  }
  // Insertar la cadena generada en el cuadro de texto
  document.getElementById('inputString').value = generatedString;
}

