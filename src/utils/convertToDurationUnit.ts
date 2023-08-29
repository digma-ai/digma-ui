export const convertToDurationUnit = (nanoseconds: number, unit: string) => {
  switch (unit) {
    case "ns":
      return nanoseconds;
    case "μs":
      return nanoseconds / 10 ** 3;
    case "ms":
      return nanoseconds / 10 ** 6;
    case "sec":
      return nanoseconds / 10 ** 9;
    case "min":
    default:
      return nanoseconds / 10 ** 9 / 60;
  }
};
