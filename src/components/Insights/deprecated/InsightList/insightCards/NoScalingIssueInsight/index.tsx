import { Button } from "../../../../../common/Button";
import { ChartIcon } from "../../../../../common/icons/ChartIcon";
import { InsightCard } from "../../InsightCard";
import { NoScalingIssueInsightProps } from "./types";

/**
 * @deprecated
 * safe to delete after the implementation of the version with new UI
 */
export const NoScalingIssueInsight = ({
  insight,
  onHistogramButtonClick,
  onRecalculate,
  onRefresh
}: NoScalingIssueInsightProps) => {
  const handleHistogramButtonClick = () => {
    if (insight.spanInfo) {
      onHistogramButtonClick(
        insight.spanInfo.spanCodeObjectId,
        insight.type,
        insight.spanInfo.displayName
      );
    }
  };

  return (
    <InsightCard
      key={insight.type}
      spanInfo={insight.spanInfo}
      data={insight}
      content={<div>This code is scaling well at concurrent executions</div>}
      buttons={[
        ...(insight.spanInfo
          ? [
              <Button
                icon={{ component: ChartIcon }}
                key={"histogram"}
                onClick={handleHistogramButtonClick}
              >
                Histogram
              </Button>
            ]
          : [])
      ]}
      onRecalculate={onRecalculate}
      onRefresh={onRefresh}
    />
  );
};
