// 2. 𝐿 = {𝑥^2𝑛 𝑦^𝑚 𝑥^3𝑚 𝑦^𝑛 𝑧+ | 𝑛 ≥ 1, 𝑚 ≥ 1}   ---->  xxyyxxyyz  /contar x/0 ---> y 
// (xx + 10)(y + 111)(x - 1) (y - 1)(z - 0)

n=1 = x
m=1 = y

xxyxxxyzz




/*
    valorCima
    valordeCadena

*/

function crearExpresionRegular(n, m) {

    var numN = parseInt(n);
    var numM = parseInt(m);
    var dobleN = numM * 2;
    var tripleM = numM * 3;

    // Utiliza variables para controlar el número de repeticiones.
    var regexPattern = new RegExp(`^x{${dobleN}}y{${numM}}x{${tripleM}}y{${numN}}z+$`);
    return regexPattern;
  }
  
  // Usar la función con valores personalizables para n y m.
  var n = 2; // Número mínimo de repeticiones
  var m = 2; // Número máximo de repeticiones
  
  var expresionRegular = crearExpresionRegular(n, m);
  
  // Ejemplos de cadenas válidas y cadenas inválidas
  var cadenaUno = "xxxxyyxxxxxxyyzzzzzzzzz"; // Cumple con el rango de repeticiones
  var cadenaDos = "aadddbcccz";   // No cumple con el rango mínimo
  var cadenaTres = "aadddbcccz";   // No cumple con el rango mínimo
  
  console.log(expresionRegular.test(cadenaUno)); // Devuelve true
  console.log(expresionRegular.test(cadenaDos)); // Devuelve false
  console.log(expresionRegular.test(cadenaTres)); // Devuelve false



  //funcionamiento

  // conteo del primer caracter y el total se asigna a = n.
  // conteo del segundo caracter distinto al primero y el total se asigna a = m
  