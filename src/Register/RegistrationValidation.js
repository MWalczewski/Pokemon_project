import { userRegistrationValidationSchema } from "../Validations/UserRegistrationSchema";

export const registerUser = async (event) => {
  event.preventDefault();
  let formData = {
    name: event.target[0].value,
    email: event.target[1].value,
    password: event.target[2].value,
    confirmPassword: event.target[3].value,
  };
  const isValid = await userRegistrationValidationSchema.isValid(formData);
  console.log(isValid);
  console.log(formData);
};
