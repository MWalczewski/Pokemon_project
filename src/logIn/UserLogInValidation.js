import { userLoginSchema } from "../Validations/UserLogInSchema";

export const logUser = async (event) => {
  event.preventDefault();
  let formData = {
    email: event.target[0].value,
    password: event.target[1].value,
    // confirmPassword: event.target[2].value,
  };
  const isValid = await userLoginSchema.isValid(formData);
  console.log(isValid);
  console.log(formData);
};
