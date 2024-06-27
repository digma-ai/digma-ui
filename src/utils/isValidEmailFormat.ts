// Source: https://piotr.gg/regexp/email-address-regular-expression-that-99-99-works.html
const EMAIL_ADDRESS_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isValidEmailFormat = (email: string): boolean => {
  return new RegExp(EMAIL_ADDRESS_REGEX).test(email);
};
