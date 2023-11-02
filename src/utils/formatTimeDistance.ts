import intervalToDuration from "date-fns/intervalToDuration";
import { isNumber } from "../typeGuards/isNumber";

export type TimeUnit =
  | "seconds"
  | "minutes"
  | "hours"
  | "days"
  | "weeks"
  | "months"
  | "years";

const unitFormats = {
  seconds: {
    short: "s",
    medium: "sec",
    long: "second"
  },
  minutes: {
    short: "m",
    medium: "min",
    long: "minute"
  },
  hours: {
    short: "h",
    medium: "hr",
    long: "hour"
  },
  days: {
    short: "d",
    medium: "d",
    long: "day"
  },
  weeks: {
    short: "wk",
    medium: "wk",
    long: "week"
  },
  months: {
    short: "mo",
    medium: "mo",
    long: "month"
  },
  years: {
    short: "y",
    medium: "yr",
    long: "year"
  }
};

const getTimeDistance = (
  date: string,
  dateTimeToCompare: string
): { value: number; unit: TimeUnit } | undefined => {
  const { years, months, weeks, days, hours, minutes, seconds } =
    intervalToDuration({
      start: new Date(date),
      end: new Date(dateTimeToCompare)
    });

  let value: number | undefined;
  let unit: TimeUnit | undefined;

  if (seconds) {
    value = seconds;
    unit = "seconds";
  }

  if (minutes) {
    value = minutes;
    unit = "minutes";
  }

  if (hours) {
    value = hours;
    unit = "hours";
  }

  if (days) {
    value = days;
    unit = "days";
  }

  if (weeks) {
    value = weeks;
    unit = "weeks";
  }

  if (months) {
    value = months;
    unit = "months";
  }

  if (years) {
    value = years;
    unit = "years";
  }

  if (!unit || !isNumber(value)) {
    return;
  }

  return {
    value,
    unit
  };
};

export const formatTimeDistance = (
  dateTime: string,
  options?: {
    format?: "short" | "medium" | "long";
    withDescriptiveWords?: boolean;
  }
) => {
  const now = new Date();
  const dateTimeToCompare = new Date(dateTime).valueOf();

  const distance = getTimeDistance(now.toISOString(), dateTime);

  if (!distance) {
    return "";
  }

  const withDescriptiveWords =
    typeof options?.withDescriptiveWords === "boolean"
      ? options.withDescriptiveWords
      : true;
  const format = options?.format || "long";
  let unitString = unitFormats[distance.unit][format];

  if (distance.value !== 1 && format === "long") {
    unitString = `${unitString}s`;
  }

  const distanceString = distance ? `${distance.value} ${unitString}` : "";

  if (withDescriptiveWords) {
    if (dateTimeToCompare > now.valueOf()) {
      return `in ${distanceString}`;
    }

    if (dateTimeToCompare < now.valueOf()) {
      return `${distanceString} ago`;
    }

    return "now";
  }

  return distanceString;
};
