const PASSWORD_REGEX =
  /^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*-_])[A-Za-z0-9!@#$%^&*-_]{6,}$/gm;

export const isValidPasswordFormat = (password: string): boolean => {
  return new RegExp(PASSWORD_REGEX).test(password);
};
