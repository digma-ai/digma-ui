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

export const Pagination = (props: PaginationProps) => {
  const theme = useTheme();

  const pageCount = Math.ceil(props.itemsCount / props.pageSize);

  const isPrevDisabled = props.page === 0;
  const isNextDisabled = props.page === pageCount - 1;

  const handleButtonClick = (page: number) => {
    props.onPageChange(page);
  };

  useLayoutEffect(() => {
    if (props.page >= pageCount) {
      props.onPageChange(pageCount - 1);
    }
  }, [props.page, pageCount]);

  return (
    <>
      {(pageCount > 1 || props.extendedNavigation) && (
        <s.Container>
          <s.ButtonGroup>
            {props.extendedNavigation && (
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
              onClick={() => handleButtonClick(props.page - 1)}
            >
              <ChevronIcon
                direction={Direction.LEFT}
                color={getPaginationButtonIconColor(theme, isPrevDisabled)}
                size={14}
              />
            </s.Button>
          </s.ButtonGroup>
          <s.PageCounter>
            <s.CurrentPage>{props.page + 1}</s.CurrentPage> / {pageCount}
          </s.PageCounter>
          <s.ButtonGroup>
            <s.Button
              disabled={isNextDisabled}
              onClick={() => handleButtonClick(props.page + 1)}
            >
              <ChevronIcon
                direction={Direction.RIGHT}
                color={getPaginationButtonIconColor(theme, isNextDisabled)}
                size={14}
              />
            </s.Button>
            {props.extendedNavigation && (
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
