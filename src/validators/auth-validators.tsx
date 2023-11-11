import { showErrorMessage } from "../utilities/sweet-alert";

export const rgxEmail =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

type register = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export const validateOfRegister = (values: register) => {
  if (values.username.length < 4) {
    return showErrorMessage("El nombre debe tener al menos 4 caracteres.");
  }
  if (!rgxEmail.test(values.email)) {
    return showErrorMessage("El email no es válido.");
  }
  if (values.password !== values.confirmPassword) {
    return showErrorMessage("Las contraseñas no coinciden.");
  }
  return true;
};