import { NotificationCard } from "../NotificationCard";
import { GoToInsightsPayload } from "../types";
import * as s from "./styles";
import { NotificationListProps } from "./types";

export const NotificationList = (props: NotificationListProps) => {
  const handleLinkClick = (codeObjectData: GoToInsightsPayload) => {
    props.onGoToInsights(codeObjectData);
  };

  return (
    <s.Container>
      {props.notifications.map((x) => (
        <NotificationCard
          key={x.notificationId}
          data={x}
          onLinkClick={handleLinkClick}
        />
      ))}
    </s.Container>
  );
};
