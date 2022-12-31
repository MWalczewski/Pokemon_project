import * as yup from "yup";

const lowerCaseRegex = /(?=.*[a-z])/;
const upperCaseRegex = /(?=.*[A-Z])/;
const numericRegex = /(?=.*[0-9])/;
const specialCharRegex = /(?=.*[!@#$%^&*])/;

export const userLoginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .lowercase()
    .email("valid email format is required!")
    .required("Email is required!"),
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
