import { InsightCard } from "../../../../common/v3/InsightCard";
import {
  KeyValue,
  KeyValueContainer
} from "../../../../common/v3/KeyValueContainer";
import { Tag } from "../../../../common/v3/Tag";
import * as s from "./styles";
import { SpanNexusInsightProps } from "./types";

const getTagType = (isHigh: boolean) => {
  return isHigh ? "mediumSeverity" : "default";
};

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
      insight={insight}
      content={
        <s.ContentContainer>
          <s.Description>
            Multiple code flows depend on this location
          </s.Description>
          <KeyValueContainer>
            <KeyValue label={"Services"}>
              <Tag type={getTagType(isServicesHigh)} content={services} />
            </KeyValue>
            <KeyValue label={"Endpoints"}>
              <Tag type={getTagType(isEntriesHigh)} content={entries} />
            </KeyValue>
            <KeyValue label={"Flows"}>
              <Tag type={getTagType(isFlowsHigh)} content={flows} />
            </KeyValue>
            {usage && (
              <KeyValue label={"Usage"}>
                <Tag content={usage} />
              </KeyValue>
            )}
          </KeyValueContainer>
        </s.ContentContainer>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
    />
  );
};
