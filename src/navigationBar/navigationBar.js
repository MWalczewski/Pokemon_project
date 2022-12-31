import React from "react";
import Logo from "../logo/logo";
import NavigationButtons from "../navigationButtons/navigationButtons";
import "./navigationBar.css";

const NavigationBar = () => {
  return (
    <div className="container">
      <Logo />
      <div>
        <NavigationButtons />
      </div>
    </div>
  );
};

export default NavigationBar;
