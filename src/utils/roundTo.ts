export const roundTo = (number: number, n: number): number =>
  Number.isInteger(n) && n >= 0
    ? Math.round((number + Number.EPSILON) * Math.pow(10, n)) / Math.pow(10, n)
    : Math.round(number);
