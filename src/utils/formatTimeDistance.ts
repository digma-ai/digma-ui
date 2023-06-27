import { intlFormatDistance } from "date-fns";

export const formatTimeDistance = (dateTime: string) =>
  intlFormatDistance(new Date(dateTime), new Date(), {
    numeric: "always",
  });
