const PASSWORD_ALPHANUMERIC_REGEX = /^[a-zA-Z0-9]*$/gm;

export const isAlphanumeric = (password: string): boolean => {
  return new RegExp(PASSWORD_ALPHANUMERIC_REGEX).test(password);
};
