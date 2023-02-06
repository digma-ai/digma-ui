export const getActions = (prefix: string, actions: Record<string, string>) => {
  const res: Record<string, string> = {};
  for (const [key, value] of Object.entries<string>(actions)) {
    res[key] = `${prefix}/${value}`;
  }
  return res;
};
