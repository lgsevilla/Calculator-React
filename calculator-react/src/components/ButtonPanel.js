import React from "react";
import Button from "./Button";

function ButtonPanel({ handleClick, calculate, handleOperator, handleBackspaceOrClear, handleSquareRoot, updateBackspaceButton }) {
  const buttons = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "√", "+"],
    [updateBackspaceButton(), "="] // AC turns into Backspace (←) when needed
  ];

  return (
    <div className="button-panel">
      {buttons.flat().map((btn, index) => (
        <Button
          key={index}
          label={btn}
          onClick={
            btn === "←" || btn === "AC" ? handleBackspaceOrClear :
            btn === "=" ? calculate :
            btn === "√" ? handleSquareRoot :
            ["+", "-", "*", "/"].includes(btn) ? () => handleOperator(btn) :
            handleClick
          }
        />
      ))}
    </div>
  );
}

export default ButtonPanel;