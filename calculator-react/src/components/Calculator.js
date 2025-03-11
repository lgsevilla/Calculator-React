import React, { useState } from "react";
import Display from "./Display";
import ButtonPanel from "./ButtonPanel";

function Calculator() {
  const [expression, setExpression] = useState("");

  const handleClick = (value) => {
    setExpression((prev) => prev + value);
  };

  const calculate = () => {
    try {
      setExpression(eval(expression)); 
    } catch {
      setExpression("Error");
    }
  };

  const clearDisplay = () => {
    setExpression("");
  };

  return (
    <div className="calculator">
      <Display value={expression} />
      <ButtonPanel handleClick={handleClick} calculate={calculate} clearDisplay={clearDisplay} />
    </div>
  );
}

export default Calculator;