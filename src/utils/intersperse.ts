export const intersperse = <T, S>(
  arr: T[],
  separatorFunc: (index: number) => S
): (T | S)[] => arr.flatMap((x: T, i) => [separatorFunc(i), x]).slice(1);
