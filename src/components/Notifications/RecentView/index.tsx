import { CircleLoader } from "../../common/CircleLoader";
import { Link } from "../../common/Link";
import { EmptyState } from "../EmptyState";
import { ErrorEmptyState } from "../ErrorEmptyState";
import { Header } from "../Header";
import { NotificationList } from "../NotificationList";
import { GoToInsightsPayload } from "../types";
import * as s from "./styles";
import { RecentViewProps } from "./types";

export const RecentView = (props: RecentViewProps) => {
  const handleClose = () => {
    props.onClose();
  };

  const handleGoToInsights = (codeObjectData: GoToInsightsPayload) => {
    props.onLinkClick(codeObjectData);
  };

  const handleViewAllLinkClick = () => {
    props.onGoToNotifications();
  };

  const notificationsCount = props.data?.notifications.length || 0;

  const renderEmptyState = () => {
    if (props.isLoading) {
      return (
        <s.CircleLoaderContainer>
          <CircleLoader size={32} />
        </s.CircleLoaderContainer>
      );
    }

    return props.error ? (
      <ErrorEmptyState />
    ) : (
      <EmptyState title={"No unread notifications"} />
    );
  };

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
            onGoToInsights={handleGoToInsights}
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
