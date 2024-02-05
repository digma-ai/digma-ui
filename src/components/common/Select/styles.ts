import styled from "styled-components";
import { grayScale, primaryScale } from "../App/getTheme";
import {
  ButtonProps,
  ChevronIconContainerProps,
  OptionListItemProps
} from "./types";

export const Button = styled.button<ButtonProps>`
  border: 1px solid
    ${({ theme, $isActive }) =>
      $isActive ? theme.colors.stroke.brand : theme.colors.stroke.primary};
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return grayScale[50];
      case "dark":
      case "dark-jetbrains":
        return grayScale[1000];
    }
  }};
  border-radius: 4px;
  padding: 4px 8px;
  display: flex;
  gap: 6px;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
  font-size: 14px;
  color: ${({ theme, $isActive }) =>
    $isActive ? primaryScale[100] : theme.colors.select.menu.text.primary};

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.stroke.secondary};
  }

  &:focus,
  &:active {
    border: 1px solid ${({ theme }) => theme.colors.stroke.brand};
  }

  &:disabled,
  &:disabled:hover,
  &:disabled:focus,
  &:disabled:active {
    border: 1px solid ${({ theme }) => theme.colors.stroke.primary};
    color: ${({ theme }) => theme.colors.text.disabledAlt};
  }
`;

export const ButtonLabel = styled.span`
  margin-right: auto;
  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const Number = styled.span`
  width: 16px;
  height: 16px;
  font-weight: 500;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${grayScale[0]};
  background: #4b4db4;
  margin-left: auto;
`;

export const Counts = styled.span`
  color: ${grayScale[300]};
`;

export const FilteredCount = styled.span`
  color: ${primaryScale[200]};
`;

export const ChevronIconContainer = styled.span<ChevronIconContainerProps>`
  display: flex;
  color: ${({ theme, $disabled }) =>
    $disabled ? theme.colors.icon.disabledAlt : theme.colors.icon.primary};
`;

export const MenuContainer = styled.div`
  padding: 4px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.stroke.primary};
  box-shadow: 0 2px 4px 0 rgba(0 0 0 / 2%);
  gap: 4px;
  display: flex;
  flex-direction: column;
  max-height: 162px;
  box-sizing: border-box;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return grayScale[50];
      case "dark":
      case "dark-jetbrains":
        return grayScale[1000];
    }
  }};
`;

export const SearchInputContainer = styled.div`
  border-radius: 4px;
  border: 1px solid ${grayScale[700]};
  padding: 5px 8px;
  gap: 4px;
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-size: 14px;
  padding: 0;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return grayScale[1000];
      case "dark":
      case "dark-jetbrains":
        return grayScale[0];
    }
  }};

  &::placeholder {
    color: ${grayScale[500]};
  }
`;

export const SearchInputIconContainer = styled.div`
  pointer-events: none;
  color: ${grayScale[400]};
`;

export const OptionList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0;
  margin: 0;
  font-size: 14px;
  overflow: hidden;
  overflow-y: auto;
`;

export const OptionListItem = styled.li<OptionListItemProps>`
  display: flex;
  padding: 4px 8px;
  align-items: center;
  gap: 6px;
  align-self: stretch;
  cursor: ${({ $enabled }) => ($enabled ? "pointer" : "default")};
  color: ${({ theme, $selected, $enabled }) => {
    if (!$enabled) {
      switch (theme.mode) {
        case "light":
          return "#dadada";
        case "dark":
        case "dark-jetbrains":
          return "#49494d";
      }
    }
    if ($selected) {
      return primaryScale[100];
    }
    return theme.colors.select.menu.text.primary;
  }};
`;

export const OptionListItemLabel = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const NoResultsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.subtext};
`;
