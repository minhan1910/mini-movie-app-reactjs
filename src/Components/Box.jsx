/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Button from "./Button";
import { useState } from "react";


function ListBox({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  function handleSetIsOpen() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div className="box">
      <Button classNames="btn-toggle" onClick={handleSetIsOpen}>
        {isOpen ? "–" : "+"}
      </Button>

      {isOpen && children}
    </div>
  );
}

export default ListBox;
