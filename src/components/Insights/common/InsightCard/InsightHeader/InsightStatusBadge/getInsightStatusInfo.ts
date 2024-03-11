import { DefaultTheme } from "styled-components/dist/types";
import { InsightStatus } from "../../../../types";

interface InsightStatusInfo {
  label: string;
  color: string;
}

export const getInsightStatusInfo = (
  status: InsightStatus,
  theme: DefaultTheme
): InsightStatusInfo | undefined => {
  switch (status) {
    case InsightStatus.Active:
      return {
        label: "Active",
        color: theme.colors.v3.status.success
      };
    case InsightStatus.InEvaluation:
      return {
        label: "Evaluating",
        color: theme.colors.v3.status.medium
      };
    case InsightStatus.PossiblyFixed:
      return {
        label: "Possibly Fixed",
        color: theme.colors.v3.status.low
      };
    case InsightStatus.Regression:
      return {
        label: "Regression",
        color: theme.colors.v3.status.high
      };
  }
};
