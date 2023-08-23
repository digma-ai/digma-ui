import { ReactNode, useEffect, useState } from "react";
import { DefaultTheme, useTheme } from "styled-components";
import { usePrevious } from "../../../hooks/usePrevious";
import { ChevronIcon } from "../../common/icons/ChevronIcon";
import { Direction } from "../../common/icons/types";
import * as s from "./styles";
import { PaginationProps } from "./types";

const DEFAULT_PAGE_SIZE = 3;

const calculatePageCount = (children: ReactNode[], pageSize: number) =>
  Math.ceil(children.length / pageSize);

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
      return "#7891d0";
    case "dark":
    case "dark-jetbrains":
      return "#dfe1e5";
  }
};

export const Pagination = (props: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = props.pageSize || DEFAULT_PAGE_SIZE;
  const [pageCount, setPageCount] = useState(
    calculatePageCount(props.children, pageSize)
  );
  const previousChildren = usePrevious(props.children);
  const previousId = usePrevious(props.id);
  const theme = useTheme();

  useEffect(() => {
    if (previousId && previousId !== props.id) {
      setCurrentPage(0);
    }
  }, [previousId, props.id]);

  useEffect(() => {
    if (
      previousId === props.id &&
      previousChildren &&
      previousChildren.length < props.children.length
    ) {
      const newPageCount = calculatePageCount(props.children, pageSize);
      setCurrentPage(newPageCount - 1);
      setPageCount(newPageCount);
    }
  }, [
    previousId,
    props.id,
    previousChildren,
    props.children,
    pageSize,
    currentPage
  ]);

  if (pageCount === 1) {
    return <>{props.children}</>;
  }

  const pageStart = currentPage * pageSize;
  const pageEnd = pageStart + pageSize;

  const listItemElements = props.children.slice(pageStart, pageEnd);

  const isPrevDisabled = currentPage === 0;
  const isNextDisabled = currentPage === pageCount - 1;

  const handleButtonClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {listItemElements}
      {pageCount > 1 && (
        <s.Container>
          <s.ButtonsContainer>
            <s.Button
              disabled={isPrevDisabled}
              onClick={() => handleButtonClick(currentPage - 1)}
            >
              <ChevronIcon
                direction={Direction.LEFT}
                color={getPaginationButtonIconColor(theme, isPrevDisabled)}
                size={14}
              />
            </s.Button>
            <s.Button
              disabled={isNextDisabled}
              onClick={() => handleButtonClick(currentPage + 1)}
            >
              <ChevronIcon
                direction={Direction.RIGHT}
                color={getPaginationButtonIconColor(theme, isNextDisabled)}
                size={14}
              />
            </s.Button>
          </s.ButtonsContainer>
          <span>
            <s.CurrentPage>{currentPage + 1}</s.CurrentPage> of {pageCount}
          </span>
        </s.Container>
      )}
    </>
  );
};
