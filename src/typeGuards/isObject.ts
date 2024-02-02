import { isNull } from "./isNull";

export const isObject = (
  x: unknown
): x is Record<string | number | symbol, unknown> =>
  typeof x === "object" && !isNull(x);
