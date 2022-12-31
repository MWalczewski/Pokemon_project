import React, { useContext } from "react";
import { Link } from "react-router-dom";
import navigationButtonsNames from "./navigationButtonsNames";
import { LoginContext } from "../contexts/LoginContext";
import "./navigationButtons.css";
import { StyledButton } from "../MaterialUI/MaterialUI";

const NavigationButtons = () => {
  const { loggedUser, setLoggedUser } = useContext(LoginContext);

  return (
    <>
      <div className="buttons-container">
        <StyledButton variant="outlined">
          <Link to="/" className="link">
            Pokedex
          </Link>
        </StyledButton>
        {navigationButtonsNames.map((name) => {
          return (
            <StyledButton variant="outlined" key={name}>
              <Link to={`${name}`} className="link">
                {name}
              </Link>
            </StyledButton>
          );
        })}
        {loggedUser ? (
          <>
            <StyledButton variant="outlined">
              <Link to="/Edit" className="link">
                EDIT
              </Link>
            </StyledButton>
            <StyledButton
              variant="outlined"
              onClick={() => {
                setLoggedUser(false);
              }}
            >
              <Link to="/" className="link">
                Log-out
              </Link>
            </StyledButton>
          </>
        ) : (
          <StyledButton variant="outlined">
            <Link to="/Log-in" className="link">
              LOG-IN
            </Link>
          </StyledButton>
        )}
      </div>
    </>
  );
};
export default NavigationButtons;
