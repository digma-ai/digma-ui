import { ProductionAffectionBar } from "../../Insights/InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/common/InsightCard/ProductionAffectionBar";
import { CrossCircleIcon } from "../../common/icons/16px/CrossCircleIcon";
import { Tag } from "../../common/v3/Tag";
import { Tooltip } from "../../common/v3/Tooltip";
import { HIGH_SEVERITY_SCORE_THRESHOLD, Score, getTagType } from "../Score";
import { getErrorMethodId } from "../getErrorMethodId";
import { TimestampKeyValue } from "./TimestampKeyValue";
import * as s from "./styles";
import type { ErrorCardProps } from "./types";

export const ErrorCard = ({ data, onClick }: ErrorCardProps) => {
  const tagType = getTagType(data.scoreInfo.score);

  const name = data.name;
  const scoreInfo = data.scoreInfo;
  const characteristic = data.characteristic;
  const location = getErrorMethodId(data.sourceCodeObjectId ?? "");

  const handleCardClick = () => {
    onClick(data.uid);
  };

  return (
    <s.StyledCard
      onClick={handleCardClick}
      header={
        <s.Header>
          <Tag
            type={tagType}
            content={
              <s.ErrorIconContainer>
                <CrossCircleIcon color={"currentColor"} size={16} />
              </s.ErrorIconContainer>
            }
          />
          {name && (
            <Tooltip title={data.name}>
              <s.Title>{data.name}</s.Title>
            </Tooltip>
          )}
          <s.ScoreContainer>
            <Score data={scoreInfo} />
          </s.ScoreContainer>
        </s.Header>
      }
      content={
        <s.Content>
          {scoreInfo.score > HIGH_SEVERITY_SCORE_THRESHOLD && (
            <ProductionAffectionBar isTicketCreated={false} />
          )}
          <s.ColumnsContainer>
            {characteristic && (
              <s.StyledKeyValue label={"Characteristic"} title={characteristic}>
                {characteristic}
              </s.StyledKeyValue>
            )}
            {location && (
              <s.StyledKeyValue label={"Location"} title={location}>
                {location}
              </s.StyledKeyValue>
            )}
          </s.ColumnsContainer>
        </s.Content>
      }
      footer={
        <s.Footer>
          <TimestampKeyValue
            label={"Started"}
            timestamp={data.firstOccurenceTime}
          />
          <TimestampKeyValue
            label={"Ended"}
            timestamp={data.lastOccurenceTime}
          />
        </s.Footer>
      }
    />
  );
};
