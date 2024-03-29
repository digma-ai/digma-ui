import { useLayoutEffect } from "react";
import { DefaultTheme, useTheme } from "styled-components";
import { ChevronIcon } from "../icons/ChevronIcon";
import { DoubleChevronIcon } from "../icons/DoubleChevronIcon";
import { Direction } from "../icons/types";
import * as s from "./styles";
import { PaginationProps } from "./types";

const getPaginationButtonIconColor = (
  theme: DefaultTheme,
  isDisabled: boolean
) => {
  if (isDisabled) {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#9da0a8";
    }
  }

  switch (theme.mode) {
    case "light":
      return "#494b57";
    case "dark":
    case "dark-jetbrains":
      return "#dfe1e5";
  }
};

export const Pagination = ({
  page,
  pageSize,
  itemsCount,
  onPageChange,
  extendedNavigation
}: PaginationProps) => {
  const theme = useTheme();

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
                  color={getPaginationButtonIconColor(theme, isPrevDisabled)}
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
                color={getPaginationButtonIconColor(theme, isPrevDisabled)}
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
                color={getPaginationButtonIconColor(theme, isNextDisabled)}
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
                  color={getPaginationButtonIconColor(theme, isNextDisabled)}
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
