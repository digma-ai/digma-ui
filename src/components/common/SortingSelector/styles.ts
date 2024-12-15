import styled from "styled-components";
import type {
  SortingMenuButtonProps,
  SortingOrderIconContainerProps,
  SortingOrderOptionProps
} from "./types";
import { SORTING_ORDER } from "./types";

export const PopoverContainer = styled.div`
  margin-left: auto;
  display: flex;
  gap: 8px;
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

export const SortingMenuButton = styled.button<SortingMenuButtonProps>`
  background: none;
  cursor: pointer;
  display: flex;
  gap: 4px;
  font-weight: 500;
  font-size: 14px;
  text-wrap: nowrap;
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
