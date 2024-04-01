import { Tag } from "../../../../../common/v3/Tag";
import { InsightCard } from "../common/InsightCard";
import { ColumnsContainer } from "../common/InsightCard/ColumnsContainer";
import { KeyValue } from "../common/InsightCard/KeyValue";
import { ContentContainer } from "../styles";
import * as s from "./styles";
import { SpanNexusInsightCardProps } from "./types";

const getTagType = (isHigh: boolean) => {
  return isHigh ? "mediumSeverity" : "default";
};

export const SpanNexusInsightCard = ({
  insight,
  onRecalculate,
  onRefresh,
  onGoToSpan,
  isMarkAsReadButtonEnabled
}: SpanNexusInsightCardProps) => {
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
        <ContentContainer>
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
        </ContentContainer>
      }
      onRecalculate={onRecalculate}
      onRefresh={onRefresh}
      onGoToSpan={onGoToSpan}
      isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
    />
  );
};
