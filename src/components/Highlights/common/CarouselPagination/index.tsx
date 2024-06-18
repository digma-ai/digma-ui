import { trackingEvents as globalTrackingEvents } from "../../../../trackingEvents";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { addPrefix } from "../../../../utils/addPrefix";
import { ChevronIcon } from "../../../common/icons/16px/ChevronIcon";
import { Direction } from "../../../common/icons/types";
import * as s from "./styles";
import { CarouselPaginationProps } from "./types";

export const CarouselPagination = ({
  itemsCount,
  pageSize,
  page,
  onPageChange,
  trackingEventPrefix = ""
}: CarouselPaginationProps) => {
  const prefixedGlobalTrackingEvents = addPrefix(
    trackingEventPrefix,
    globalTrackingEvents,
    ""
  );
  const pageCount = Math.ceil(itemsCount / pageSize);

  const isPrevDisabled = page === 0;
  const isNextDisabled = page === pageCount - 1;

  const handleButtonClick = (page: number) => {
    sendUserActionTrackingEvent(
      prefixedGlobalTrackingEvents.CAROUSEL_NAVIGATION_BUTTON_CLICKED
    );
    onPageChange(page);
  };

  const handlePageCircleClick = (page: number) => {
    sendUserActionTrackingEvent(
      prefixedGlobalTrackingEvents.CAROUSEL_PAGE_BUTTON_CLICKED
    );
    onPageChange(page);
  };

  return (
    <>
      {pageCount > 1 && (
        <s.Container>
          <s.Button
            disabled={isPrevDisabled}
            onClick={() => handleButtonClick(page - 1)}
          >
            <ChevronIcon
              direction={Direction.LEFT}
              color={"currentColor"}
              size={16}
            />
          </s.Button>
          <s.PageButtonsContainer>
            {Array(pageCount)
              .fill(null)
              .map((_, i) => (
                <s.PageButton
                  key={i}
                  $isActive={page === i}
                  onClick={() => handlePageCircleClick(i)}
                />
              ))}
          </s.PageButtonsContainer>
          <s.Button
            disabled={isNextDisabled}
            onClick={() => handleButtonClick(page + 1)}
          >
            <ChevronIcon
              direction={Direction.RIGHT}
              color={"currentColor"}
              size={16}
            />
          </s.Button>
        </s.Container>
      )}
    </>
  );
};
