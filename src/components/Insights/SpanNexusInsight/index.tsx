import { Tag } from "../../common/Tag";
import { InsightCard } from "../InsightCard";
import { Description } from "../styles";
import * as s from "./styles";
import { SpanNexusInsightProps, } from "./types";

export const SpanNexusInsight = (
  props: SpanNexusInsightProps
) => {
  const { insight } = props;
  return (
    <InsightCard
      data={insight}
      content={
        <s.ContentContainer>
          <Description>
            Multiple code flows depned on this location
          </Description>
          <s.Stats>
            <s.Stat>
              <s.Key>Services</s.Key>
              <Tag type={"mediumSeverity"} value={props.insight.services} />
            </s.Stat>
            <s.Stat>
              <s.Key>Edpoints</s.Key>
              <Tag value={props.insight.endpoints} />
            </s.Stat>
            <s.Stat>
              <s.Key>Flows</s.Key>
              <Tag type={"mediumSeverity"} value={props.insight.flows} />
            </s.Stat>
            <s.Stat>
              <s.Key>Usage</s.Key>
              <Tag type={"mediumSeverity"} value={props.insight.usage || 'High'} />
            </s.Stat>
          </s.Stats>
        </s.ContentContainer>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
    />
  );
};
