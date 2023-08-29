import { Duration } from "../globals";
import { convertToDurationUnit } from "./convertToDurationUnit";
import { roundTo } from "./roundTo";

export const convertToDuration = (value: number): Duration => {
  let unit = "min";

  if (value < 60 * 10 ** 9) {
    unit = "sec";
  }

  if (value < 10 ** 9) {
    unit = "ms";
  }

  if (value < 10 ** 6) {
    unit = "μs";
  }

  if (value < 10 ** 3) {
    unit = "ns";
  }

  return {
    value: roundTo(convertToDurationUnit(value, unit), 2),
    unit,
    raw: value
  };
};
