import React from "react";
import Button from "./Button";

function ButtonPanel({ handleClick, calculate, clearDisplay }) {
  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+"
  ];

  return (
    <div className="button-panel">
      {buttons.map((btn, index) => (
        <Button
          key={index}
          label={btn}
          onClick={btn === "=" ? calculate : btn === "C" ? clearDisplay : handleClick}
        />
      ))}
      <Button label="C" onClick={clearDisplay} />
    </div>
  );
}

export default ButtonPanel;