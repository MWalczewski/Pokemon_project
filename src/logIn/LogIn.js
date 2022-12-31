import React, { useState, useEffect, useContext } from "react";
import "../Register/Register.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import { userLoginValidationSchema } from "../Validations/UserLogInSchema";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { LoginContext } from "../contexts/LoginContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StyledButton } from "../MaterialUI/MaterialUI";

const initialValues = {
  email: "",
  password: "",
};

const lowerCaseRegex = /(?=.*[a-z])/;
const upperCaseRegex = /(?=.*[A-Z])/;
const numericRegex = /(?=.*[0-9])/;
const specialCharRegex = /(?=.*[!@#$%^&*])/;

const LogIn = () => {
  const [availableEmails, setAvailableEmails] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [error, setError] = useState(null);

  const { setLoggedUser } = useContext(LoginContext);

  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((response) => {
        if (!response.ok) {
          throw Error("could not fetch the data for that resource!");
        }
        return response.json();
      })
      .then((data) => {
        setAvailableEmails(
          data.map((user) => {
            return user.email;
          })
        );
        setAvailableUsers(
          data.map(({ email, password }) => {
            return { email, password };
          })
        );
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const userLoginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .lowercase()
      .email("valid email format is required!")
      .required("Email is required!")
      .oneOf(availableEmails, "email not registered in the database"),
    password: yup
      .string()
      .required("Password is required!")
      .min(8, "Too short!")
      .max(12, "Too long, max 12 chars!")
      .matches(lowerCaseRegex, "one lower case required!")
      .matches(upperCaseRegex, "one upper case required!")
      .matches(numericRegex, "at least one number required!")
      .matches(specialCharRegex, "at least one special character is required!"),
  });

  const navigate = useNavigate();

  const notifyIncorrectLogin = () => {
    toast.error("Incorrect Login Details!", { autoClose: false });
  };

  const notifyCorrectLogin = () => {
    toast.success("Welcome to Pokedex!");
    setLoggedUser(true);
    navigate("/Edit", { replace: true });
  };

  return (
    <div className="formik-container">
      <Formik
        initialValues={initialValues}
        validationSchema={userLoginValidationSchema}
        onSubmit={(values) => {
          const singleUser = availableUsers.find((user) => {
            return user.email === values.email;
          });
          const loggedUser = availableUsers.filter((user) => {
            return user.email === values.email;
          });
          {
            singleUser.email === values.email &&
            singleUser.password === values.password
              ? notifyCorrectLogin()
              : notifyIncorrectLogin();
          }
        }}
      >
        {(formik) => {
          return (
            <Form className="form">
              <Field
                type="email"
                placeholder="e-mail address"
                id="email"
                name="email"
              />
              <ErrorMessage name="email" />
              <Field
                type="text"
                placeholder="password"
                id="password"
                name="password"
              />
              <ErrorMessage name="password" />
              <StyledButton
                variant="outlined"
                type="submit"
                disabled={!(formik.dirty && formik.isValid)}
              >
                SUBMIT
              </StyledButton>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default LogIn;
