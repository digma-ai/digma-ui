import { getInsightTypeInfo } from "../../../../../utils/getInsightTypeInfo";
import { Card } from "../../../../common/v3/Card";
import { Info } from "../../../../common/v3/Info";
import * as s from "./styles";
import { HighlightCardProps } from "./types";

export const HighlightCard = ({ highlight, content }: HighlightCardProps) => {
  const insightTypeInfo = getInsightTypeInfo(highlight.insightType);

  return (
    <Card
      header={
        <s.Header>
          {insightTypeInfo?.label}
          {insightTypeInfo?.description && (
            <Info title={<insightTypeInfo.description />} />
          )}
        </s.Header>
      }
      content={<s.ContentContainer>{content}</s.ContentContainer>}
    />
  );
};
