import { formatUnit } from "../../../utils/formatUnit";
import { CircleLoader } from "../../common/CircleLoader";
import { Link } from "../../common/Link";
import { EmptyState } from "../EmptyState";
import { ErrorEmptyState } from "../ErrorEmptyState";
import { Header } from "../Header";
import { NotificationList } from "../NotificationList";
import type { CodeObjectData } from "../types";
import * as s from "./styles";
import type { RecentViewProps } from "./types";

export const RecentView = ({
  onClose,
  onLinkClick,
  onGoToNotifications,
  data,
  isLoading,
  error
}: RecentViewProps) => {
  const handleClose = () => {
    onClose();
  };

  const handleLinkClick = (codeObjectData: CodeObjectData) => {
    onLinkClick(codeObjectData);
  };

  const handleViewAllLinkClick = () => {
    onGoToNotifications();
  };

  const notificationsCount = data?.notifications.length ?? 0;

  const renderEmptyState = () => {
    if (isLoading) {
      return (
        <s.CircleLoaderContainer>
          <CircleLoader size={32} />
        </s.CircleLoaderContainer>
      );
    }

    return error ? (
      <ErrorEmptyState />
    ) : (
      <EmptyState title={"No unread notifications"} />
    );
  };

  return (
    <s.Container>
      <Header onClose={handleClose} />
      {data && notificationsCount ? (
        <s.ContentContainer>
          <s.Subtitle>
            Top {notificationsCount} Unread{" "}
            {formatUnit(notificationsCount, "Notification")}
          </s.Subtitle>
          <NotificationList
            notifications={data.notifications}
            onLinkClick={handleLinkClick}
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
