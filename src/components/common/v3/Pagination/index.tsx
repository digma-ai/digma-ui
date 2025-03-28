import { trackingEvents as globalTrackingEvents } from "../../../../trackingEvents";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { addPrefix } from "../../../../utils/addPrefix";
import { formatUnit } from "../../../../utils/formatUnit";
import { ChevronIcon } from "../../icons/12px/ChevronIcon";
import { DoubleChevronIcon } from "../../icons/DoubleChevronIcon";
import { Direction } from "../../icons/types";
import * as s from "./styles";
import type { PaginationProps } from "./types";

export const Pagination = ({
  itemsCount,
  pageSize,
  page,
  onPageChange,
  extendedNavigation,
  withDescription,
  trackingEventPrefix = "",
  children
}: PaginationProps) => {
  const prefixedGlobalTrackingEvents = addPrefix(
    trackingEventPrefix,
    globalTrackingEvents,
    ""
  );
  const pageCount = Math.ceil(itemsCount / pageSize);

  const isPrevDisabled = page === 0;
  const isNextDisabled = page === pageCount - 1;

  const handleButtonClick = (page: number) => () => {
    sendUserActionTrackingEvent(
      prefixedGlobalTrackingEvents.PAGINATION_BUTTON_CLICKED
    );
    onPageChange(page);
  };

  const pageStartItemNumber = page * pageSize + 1;
  const pageEndItemNumber = Math.min(
    pageStartItemNumber + pageSize - 1,
    itemsCount
  );

  return (
    <>
      {(pageCount > 1 || extendedNavigation) && (
        <s.Container>
          {withDescription && (
            <s.DescriptionContainer>
              <s.Description>
                Showing {pageStartItemNumber} - {pageEndItemNumber} of{" "}
                {itemsCount} {formatUnit(itemsCount, "Result")}
              </s.Description>
              {children}
            </s.DescriptionContainer>
          )}
          <s.ButtonGroup>
            {extendedNavigation && (
              <s.Button
                disabled={isPrevDisabled}
                onClick={handleButtonClick(0)}
              >
                <DoubleChevronIcon
                  direction={Direction.Left}
                  color={"currentColor"}
                  size={14}
                />
              </s.Button>
            )}
            <s.Button
              disabled={isPrevDisabled}
              onClick={handleButtonClick(page - 1)}
            >
              <ChevronIcon
                direction={Direction.Left}
                color={"currentColor"}
                size={14}
              />
            </s.Button>
          </s.ButtonGroup>
          <s.PageCounter>
            <s.CurrentPage>{page + 1}</s.CurrentPage> / {pageCount}
          </s.PageCounter>
          <s.ButtonGroup>
            <s.Button
              disabled={isNextDisabled}
              onClick={handleButtonClick(page + 1)}
            >
              <ChevronIcon
                direction={Direction.Right}
                color={"currentColor"}
                size={14}
              />
            </s.Button>
            {extendedNavigation && (
              <s.Button
                disabled={isNextDisabled}
                onClick={handleButtonClick(pageCount - 1)}
              >
                <DoubleChevronIcon
                  direction={Direction.Right}
                  color={"currentColor"}
                  size={14}
                />
              </s.Button>
            )}
          </s.ButtonGroup>
        </s.Container>
      )}
    </>
  );
};
