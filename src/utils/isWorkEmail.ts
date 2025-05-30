import freeEmailDomains from "free-email-domains";

export const isWorkEmail = (email: string): boolean => {
  const startIndex = email.indexOf("@");
  if (startIndex < 0) {
    return false;
  }

  const domain = email.slice(startIndex + 1);
  return !freeEmailDomains.includes(domain);
};
