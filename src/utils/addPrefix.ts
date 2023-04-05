export const addPrefix = (
  prefix: string,
  actions: Record<string, string>,
  separator?: string
): Record<string, string> => {
  const res: Record<string, string> = {};
  for (const [key, value] of Object.entries<string>(actions)) {
    res[key] = `${prefix}${
      typeof separator === "string" ? separator : "/"
    }${value}`;
  }
  return res;
};
