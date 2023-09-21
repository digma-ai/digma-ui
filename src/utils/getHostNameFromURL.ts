export const getHostnameFromURL = (value: string) => {
  let url = null;

  try {
    url = new URL(value);
  } catch (e) {
    return null;
  }

  return url && url.hostname;
};
