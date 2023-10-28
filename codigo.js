// Función que valida la cima de la pila basada en las transiciones y acciones
function validarCimaDePila() {
  const stack = [];
  const conjuntoTransiciones = [
    {
      currentState: "q0",
      symbol: "x",
      stackTop: "Z",
      nextState: "q1",
      action: "10Z",
    },
    {
      currentState: "q1",
      symbol: "x",
      stackTop: "1",
      nextState: "q2",
      action: "1",
    },
    {
      currentState: "q2",
      symbol: "x",
      stackTop: "1",
      nextState: "q1",
      action: "1",
    },

    {
      currentState: "q2",
      symbol: "y",
      stackTop: "1",
      nextState: "q3",
      action: "000",
    },
    {
      currentState: "q3",
      symbol: "y",
      stackTop: "0",
      nextState: "q3",
      action: "000",
    },

    {
      currentState: "q3",
      symbol: "x",
      stackTop: "0",
      nextState: "q4",
      action: "Pop",
    },
    {
      currentState: "q4",
      symbol: "x",
      stackTop: "0",
      nextState: "q4",
      action: "Pop",
    },

    {
      currentState: "q4",
      symbol: "y",
      stackTop: "1",
      nextState: "q5",
      action: "Pop2",
    },
    {
      currentState: "q5",
      symbol: "y",
      stackTop: "1",
      nextState: "q5",
      action: "Pop2",
    },

    {
      currentState: "q5",
      symbol: "z",
      stackTop: "0",
      nextState: "q6",
      action: "Pop",
    },
    {
      currentState: "q6",
      symbol: "z",
      stackTop: "Z",
      nextState: "q6",
      action: "Stay",
    },
  ];

  let currentState = "q0";
  let descripcion = [];
  let descripcion2 = [];
  let prueba = [];
  let cadenaValida = true; // Variable para rastrear la validez de la cadena
  const resultadoParrafo = document.getElementById("resultadoParrafo");

  // cadena ingresada
  const inputString = document.getElementById("inputString").value;

  for (let i = 0; i < inputString.length; i++) {
    const symbol = inputString[i];
    const stackTop = stack.length > 0 ? stack[stack.length - 1] : "";

    let matchingTransition = null;
    for (const transition of conjuntoTransiciones) {
      if (
        transition.currentState === currentState &&
        transition.symbol === symbol &&
        (transition.stackTop === stackTop || transition.stackTop === "Z")
      ) {
        matchingTransition = transition;
        descripcion2.push({ primero: currentState, segundo: stackTop + "\n" });
        break;
      }
    }

    if (!matchingTransition) {
      // No se encontró una transición válida
      alert("Cadena no válida. No se encontró una transición válida.");
      cadenaValida = false; //marcar la cadena como no válida
      
      // Cambiar la imagen basada en el estado actual
        const automataImage = document.getElementById("automataImage");
        automataImage.src = `/img/${currentState}.png`;

        // Generar y mostrar las tablas HTML de descripciones instantáneas y transiciones
        generarTablaDescripcionInstantanea(descripcion);
        //generarTablaConjuntoTransiciones(conjuntoTransiciones);

        resultadoParrafo.textContent = "Resultado de la validación: Cadena no válida";
        resultadoParrafo.style.color = "red"; // Cambia el color a rojo
      
      return;
    }

    currentState = matchingTransition.nextState;
    if (matchingTransition.action === "1") {
      stack.push("1");
    } else if (matchingTransition.action === "000") {
      stack.push("0");
      stack.push("0");
      stack.push("0");
    } else if (matchingTransition.action === "Pop" && stack.length > 0) {
      stack.pop();
    } else if (matchingTransition.action === "10Z") {
      stack.push("0");
      stack.push("1");
    } else if (matchingTransition.action === "Pop2" && stack.length > 1) {
      stack.pop();
      stack.pop();
    }

    // Registramos la descripción instantánea

    descripcion.push({
      state: currentState,
      stack: stack.join(""),
      input: inputString.substring(i),
      action: matchingTransition.action + "\n",
    });
    prueba.push({
      primero: descripcion2.primero,
      segundo: descripcion2.segundo,
      tercero: stack.join("") + "\n",
    });
  }

  

  if (cadenaValida && currentState === "q6" && stack.length === 0) {
    // La cadena es válida
    alert("Cadena válida.");
    resultadoParrafo.textContent = "Resultado de la validación: Cadena válida";
    resultadoParrafo.style.color = "green"; // Cambia el color a verde

    
  } else if(!cadenaValida){
    // La cadena no alcanzó el estado final o la pila no está vacía
    alert(
      "Cadena no válida. No alcanzó el estado final o la pila no está vacía."
    );
    alert("Cadena no válida. No alcanzó el estado final o la pila no está vacía.");
    resultadoParrafo.textContent = "Resultado de la validación: Cadena no válida";
    resultadoParrafo.style.color = "red"; // Cambia el color a rojo
  }

  // Cambiar la imagen basada en el estado actual
  const automataImage = document.getElementById("automataImage");
  automataImage.src = `/img/${currentState}.png`;

  // Generar y mostrar las tablas HTML de descripciones instantáneas y transiciones
  generarTablaDescripcionInstantanea(descripcion);
  generarTablaConjuntoTransiciones(conjuntoTransiciones);

  ID_Tabla(conjuntoTransiciones, descripcion);
}

