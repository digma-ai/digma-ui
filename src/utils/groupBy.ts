export const groupBy = <T, K extends string | number | symbol>(
  list: T[],
  getKey: (item: T) => K
) =>
  list.reduce((acc, curr) => {
    const group = getKey(curr);
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(curr);
    return acc;
  }, {} as Record<K, T[]>);
