import React, { useState, useEffect } from "react";
import "./Register.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { StyledButton } from "../MaterialUI/MaterialUI";

const lowerCaseRegex = /(?=.*[a-z])/;
const upperCaseRegex = /(?=.*[A-Z])/;
const numericRegex = /(?=.*[0-9])/;
const specialCharRegex = /(?=.*[!@#$%^&*])/;

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const onSubmit = (values) => {
  const { name, email, password, confirmPassword } = values;
  const user = { name, email, password, confirmPassword };
  fetch("http://localhost:8000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
};

const Register = () => {
  const [registeredEmails, setRegisteredEmails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((response) => {
        if (!response.ok) {
          throw Error("could not fetch the data for that resource!");
        }
        return response.json();
      })
      .then((data) => {
        setRegisteredEmails(
          data.map((user) => {
            return user.email;
          })
        );
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const userRegistrationValidationSchema = yup.object().shape({
    name: yup.string().required("First name is required!"),
    email: yup
      .string()
      .lowercase()
      .email("valid email format is required!")
      .required("Email is required!")
      .notOneOf(registeredEmails, "email already registered in the database"),
    password: yup
      .string()
      .required("Password is required!")
      .min(8, "Too short!")
      .max(12, "Too long, max 12 chars!")
      .matches(lowerCaseRegex, "one lower case required!")
      .matches(upperCaseRegex, "one upper case required!")
      .matches(numericRegex, "at least one number required!")
      .matches(specialCharRegex, "at least one special character is required!"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "passwords must match!")
      .required("Password is required!"),
  });

  return (
    <>
      <div className="formik-container">
        <Formik
          initialValues={initialValues}
          validationSchema={userRegistrationValidationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form className="form">
                <Field type="text" placeholder="name" id="name" name="name" />
                <ErrorMessage name="name" />
                <Field
                  type="email"
                  placeholder="e-mail address"
                  id="email"
                  name="email"
                />
                <ErrorMessage name="email" />
                <Field
                  type="password"
                  placeholder="password"
                  id="password"
                  name="password"
                />
                <ErrorMessage name="password" />
                <Field
                  type="password"
                  placeholder="confirm password"
                  id="confirmPassword"
                  name="confirmPassword"
                />
                <ErrorMessage name="confirmPassword" />
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
    </>
  );
};

export default Register;
