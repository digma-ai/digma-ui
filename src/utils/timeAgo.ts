import intervalToDuration from "date-fns/intervalToDuration";

export const timeAgo = (date: string): string => {
  const { years, months, days, hours, minutes, seconds } = intervalToDuration({
    start: new Date(),
    end: new Date(date)
  });

  if (years) {
    return `${years}y`;
  }

  if (months) {
    return `${months}mo`;
  }

  if (days) {
    return `${days}d`;
  }

  if (hours) {
    return `${hours}h`;
  }

  if (minutes) {
    return `${minutes}m`;
  }

  if (seconds) {
    return `${seconds}s`;
  }

  return "";
};
