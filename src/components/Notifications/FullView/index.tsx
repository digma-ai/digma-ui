import { useEffect } from "react";
import { Pagination } from "../../common/Pagination";
import { Toggle } from "../../common/Toggle";
import type { ToggleValue } from "../../common/Toggle/types";
import { EmptyState } from "../EmptyState";
import { Header } from "../Header";
import { NotificationList } from "../NotificationList";
import type { CodeObjectData } from "../types";
import * as s from "./styles";
import type { FullViewProps } from "./types";

export const FullView = ({
  onClose,
  onFilterChange,
  onLinkClick,
  showAll,
  data,
  page,
  pageSize,
  onPageChange,
  isLoading,
  error
}: FullViewProps) => {
  const handleClose = () => {
    onClose();
  };

  const handleToggleValueChange = (value: ToggleValue) => {
    onFilterChange(value === "all");
  };

  const handleLinkClick = (codeObjectData: CodeObjectData) => {
    onLinkClick(codeObjectData);
  };

  const totalCount = (showAll ? data?.totalCount : data?.unreadCount) ?? 0;
  const pageStartItemNumber = page * pageSize + 1;
  const pageEndItemNumber = Math.min(
    pageStartItemNumber + pageSize - 1,
    totalCount
  );

  useEffect(() => {
    if (data) {
      const pageCount = Math.ceil(totalCount / pageSize) || 1;
      if (page >= pageCount) {
        onPageChange(pageCount - 1);
      }
    }
  }, [data, page, pageSize, onPageChange, totalCount]);

  const renderEmptyState = () => {
    if (isLoading) {
      return <EmptyState preset={"loading"} />;
    }

    return error ? (
      <EmptyState preset={"error"} />
    ) : (
      <EmptyState preset={showAll ? "noData" : "noUnreadData"} />
    );
  };

  return (
    <s.Container>
      <Header onClose={handleClose} />
      <Toggle
        options={[
          {
            label: `Unread (${data?.unreadCount ?? 0})`,
            value: "unread"
          },
          { label: `All (${data?.totalCount ?? 0})`, value: "all" }
        ]}
        value={showAll ? "all" : "unread"}
        onValueChange={handleToggleValueChange}
      />
      {data && totalCount > 0 ? (
        <>
          <NotificationList
            notifications={data.notifications}
            onLinkClick={handleLinkClick}
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
              onPageChange={onPageChange}
              page={page}
              pageSize={pageSize}
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
