class Calculator {
  constructor(previousOperandtextElement, currentOperandtextElement) {
    this.previousOperandtextElement = previousOperandtextElement;
    this.currentOperandtextElement = currentOperandtextElement;
    this.clear();
  }
  clear() {
    this.previousOperand = "";
    this.currentOperand = "0";
    this.operation = undefined;
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  appendNumber(number) {
    // return the function when the period(.) more than one.
    if (number === "." && this.currentOperand.includes(".")) {
      return;
    }
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  chooseSymbol(symbol) {
    // if the second number is empty then it return the function
    if (this.currentOperand === "") {
      return;
    }
    // previous value is not empty and run the compute function
    if (this.previousOperand != "") {
      this.compute();
    }
    this.operation = symbol;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  compute() {
    let computation; // it will the result of the operation
    let prev = parseFloat(this.previousOperand);
    let current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) {
      return;
    }
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }
  getdisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigit = parseFloat(stringNumber.split(".")[0]);
    const decimalDigit = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigit)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigit.toLocaleString("en", {
        maximunFractionDigits: 0,
      });
    }
    if (decimalDigit != null) {
      return `${integerDisplay}.${decimalDigit}`;
    } else {
      return integerDisplay
    }
  }
  updateDisplay() {
    this.currentOperandtextElement.innerText = this.getdisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandtextElement.innerText = `${this.getdisplayNumber(
        this.previousOperand
      )}  ${this.operation}`;
    }else{
      this.previousOperandtextElement.innerText=''
    }
  }
}

const numberbuttons = document.querySelectorAll("[data-number]");
const operationbuttons = document.querySelectorAll("[data-operation]");
const allClearbutton = document.querySelector("[data-all-clear]");
const deletebutton = document.querySelector("[data-delete]");
const equaltobutton = document.querySelector("[data-equal-to]");
const previousOperandtextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandtextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  previousOperandtextElement,
  currentOperandtextElement
);

numberbuttons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationbuttons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseSymbol(button.innerText);
    calculator.updateDisplay();
  });
});

equaltobutton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearbutton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deletebutton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

