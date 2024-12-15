import { getInsightTypeInfo } from "../../../../../utils/getInsightTypeInfo";
import { InsightIcon } from "../../../../Insights/InsightsCatalog/InsightsPage/insightCards/common/InsightCard/InsightHeader/InsightIcon";
import { Card } from "../../../../common/v3/Card";
import { Info } from "../../../../common/v3/Info";
import type { EnvironmentData, GenericMetrics } from "../../types";
import * as s from "./styles";
import type { HighlightCardProps } from "./types";

const getCriticality = (environments: EnvironmentData<GenericMetrics>[]) =>
  environments.reduce((acc, env) => Math.max(acc, env.insightCriticality), 0);

export const HighlightCard = ({ highlight, content }: HighlightCardProps) => {
  const insightTypeInfo = getInsightTypeInfo(highlight.insightType);
  const insightCriticality = getCriticality(highlight.environments);

  return (
    <Card
      header={
        <s.Header>
          {insightTypeInfo && (
            <InsightIcon
              insightTypeInfo={insightTypeInfo}
              criticality={insightCriticality}
            />
          )}
          <s.TitleContainer>
            {insightTypeInfo?.label}
            {insightTypeInfo?.description && (
              <s.InfoContainer>
                <Info title={<insightTypeInfo.description />} />
              </s.InfoContainer>
            )}
          </s.TitleContainer>
        </s.Header>
      }
      content={<s.ContentContainer>{content}</s.ContentContainer>}
    />
  );
};
