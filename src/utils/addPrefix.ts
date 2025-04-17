import { isString } from "../typeGuards/isString";

type PrefixedMap<T> = Record<keyof T, string>;

export const addPrefix = <T extends Record<string, string>>(
  prefix: string,
  entries: T,
  separator?: string
): PrefixedMap<T> => {
  if (prefix.length === 0) {
    return entries;
  }

  const res = {} as PrefixedMap<T>;

  for (const [key, value] of Object.entries(entries)) {
    const prop = key as keyof T;

    res[prop] = `${prefix}${isString(separator) ? separator : "/"}${value}`;
  }

  return res;
};
