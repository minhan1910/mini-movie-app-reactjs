/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

function Button({ classNames, onClick, children }) {
  return (
    <button className={classNames} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
