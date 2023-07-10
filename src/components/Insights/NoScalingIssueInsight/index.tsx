import { Button } from "../../common/Button";
import { ChartIcon } from "../../common/icons/ChartIcon";
import { InsightCard } from "../InsightCard";
import { NoScalingIssueInsightProps } from "./types";

export const NoScalingIssueInsight = (props: NoScalingIssueInsightProps) => {
  const handleHistogramButtonClick = () => {
    props.insight.spanInfo &&
      props.onHistogramButtonClick(
        props.insight.spanInfo.instrumentationLibrary,
        props.insight.spanInfo.name,
        props.insight.type
      );
  };

  return (
    <InsightCard
      key={props.insight.type}
      data={props.insight}
      content={<div>This code is scaling well at concurrent executions</div>}
      buttons={[
        ...(props.insight.spanInfo
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
      onRecalculate={props.onRecalculate}
    />
  );
};
