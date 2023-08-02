export const isNumber = (x: unknown): x is number =>
  typeof x === "number" && !Number.isNaN(x);
