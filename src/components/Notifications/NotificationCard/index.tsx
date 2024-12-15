import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components";
import { formatTimeDistance } from "../../../utils/formatTimeDistance";
import { getInsightTypeInfo } from "../../../utils/getInsightTypeInfo";
import { InsightScope } from "../../Insights/types";
import { Badge } from "../../common/Badge";
import { Tooltip } from "../../common/Tooltip";
import type { CodeObjectData, InsightNotificationData } from "../types";
import * as s from "./styles";
import type { NotificationCardProps } from "./types";

const getBadgeStyles = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return {
        main: {
          background: "#e00036",
          boxShadow: "0px 0px 4px #761c32"
        },
        outline: {
          background: "rgb(224 0 54 / 40%)",
          boxShadow: "0 0 8px rgb(76 142 241 / 12%)"
        }
      };
    case "dark":
    case "dark-jetbrains":
      return {
        main: {
          background: "#f93967",
          boxShadow: "0px 0px 4px #761c32"
        },
        outline: {
          background: "rgb(249 57 103 / 40%)",
          boxShadow: "0 0 8px rgb(76 142 241 / 12%)"
        }
      };
  }
};

const getCodeObjectData = (data: InsightNotificationData): CodeObjectData => {
  const codeObjectData: CodeObjectData = {};

  // for top level insights
  if (data.scope === InsightScope.Function) {
    codeObjectData.methodCodeObjectId = data.codeObjectId;
  }

  // for span end endpoint insights
  if (
    [InsightScope.Span, InsightScope.EntrySpan].includes(data.scope) &&
    data.spanInfo
  ) {
    codeObjectData.spanCodeObjectId = data.spanInfo.spanCodeObjectId;
    if (data.spanInfo.methodCodeObjectId) {
      codeObjectData.methodCodeObjectId = data.spanInfo.methodCodeObjectId;
    }
  }

  return codeObjectData;
};

const getLinkName = (data: InsightNotificationData) => {
  // for top level insights
  if (data.scope === InsightScope.Function && data.codeObjectId) {
    return data.codeObjectId.split("$_$")[1];
  }

  // for span end endpoint insights
  if (
    [InsightScope.Span, InsightScope.EntrySpan].includes(data.scope) &&
    data.spanInfo
  ) {
    return data.spanInfo.displayName;
  }
};

export const NotificationCard = ({
  data,
  onLinkClick
}: NotificationCardProps) => {
  const theme = useTheme();
  const badgeStyles = getBadgeStyles(theme);

  const handleLinkClick = () => {
    const codeObjectData = getCodeObjectData(data.data);
    onLinkClick(codeObjectData);
  };

  const Icon =
    data.type === "NewInsight" &&
    getInsightTypeInfo(data.data.insightType)?.icon;

  const title = data.title;
  const linkName = getLinkName(data.data);
  const timeDistanceString = formatTimeDistance(data.timestamp, {
    format: "medium"
  });

  return (
    <s.Card
      header={
        <s.Header>
          {Icon && (
            <s.IconContainer>
              <Icon color={"currentColor"} size={16} />
            </s.IconContainer>
          )}
          <Tooltip title={title}>
            <s.Title>{title}</s.Title>
          </Tooltip>
          {timeDistanceString && (
            <Tooltip title={new Date(data.timestamp).toString()}>
              <s.TimeDistance>{timeDistanceString}</s.TimeDistance>
            </Tooltip>
          )}
        </s.Header>
      }
      content={
        <s.ContentContainer>
          {!data.isRead && (
            <s.BadgeContainer>
              <Badge customStyles={badgeStyles} />
            </s.BadgeContainer>
          )}
          {data.message}
          <Tooltip title={linkName}>
            <s.Link onClick={handleLinkClick}>{linkName}</s.Link>
          </Tooltip>
        </s.ContentContainer>
      }
    />
  );
};
