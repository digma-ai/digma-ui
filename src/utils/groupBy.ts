export type GroupBy<T> = { [key: string]: T[] };

export const groupBy = <T>(data: T[], key: keyof T): GroupBy<T> =>
  data.reduce((acc: GroupBy<T>, curr: T) => {
    const groupKey = String(curr[key]);

    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }

    acc[groupKey].push(curr);

    return acc;
  }, {});
