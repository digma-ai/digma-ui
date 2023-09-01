import { DefaultTheme, useTheme } from "styled-components";
import { getInsightTypeInfo } from "../../../utils/getInsightTypeInfo";
import { timeAgo } from "../../../utils/timeAgo";
import { Badge } from "../../common/Badge";
import { Tooltip } from "../../common/Tooltip";
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

export const NotificationCard = (props: NotificationCardProps) => {
  const theme = useTheme();
  const iconColor = getIconColor(theme);
  const badgeStyles = getBadgeStyles(theme);

  const handleLinkClick = () => {
    props.onSpanLinkClick(props.data.data.codeObject.codeObjectId);
  };

  const insightTypeInfo =
    props.data.type === "insight" &&
    getInsightTypeInfo(props.data.data.insightType);

  const title = props.data.title;
  const spanName = props.data.data.codeObject.displayName;
  const timeDistance = timeAgo(props.data.timestamp);

  return (
    <s.Card
      header={
        <s.Header>
          <s.IconContainer>
            {insightTypeInfo && (
              <insightTypeInfo.icon color={iconColor} size={16} />
            )}
          </s.IconContainer>
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
          <Tooltip title={spanName}>
            <s.SpanLink onClick={handleLinkClick}>{spanName}</s.SpanLink>
          </Tooltip>
        </s.ContentContainer>
      }
    />
  );
};
