import { getInsightTypeInfo } from "../../../../../utils/getInsightTypeInfo";
import { InfoCircleIcon } from "../../../../common/icons/InfoCircleIcon";
import { Card } from "../../../../common/v3/Card";
import { Tooltip } from "../../../../common/v3/Tooltip";
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
            <Tooltip title={<insightTypeInfo.description />}>
              <s.InfoContainer>
                <InfoCircleIcon color={"currentColor"} size={12} />
              </s.InfoContainer>
            </Tooltip>
          )}
        </s.Header>
      }
      content={<s.ContentContainer>{content}</s.ContentContainer>}
    />
  );
};
