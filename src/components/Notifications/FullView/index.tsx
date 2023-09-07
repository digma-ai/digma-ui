import { useEffect } from "react";
import { CircleLoader } from "../../common/CircleLoader";
import { Pagination } from "../../common/Pagination";
import { Toggle } from "../../common/Toggle";
import { ToggleValue } from "../../common/Toggle/types";
import { EmptyState } from "../EmptyState";
import { ErrorEmptyState } from "../ErrorEmptyState";
import { Header } from "../Header";
import { NotificationList } from "../NotificationList";
import { GoToInsightsPayload } from "../types";
import * as s from "./styles";
import { FullViewProps } from "./types";

export const FullView = (props: FullViewProps) => {
  const handleClose = () => {
    props.onClose();
  };

  const handleToggleValueChange = (value: ToggleValue) => {
    props.onFilterChange(value === "all");
  };

  const handleGoToInsights = (codeObjectData: GoToInsightsPayload) => {
    props.onLinkClick(codeObjectData);
  };

  const totalCount =
    (props.showAll ? props.data?.totalCount : props.data?.unreadCount) || 0;
  const pageStartItemNumber = props.page * props.pageSize + 1;
  const pageEndItemNumber = Math.min(
    pageStartItemNumber + props.pageSize - 1,
    totalCount
  );

  useEffect(() => {
    if (props.data) {
      const pageCount = Math.ceil(totalCount / props.pageSize) || 1;
      if (props.page >= pageCount) {
        props.onPageChange(pageCount - 1);
      }
    }
  }, [props.data, props.page, props.pageSize, props.onPageChange, totalCount]);

  const renderEmptyState = () => {
    if (props.isLoading) {
      return (
        <s.CircleLoaderContainer>
          <CircleLoader size={32} />
        </s.CircleLoaderContainer>
      );
    }

    props.error ? (
      <ErrorEmptyState />
    ) : (
      <EmptyState
        title={props.showAll ? "No notifications" : "No unread notifications"}
      />
    );
  };

  return (
    <s.Container>
      <Header onClose={handleClose} />
      <Toggle
        options={[
          {
            label: `Unread (${props.data?.unreadCount || 0})`,
            value: "unread"
          },
          { label: `All (${props.data?.totalCount || 0})`, value: "all" }
        ]}
        value={props.showAll ? "all" : "unread"}
        onValueChange={handleToggleValueChange}
      />
      {props.data && totalCount > 0 ? (
        <>
          <NotificationList
            notifications={props.data.notifications}
            onGoToInsights={handleGoToInsights}
          />
          <s.Footer>
            <s.ItemsCount>
              Showing{" "}
              <s.PageItemsCount>
                {pageStartItemNumber} - {pageEndItemNumber}
              </s.PageItemsCount>{" "}
              of {totalCount}
            </s.ItemsCount>
            <Pagination
              itemsCount={totalCount}
              onPageChange={props.onPageChange}
              page={props.page}
              pageSize={props.pageSize}
              extendedNavigation={true}
            />
          </s.Footer>
        </>
      ) : (
        renderEmptyState()
      )}
    </s.Container>
  );
};
