const PASSWORD_REGEX =
  /^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/gm;

export const isValidPasswordFormat = (email: string): boolean => {
  return new RegExp(PASSWORD_REGEX).test(email);
};
