import { NotificationCard } from "../NotificationCard";
import * as s from "./styles";
import { NotificationListProps } from "./types";

export const NotificationList = (props: NotificationListProps) => {
  const handleSpanLinkClick = (spanCodeObjectId: string) => {
    props.onGoToSpan(spanCodeObjectId);
  };

  return (
    <s.Container>
      {props.notifications.map((x) => (
        <NotificationCard
          key={x.notificationId}
          data={x}
          onSpanLinkClick={handleSpanLinkClick}
        />
      ))}
    </s.Container>
  );
};