function generarTablaDescripcionInstantanea(descripcion) {
  const tabla = document.getElementById("descripcionInstantaneaTable");
  tabla.innerHTML = ""; // Limpia el contenido anterior de la tabla
  const encabezados = ["Estado", "Pila", "Entrada", "Acción"];

  // Crea la tabla y su fila de encabezado
  const tablaElement = document.createElement("table");
  const filaEncabezado = document.createElement("tr");

  for (const encabezado of encabezados) {
    const th = document.createElement("th");
    th.textContent = encabezado;
    filaEncabezado.appendChild(th);
  }
  tablaElement.appendChild(filaEncabezado);

  // Agrega las filas de datos
  for (const desc of descripcion) {
    const fila = document.createElement("tr");
    const estadoTd = document.createElement("td");
    estadoTd.textContent = desc.state;
    const pilaTd = document.createElement("td");
    const pilaDiv = document.createElement("div");
    pilaDiv.textContent = desc.stack;
    pilaTd.appendChild(pilaDiv);
    const entradaTd = document.createElement("td");
    entradaTd.textContent = desc.input;
    const accionTd = document.createElement("td");
    const accionDiv = document.createElement("div");
    accionDiv.textContent = desc.action;
    accionTd.appendChild(accionDiv);

    fila.appendChild(estadoTd);
    fila.appendChild(pilaTd);
    fila.appendChild(entradaTd);
    fila.appendChild(accionTd);
    tablaElement.appendChild(fila);
  }

  // Agrega la tabla completa al elemento contenedor
  tabla.appendChild(tablaElement);
}

function generarTablaConjuntoTransiciones(conjuntoTransiciones) {
  const tabla = document.getElementById("conjuntoTransicionesTable");
  tabla.innerHTML = ""; // Limpia el contenido anterior de la tabla
  const encabezados = [
    "Estado Actual",
    "Símbolo",
    "Cima de Pila",
    "Estado Siguiente",
    "Acción",
  ];

  // Crea la tabla y su fila de encabezado
  const tablaElement = document.createElement("table");
  const filaEncabezado = document.createElement("tr");

  for (const encabezado of encabezados) {
    const th = document.createElement("th");
    th.textContent = encabezado;
    filaEncabezado.appendChild(th);
  }
  tablaElement.appendChild(filaEncabezado);

  // Agrega las filas de datos
  for (const transicion of conjuntoTransiciones) {
    const fila = document.createElement("tr");

    const estadoActualTd = document.createElement("td");
    estadoActualTd.textContent = transicion.currentState;
    const simboloTd = document.createElement("td");
    simboloTd.textContent = transicion.symbol;
    const cimaPilaTd = document.createElement("td");
    cimaPilaTd.textContent = transicion.stackTop;
    const estadoSiguienteTd = document.createElement("td");
    estadoSiguienteTd.textContent = transicion.nextState;
    const accionTd = document.createElement("td");
    accionTd.textContent = transicion.action;

    fila.appendChild(estadoActualTd);
    fila.appendChild(simboloTd);
    fila.appendChild(cimaPilaTd);
    fila.appendChild(estadoSiguienteTd);
    fila.appendChild(accionTd);

    tablaElement.appendChild(fila);
  }

  // Agrega la tabla completa al elemento contenedor
  tabla.appendChild(tablaElement);
}

function ID_Tabla(descripcion2, descripcion) {
  const tabla = document.getElementById("ID_Tabla");
  tabla.innerHTML = ""; // Limpia el contenido anterior de la tabla
  const encabezados = ["Primero", "Segundo", "Tercero"];

  // Crea la tabla y su fila de encabezado
  const tablaElement = document.createElement("table");
  const filaEncabezado = document.createElement("tr");

  for (const encabezado of encabezados) {
    const th = document.createElement("th");
    th.textContent = encabezado;
    filaEncabezado.appendChild(th);
  }
  tablaElement.appendChild(filaEncabezado);

  // Agrega las filas de datos
  // Agrega las filas de datos
  for (
    let i = 0;
    i < conjuntoTransiciones.length || i < descripcion.length;
    i++
  ) {
    const fila = document.createElement("tr");
    const primeroTd = document.createElement("td");
    const segundoTd = document.createElement("td");
    const terceroTd = document.createElement("td");

    if (i < conjuntoTransiciones.length) {
      primeroTd.textContent = conjuntoTransiciones[i].currentState;
      segundoTd.textContent = conjuntoTransiciones[i].stackTop;
    }

    if (i < descripcion.length) {
      terceroTd.textContent = descripcion[i].stack;
    }

    fila.appendChild(primeroTd);
    fila.appendChild(segundoTd);
    fila.appendChild(terceroTd);

    tablaElement.appendChild(fila);
  }

  // Agrega la tabla completa al elemento contenedor
  tabla.appendChild(tablaElement);
}

function reiniciar() {
  // Limpiar los campos de entrada
  document.getElementById("inputString").value = "";

  //limpiar el parrafo de la respuesta
  const resultadoParrafo = document.getElementById("resultadoParrafo");
  resultadoParrafo.textContent = "Resultado de la validación:";
  resultadoParrafo.style.color = "black"; // Cambia el color a verde

  // Restablecer la imagen original
  const automataImage = document.getElementById("automataImage");
  automataImage.src = "/img/Q.png";

  // Limpiar las tablas generadas
  const descripcionInstantaneaTable = document.getElementById(
    "descripcionInstantaneaTable"
  );
  descripcionInstantaneaTable.innerHTML = "";

  const conjuntoTransicionesTable = document.getElementById(
    "conjuntoTransicionesTable"
  );
  conjuntoTransicionesTable.innerHTML = "";

  const ID_Tabla = document.getElementById("ID_Tabla");
  ID_Tabla.innerHTML = "";
}
