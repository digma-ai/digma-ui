export const uniqueBy = <T>(data: T[], key: keyof T): T[] =>
  data.reduce((acc: T[], curr: T) => {
    if (!acc.find((x) => x[key] === curr[key])) {
      acc.push(curr);
    }

    return acc;
  }, []);
