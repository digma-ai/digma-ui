import { Link } from "../../common/Link";
import { EmptyState } from "../EmptyState";
import { ErrorEmptyState } from "../ErrorEmptyState";
import { Header } from "../Header";
import { NotificationList } from "../NotificationList";
import * as s from "./styles";
import { RecentViewProps } from "./types";

export const RecentView = (props: RecentViewProps) => {
  const handleClose = () => {
    props.onClose();
  };

  const handleGoToSpan = (spanCodeObjectId: string) => {
    props.onSpanLinkClick(spanCodeObjectId);
  };

  const handleViewAllLinkClick = () => {
    props.onGoToNotifications();
  };

  const notificationsCount = props.data?.notifications.length || 0;

  const renderEmptyState = () =>
    props.error ? (
      <ErrorEmptyState />
    ) : (
      <EmptyState title={"No unread notifications"} />
    );

  return (
    <s.Container>
      <Header onClose={handleClose} />
      {props.data && notificationsCount ? (
        <s.ContentContainer>
          <s.Subtitle>
            Top {notificationsCount} Unread Notification
            {notificationsCount > 1 ? "s" : ""}
          </s.Subtitle>
          <NotificationList
            notifications={props.data.notifications}
            onGoToSpan={handleGoToSpan}
          />
        </s.ContentContainer>
      ) : (
        renderEmptyState()
      )}
      <s.Footer>
        <Link onClick={handleViewAllLinkClick}>View All</Link>
      </s.Footer>
    </s.Container>
  );
};
