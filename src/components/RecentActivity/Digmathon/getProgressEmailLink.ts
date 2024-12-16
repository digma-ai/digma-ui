import { isString } from "../../../typeGuards/isString";
import type { ConfigContextData } from "../../common/App/types";
import type { DigmathonInsightData } from "../types";

export const EMAIL_ADDRESS = "digmathon@digma.ai";
const LINE_BREAK = "%0D%0A";

const isDigmathonInsightDataWithFoundDate = (
  x: DigmathonInsightData
): x is Omit<DigmathonInsightData, "foundAt"> & { foundAt: string } =>
  isString(x.foundAt);

export const getProgressEmailLink = (
  insights: DigmathonInsightData[],
  config: ConfigContextData
) => {
  const userId = config.userId || config.userRegistrationEmail || "";
  const subject = `Digmathon Challenge [${userId}]`;

  const foundInsights = insights
    .filter(isDigmathonInsightDataWithFoundDate)
    .sort(
      (a, b) => new Date(a.foundAt).valueOf() - new Date(b.foundAt).valueOf()
    )
    .map(
      (x, i) =>
        `${i + 1}) ${x.data?.title ?? x.type}${LINE_BREAK}Found at: ${new Date(
          x.foundAt
        ).toISOString()}`
    )
    .join(LINE_BREAK.repeat(2));

  const body = ["Insights found:", foundInsights].join(LINE_BREAK);

  return `mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`;
};
