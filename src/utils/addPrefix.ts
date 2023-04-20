type PrefixedMap<T> = Record<keyof T, string>;

export const addPrefix = <T extends Record<string, string>>(
  prefix: string,
  actions: T,
  separator?: string
): PrefixedMap<T> => {
  const res = {} as PrefixedMap<T>;

  for (const [key, value] of Object.entries(actions)) {
    const prop = key as keyof T;

    res[prop] = `${prefix}${
      typeof separator === "string" ? separator : "/"
    }${value}`;
  }

  return res;
};
