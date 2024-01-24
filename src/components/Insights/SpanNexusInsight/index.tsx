import { Tag } from "../../common/Tag";
import { InsightCard } from "../InsightCard";
import { Description } from "../styles";
import * as s from "./styles";
import { SpanNexusInsightProps } from "./types";

export const SpanNexusInsight = (props: SpanNexusInsightProps) => {
  const { insight } = props;
  const { entries, flows, usage, services } = insight;
  return (
    <InsightCard
      data={insight}
      content={
        <s.ContentContainer>
          <Description>Multiple code flows depend on this location</Description>
          <s.Stats>
            <s.Stat>
              <s.Key>Services</s.Key>
              <Tag value={services} />
            </s.Stat>
            <s.Stat>
              <s.Key>Endpoints</s.Key>
              <Tag value={entries} />
            </s.Stat>
            <s.Stat>
              <s.Key>Flows</s.Key>
              <Tag value={flows} />
            </s.Stat>
            <s.Stat>
              <s.Key>Usage</s.Key>
              <Tag value={usage || "High"} />
            </s.Stat>
          </s.Stats>
        </s.ContentContainer>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
    />
  );
};
