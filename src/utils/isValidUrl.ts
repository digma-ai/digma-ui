export const isValidHttpUrl = (urlString: string) => {
  let url;

  try {
    url = new URL(urlString);
  } catch (_) {
    return false;
  }

  return ["http:", "https:"].includes(url.protocol);
};
