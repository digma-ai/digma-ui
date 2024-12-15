import { NotificationCard } from "../NotificationCard";
import type { CodeObjectData } from "../types";
import * as s from "./styles";
import type { NotificationListProps } from "./types";

export const NotificationList = ({
  notifications,
  onLinkClick
}: NotificationListProps) => {
  const handleLinkClick = (codeObjectData: CodeObjectData) => {
    onLinkClick(codeObjectData);
  };

  return (
    <s.Container>
      {notifications.map((x) => (
        <NotificationCard
          key={x.notificationId}
          data={x}
          onLinkClick={handleLinkClick}
        />
      ))}
    </s.Container>
  );
};
