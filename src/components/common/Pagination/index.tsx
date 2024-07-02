import { useLayoutEffect } from "react";
import { ChevronIcon } from "../icons/ChevronIcon";
import { DoubleChevronIcon } from "../icons/DoubleChevronIcon";
import { Direction } from "../icons/types";
import * as s from "./styles";
import { PaginationProps } from "./types";

export const Pagination = ({
  page,
  pageSize,
  itemsCount,
  onPageChange,
  extendedNavigation
}: PaginationProps) => {
  const pageCount = Math.ceil(itemsCount / pageSize);

  const isPrevDisabled = page === 0 || pageCount === 0;
  const isNextDisabled = page === pageCount - 1 || pageCount === 0;

  const handleButtonClick = (page: number) => {
    onPageChange(page);
  };

  useLayoutEffect(() => {
    if (page > pageCount - 1) {
      onPageChange(Math.max(pageCount - 1, 0));
    }
  }, [page, pageCount, onPageChange]);

  return (
    <>
      {(pageCount > 1 || extendedNavigation) && (
        <s.Container>
          <s.ButtonGroup>
            {extendedNavigation && (
              <s.Button
                disabled={isPrevDisabled}
                onClick={() => handleButtonClick(0)}
              >
                <DoubleChevronIcon
                  direction={Direction.LEFT}
                  color={"currentColor"}
                  size={14}
                />
              </s.Button>
            )}
            <s.Button
              disabled={isPrevDisabled}
              onClick={() => handleButtonClick(page - 1)}
            >
              <ChevronIcon
                direction={Direction.LEFT}
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
              onClick={() => handleButtonClick(page + 1)}
            >
              <ChevronIcon
                direction={Direction.RIGHT}
                color={"currentColor"}
                size={14}
              />
            </s.Button>
            {extendedNavigation && (
              <s.Button
                disabled={isNextDisabled}
                onClick={() => handleButtonClick(pageCount - 1)}
              >
                <DoubleChevronIcon
                  direction={Direction.RIGHT}
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
