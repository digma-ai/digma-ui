// password should have at least 6 symbols and could be alphanumeric with at least one spec symbol
const PASSWORD_REGEX =
  /^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*-])[A-Za-z0-9!@#$%^&*-]{6,}$/gm;

export const isValidPasswordFormat = (password: string): boolean => {
  return new RegExp(PASSWORD_REGEX).test(password);
};
