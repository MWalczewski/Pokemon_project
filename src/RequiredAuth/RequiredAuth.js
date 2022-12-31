import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";

const RequiredAuth = ({ children }) => {
  const { loggedUser } = useContext(LoginContext);

  if (loggedUser === false) {
    return <Navigate to="/Log-in" />;
  }
  return children;
};

export default RequiredAuth;
