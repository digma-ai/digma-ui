import intervalToDuration from "date-fns/intervalToDuration";
import { isNumber } from "../typeGuards/isNumber";

export const timeAgo = (
  date: string,
  format?: "short" | "medium"
): { value: number; unit: string } | undefined => {
  const { years, months, days, hours, minutes, seconds } = intervalToDuration({
    start: new Date(),
    end: new Date(date)
  });

  let value: number | undefined;
  let unit: string | undefined;

  if (seconds) {
    value = seconds;
    unit = format === "short" ? "s" : "sec";
  }

  if (minutes) {
    value = minutes;
    unit = format === "short" ? "m" : "min";
  }

  if (hours) {
    value = hours;
    unit = "h";
  }

  if (days) {
    value = days;
    unit = "d";
  }

  if (months) {
    value = months;
    unit = "mo";
  }

  if (years) {
    value = years;
    unit = "y";
  }

  if (!unit || !isNumber(value)) {
    return;
  }

  return {
    value,
    unit
  };
};
