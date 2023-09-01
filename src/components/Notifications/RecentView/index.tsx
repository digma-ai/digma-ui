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

  return (
    <s.Container>
      <Header onClose={handleClose} />
      {props.data?.notifications.length ? (
        <s.ContentContainer>
          <s.Subtitle>Top 3 Unread Notifications</s.Subtitle>
          <s.NotificationsContainer>
            {props.data.notifications.map((x) => (
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
