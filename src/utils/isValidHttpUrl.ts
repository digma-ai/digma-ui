export const isValidHttpUrl = (urlString: string) => {
  let url;

  try {
    url = new URL(urlString);
  } catch {
    return false;
  }

  return ["http:", "https:"].includes(url.protocol);
};
