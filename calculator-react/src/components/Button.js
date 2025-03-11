import React, { useState } from "react";

function Button({ label, onClick, isClearButton }) {
  const [isLongPress, setIsLongPress] = useState(false);

  const handleMouseDown = () => {
    setIsLongPress(false);

    const timeout = setTimeout(() => {
      setIsLongPress(true);
      onClick(true); // Long press → AC
    }, 700); // 700ms for AC

    window.clearTimeout(window.holdTimeout);
    window.holdTimeout = timeout;
  };

  const handleMouseUp = () => {
    clearTimeout(window.holdTimeout);
    if (!isLongPress) {
      onClick(false); // Short press → Backspace
    }
  };

  return (
    <button 
      className={`button ${isClearButton ? "clear-button" : ""}`} 
      onMouseDown={isClearButton ? handleMouseDown : () => onClick(label)}
      onMouseUp={isClearButton ? handleMouseUp : null}
    >
      {label}
    </button>
  );
}

export default Button;