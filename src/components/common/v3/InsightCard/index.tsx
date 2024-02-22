import { Card } from "../Card";
import { InsightHeader } from "../InsightHeader";
import * as s from "./styles";
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
      footer={
        <s.InsightFooter>
          <div>Dismiss</div>
          <div></div>
        </s.InsightFooter>
      }
    />
  );
};
