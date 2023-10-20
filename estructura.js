class Stack{
    constructor() {
        this.items = {};
        this.top = 0;
    };

    push(data){
        this.top++;
        this.items[this.top] = data;
    };

    pop(){
        let deleteData;
        if(this.pop){
            deleteData = this.items[this.top];
            delete this.items[this.top];
            this.top--;
            return deleteData;
        };
    };
    getSize(){
        return this.top;
    }
    isEmpty(){
        if(!this.getSize()){
            return  true;
        }else{
            return false;
        }
    };
    peek(){
        if (this.isEmpty()){
            return null;
        };
        return this.items[this.top];
    };

    print(){
        let result = '';
        for(let i = this.top; i>0 ; i--){
            result += this.items[i] + ' '
        };
        return result;
    };

};

/*
const stack = new Stack();
console.log(stack.peek());
stack.push('Plato #1');
console.log(stack.peek());
stack.push('Plato #2');
stack.push('Plato #3');
console.log(stack.print());
console.log(stack.peek());
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.getSize());
console.log(stack.isEmpty());
console.log(stack.peek());
console.log(stack);
console.log(stack )
*/



class PDA {
    constructor() {
      this.stack = new Stack();
      this.currentState = 'q0';  // Estado inicial
    }
  
    transition(input) {
      const currentSymbol = input[0];

      transition(input){
        if(input.leng)
      }
      
      switch (this.currentState) {
        case "q0":
          if (currentSymbol === "xx" && this.stack.isEmpty() === true) {
            this.stack.push("10");
            this.currentState = "q1";
          } else {
            return false;
          }
          break;

        case "q1":
          if (currentSymbol === "xx" && this.stack.peek === "1") {
            this.stack.push("1");
          } else if (currentSymbol === "y" && this.stack.peek() === "1") {
            this.stack.push("111");
            this.currentState = "q3";
          } else {
            return false;
          }
          break;

        case "q3":
          if (currentSymbol === "y" && this.stack.peek === "1") {
            this.stack.push("111");
          } else if (currentSymbol === "x" && this.stack.peek() === "1") {
            this.stack.pop("1");
            this.currentState = "q4";
          } else {
            return false;
          }
          break;

        case "q4":
          if (currentSymbol === "x" && this.stack.peek === "1") {
            this.stack.pop("1");
          } else if (currentSymbol === "y" && this.stack.peek() === "1") {
            this.stack.pop("1");
            this.currentState = "q5";
          } else {
            return false;
          }
          break;

        case "q5":
          if (currentSymbol === "y" && this.stack.peek === "1") {
            this.stack.pop("1");
          } else if (currentSymbol === "z" && this.stack.peek() === "0") {
            this.stack.pop("0");
            this.currentState = "q6";
          } else {
            return false;
          }
          break;

        case "q6":
          if (currentSymbol === "z" && this.stack.Empty === true) {
            this.stack.pop();
          } else {
            return false;
          }
          break;

        default:
          return false;
      }
  
      input = input.substring(1);
  
      // If input is empty, we are done
      if (input === '') {
        if (this.stack.isEmpty() && this.currentState === 'q6') {
          return true;
        } else {
          return false;
        }
      }
  
      return this.transition(input);
    }
  }
  
  const pda = new PDA();
  
  // Pruebas
  console.log(pda.transition('xxyxxxyz'));  // Debe devolver true
  console.log(pda.transition('aaab'));  // Debe devolver false


