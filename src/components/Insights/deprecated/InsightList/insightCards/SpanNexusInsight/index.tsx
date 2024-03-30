import { Tag } from "../../../../../common/Tag";
import { Description } from "../../../../styles";
import { InsightCard } from "../../InsightCard";
import * as s from "./styles";
import { SpanNexusInsightProps } from "./types";

const getTagType = (isHigh: boolean) => {
  return isHigh ? "mediumSeverity" : "default";
};

/**
 * @deprecated
 */
export const SpanNexusInsight = (props: SpanNexusInsightProps) => {
  const { insight } = props;
  const {
    entries,
    flows,
    usage,
    services,
    isEntriesHigh,
    isFlowsHigh,
    isServicesHigh
  } = insight;
  return (
    <InsightCard
      data={insight}
      spanInfo={props.insight.spanInfo}
      content={
        <s.ContentContainer>
          <Description>Multiple code flows depend on this location</Description>
          <s.Stats>
            <s.Stat>
              <s.Key>Services</s.Key>
              <Tag type={getTagType(isServicesHigh)} value={services} />
            </s.Stat>
            <s.Stat>
              <s.Key>Endpoints</s.Key>
              <Tag type={getTagType(isEntriesHigh)} value={entries} />
            </s.Stat>
            <s.Stat>
              <s.Key>Flows</s.Key>
              <Tag type={getTagType(isFlowsHigh)} value={flows} />
            </s.Stat>
            {usage && (
              <s.Stat>
                <s.Key>Usage</s.Key>
                <Tag value={usage} />
              </s.Stat>
            )}
          </s.Stats>
        </s.ContentContainer>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
    />
  );
};
