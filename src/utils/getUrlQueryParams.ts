export const getUrlQueryParams = (url: string) => {
  const searchParams = new URLSearchParams(url);
  const params: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }
  return params;
};
