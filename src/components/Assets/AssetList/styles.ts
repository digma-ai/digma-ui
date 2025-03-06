import styled from "styled-components";
import { SORTING_ORDER } from "../../../redux/services/types";
import { bodyRegularTypography } from "../../common/App/typographies";
import { Link } from "../../common/v3/Link";
import type {
  SortingMenuButtonProps,
  SortingOrderIconContainerProps,
  SortingOrderOptionProps
} from "./types";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

export const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 0 8px 8px;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  ${bodyRegularTypography}
`;

export const StyledLink = styled(Link)`
  ${bodyRegularTypography}
`;

export const PopoverContainer = styled.div`
  margin-left: auto;
`;

export const SortingMenuButton = styled.button<SortingMenuButtonProps>`
  background: none;
  cursor: pointer;
  display: flex;
  gap: 4px;
  font-weight: 500;
  font-size: 14px;
  align-items: center;
  border-radius: 4px;
  padding: 4px 8px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};
  border: 1px solid
    ${({ theme, $isOpen }) => {
      if ($isOpen) {
        switch (theme.mode) {
          case "light":
            return "#7891d0";
          case "dark":
          case "dark-jetbrains":
            return "#9b9b9b";
        }
      }

      switch (theme.mode) {
        case "light":
          return "#d0d6eb";
        case "dark":
        case "dark-jetbrains":
          return "#49494d";
      }
    }};

  &:hover,
  &:focus {
    outline: none;
    border: 1px solid
      ${({ theme }) => {
        switch (theme.mode) {
          case "light":
            return "#7891d0";
          case "dark":
          case "dark-jetbrains":
            return "#9b9b9b";
        }
      }};
  }
`;

export const SortingLabel = styled.span`
  font-weight: 500;
  font-size: 14px;
  text-transform: capitalize;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
      case "dark-jetbrains":
        return "#dadada";
    }
  }};
`;

export const SortingOrderToggle = styled.div`
  display: flex;
  border-radius: 4px;
  padding: 4px;
  gap: 4px;
  border: 1px solid
    ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#b9c0d4";
        case "dark":
        case "dark-jetbrains":
          return "#49494d";
      }
    }};
`;

export const SortingOrderToggleOptionButton = styled.button<SortingOrderOptionProps>`
  border: none;
  outline: none;
  padding: 0 1px;
  border-radius: 2px;
  cursor: pointer;
  background: ${({ $selected }) => ($selected ? "#3538cd" : "transparent")};
  color: ${({ theme, $selected }) => {
    if ($selected) {
      switch (theme.mode) {
        case "light":
          return "#f1f5fa";
        case "dark":
        case "dark-jetbrains":
          return "#dadada";
      }
    }
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#dadada";
    }
  }};
`;

export const SortingOrderIconContainer = styled.div<SortingOrderIconContainerProps>`
  display: flex;
  transform: scaleY(
    ${({ $sortingOrder }) => ($sortingOrder === SORTING_ORDER.DESC ? -1 : 1)}
  );
`;

export const List = styled.ul`
  padding: 0 9px 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  overflow: auto;
  height: 100%;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
  font-size: 14px;
`;

export const FooterItemsCount = styled.span`
  font-weight: 500;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#818594";
      case "dark":
      case "dark-jetbrains":
        return "#b4b8bf";
    }
  }};
`;

export const FooterPageItemsCount = styled.span`
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#494b57";
      case "dark":
      case "dark-jetbrains":
        return "#dfe1e5";
    }
  }};
`;

export const BreadCrumb = styled.div`
  display: flex;
  gap: 4px;
`;
