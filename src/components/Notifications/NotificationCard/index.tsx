import { DefaultTheme, useTheme } from "styled-components";
import { getInsightTypeInfo } from "../../../utils/getInsightTypeInfo";
import { timeAgo } from "../../../utils/timeAgo";
import { InsightScope } from "../../Insights/types";
import { Badge } from "../../common/Badge";
import { Tooltip } from "../../common/Tooltip";
import { GoToInsightsPayload, InsightNotificationData } from "../types";
import * as s from "./styles";
import { NotificationCardProps } from "./types";

const getIconColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#494b57";
    case "dark":
    case "dark-jetbrains":
      return "#dfe1e5";
  }
};

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

const getCodeObjectData = (
  data: InsightNotificationData
): GoToInsightsPayload => {
  const codeObjectData: GoToInsightsPayload = {};

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

export const NotificationCard = (props: NotificationCardProps) => {
  const theme = useTheme();
  const iconColor = getIconColor(theme);
  const badgeStyles = getBadgeStyles(theme);

  const handleLinkClick = () => {
    const codeObjectData = getCodeObjectData(props.data.data);
    props.onLinkClick(codeObjectData);
  };

  const Icon =
    props.data.type === "NewInsight" &&
    getInsightTypeInfo(props.data.data.insightType)?.icon;

  const title = props.data.title;
  const linkName = getLinkName(props.data.data);
  const timeDistance = timeAgo(props.data.timestamp);

  return (
    <s.Card
      header={
        <s.Header>
          {Icon && (
            <s.IconContainer>
              <Icon color={iconColor} size={16} />
            </s.IconContainer>
          )}
          <Tooltip title={title}>
            <s.Title>{title}</s.Title>
          </Tooltip>
          {timeDistance && (
            <Tooltip title={new Date(props.data.timestamp).toString()}>
              <s.TimeDistance>
                {timeDistance.value} {timeDistance.unit} ago
              </s.TimeDistance>
            </Tooltip>
          )}
        </s.Header>
      }
      content={
        <s.ContentContainer>
          {!props.data.isRead && (
            <s.BadgeContainer>
              <Badge customStyles={badgeStyles} />
            </s.BadgeContainer>
          )}
          {props.data.message}
          <Tooltip title={linkName}>
            <s.Link onClick={handleLinkClick}>{linkName}</s.Link>
          </Tooltip>
        </s.ContentContainer>
      }
    />
  );
};
