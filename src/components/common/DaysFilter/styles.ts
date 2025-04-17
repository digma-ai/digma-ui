import styled, { css } from "styled-components";
import { Popup } from "../../Navigation/common/Popup";
import {
  bodyRegularTypography,
  footnoteRegularTypography
} from "../App/typographies";
import { NewButton } from "../v3/NewButton";
import { TextField } from "../v3/TextField";
import type { CounterInputProps, DaysButtonProps } from "./types";

export const ButtonIconContainer = styled.div`
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
`;

export const DateButton = styled(NewButton)<DaysButtonProps>`
  border: 1px solid
    ${({ theme, $isActive }) => {
      if ($isActive) {
        return theme.colors.v3.surface.brandPrimary;
      }

      return theme.colors.v3.stroke.dark;
    }};
  background: ${({ theme, $isActive }) => {
    if ($isActive) {
      return theme.colors.v3.surface.brandDark;
    }

    return theme.colors.v3.surface.primary;
  }};
  white-space: nowrap;
`;

export const DatePopup = styled(Popup)`
  min-width: 164px;
  display: flex;
`;

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CustomCounterContainer = styled.div`
  flex-direction: column;
  display: flex;
  gap: 8px;
  margin: 0 -8px -8px;
  padding: 8px;
  background: ${({ theme }) => theme.colors.v3.surface.highlight};
`;

export const Counter = styled.div`
  ${bodyRegularTypography}
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const CounterInput = styled(TextField)<CounterInputProps>`
  ${footnoteRegularTypography}
  padding: 4px;
  ${({ theme, $isActive }) =>
    $isActive
      ? css`
          color: ${theme.colors.v3.text.link};
          border: 1px solid ${theme.colors.v3.surface.brandPrimary};
        `
      : undefined};

  input {
    max-width: 16px;
    text-align: center;

    ${({ theme, $isActive }) =>
      $isActive
        ? css`
            color: ${theme.colors.v3.text.link};
          `
        : undefined};
  }
`;

export const ApplyButton = styled(NewButton)`
  width: 100%;
  justify-content: center;
`;

export const Text = styled.span`
  padding-right: 5px;
`;
