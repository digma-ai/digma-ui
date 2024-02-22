import { Card } from "../../Card";
import { InsightHeader } from "../InsightHeader";
import { InsightCardProps } from "./types";

export const InsightCard = (props: InsightCardProps) => {
  return (
    <Card
      header={
        <InsightHeader
          isActive={true}
          isNew={props.isNew}
          isAsync={props.isAsync}
          insightType={props.insight.type}
          importance={props.insight.importance}
        />
      }
      content={props.content}
    />
  );
};
