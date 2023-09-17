/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Logo from "./Logo";

function Nav({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

export default Nav;
