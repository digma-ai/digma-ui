import { Tag } from "../../../../common/v3/Tag";
import { InsightCard } from "../../InsightCard";
import { ColumnsContainer } from "../../InsightCard/ColumnsContainer";
import { KeyValue } from "../../InsightCard/KeyValue";
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
          <ColumnsContainer>
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
          </ColumnsContainer>
        </s.ContentContainer>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
    />
  );
};
