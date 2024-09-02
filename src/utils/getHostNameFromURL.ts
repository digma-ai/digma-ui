export const getHostnameFromURL = (value: string) => {
  let url = null;

  try {
    url = new URL(value);
  } catch {
    return null;
  }

  return url?.hostname;
};
