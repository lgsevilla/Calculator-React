import React, { useState } from "react";
import Display from "./Display";
import ButtonPanel from "./ButtonPanel";

function Calculator() {
  const [currentNumber, setCurrentNumber] = useState("0");
  const [storedNumber, setStoredNumber] = useState("");
  const [operator, setOperator] = useState("");
  const [awaitingSecondValue, setAwaitingSecondValue] = useState(false);

  // Dynamically updates the Backspace button to "AC" when needed
  const updateBackspaceButton = () => (currentNumber !== "0" ? "←" : "AC");

  // Handles number input
  const inputNumber = (value) => {
    if (awaitingSecondValue || currentNumber === "0") {
      setCurrentNumber(value);
      setAwaitingSecondValue(false);
    } else {
      setCurrentNumber((prev) => prev + value);
    }
  };

  // Handles operator input
  const inputOperator = (op) => {
    if (storedNumber && awaitingSecondValue) {
      setOperator(op);
      return;
    }
    if (storedNumber === "") {
      setStoredNumber(currentNumber);
    } else {
      setCurrentNumber(calculate(storedNumber, currentNumber, operator));
      setStoredNumber(currentNumber);
    }
    setOperator(op);
    setAwaitingSecondValue(true);
  };

  // Calculation function
  const calculate = (num1, num2, op) => {
    const x = parseFloat(num1);
    const y = parseFloat(num2);
    if (isNaN(x) || isNaN(y)) return "0";

    switch (op) {
      case "+": return (x + y).toString();
      case "-": return (x - y).toString();
      case "*": return (x * y).toString();
      case "/": return y === 0 ? "Error" : (x / y).toString();
      default: return num2;
    }
  };

  // Handles equals button
  const inputEquals = () => {
    if (!storedNumber || awaitingSecondValue) return;
    setCurrentNumber(calculate(storedNumber, currentNumber, operator));
    setStoredNumber("");
    setOperator("");
    setAwaitingSecondValue(true);
  };

  // Handles Backspace (←) or AC
  const handleBackspaceOrClear = () => {
    if (currentNumber.length > 1) {
      setCurrentNumber((prev) => prev.slice(0, -1)); // Delete one digit
    } else {
      setCurrentNumber("0"); // Reset to 0 when empty
      setStoredNumber("");
      setOperator("");
    }
  };

  // Handles square root button
  const handleSquareRoot = () => {
    let num = parseFloat(currentNumber);
    setCurrentNumber(num < 0 ? "Error" : Math.sqrt(num).toString());
    setStoredNumber("");
    setOperator("");
    setAwaitingSecondValue(false);
  };

  return (
    <div className="calculator">
      <Display value={currentNumber} />
      <ButtonPanel 
        handleClick={inputNumber} 
        calculate={inputEquals} 
        handleOperator={inputOperator} 
        handleBackspaceOrClear={handleBackspaceOrClear} 
        handleSquareRoot={handleSquareRoot}
        updateBackspaceButton={updateBackspaceButton}
      />
    </div>
  );
}

export default Calculator;