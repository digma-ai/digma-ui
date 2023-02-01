export type GroupBy<T> = { [key: string]: T[] };

export const groupBy = <T extends Record<string, unknown>>(
  data: T[],
  key: string
): GroupBy<T> =>
  data.reduce((acc: GroupBy<T>, curr: T) => {
    const groupKey = String(curr[key]);
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }

    acc[groupKey].push(curr);

    return acc;
  }, {});
