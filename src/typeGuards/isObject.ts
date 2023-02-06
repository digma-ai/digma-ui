import { isNull } from "./isNull";

export const isObject = (x: unknown): x is Record<string, unknown> =>
  typeof x === "object" && !isNull(x);
