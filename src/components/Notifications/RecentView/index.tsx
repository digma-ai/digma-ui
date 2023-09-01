import { Link } from "../../common/Link";
import { EmptyState } from "../EmptyState";
import { Header } from "../Header";
import { NotificationCard } from "../NotificationCard";
import * as s from "./styles";
import { RecentViewProps } from "./types";

export const RecentView = (props: RecentViewProps) => {
  const handleClose = () => {
    props.onClose();
  };

  const handleSpanLinkClick = (spanCodeObjectId: string) => {
    props.onSpanLinkClick(spanCodeObjectId);
  };

  const handleViewAllLinkClick = () => {
    props.onGoToNotifications();
  };

  const notificationsCount = props.data?.notifications.length || 0;

  return (
    <s.Container>
      <Header onClose={handleClose} />
      {notificationsCount ? (
        <s.ContentContainer>
          <s.Subtitle>
            Top {notificationsCount} Unread Notification
            {notificationsCount > 1 ? "s" : ""}
          </s.Subtitle>
          <s.NotificationsContainer>
            {props.data?.notifications.map((x) => (
              <NotificationCard
                key={x.notificationId}
                data={x}
                onSpanLinkClick={handleSpanLinkClick}
              />
            ))}
          </s.NotificationsContainer>
        </s.ContentContainer>
      ) : (
        <EmptyState title={"No unread notifications"} />
      )}
      <s.Footer>
        <Link onClick={handleViewAllLinkClick}>View All</Link>
      </s.Footer>
    </s.Container>
  );
};
