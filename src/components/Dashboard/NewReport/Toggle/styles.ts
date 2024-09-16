import styled from "styled-components";

import { subscriptRegularTypography } from "../../../common/App/typographies";
import { OptionButtonProps } from "./types";

export const Container = styled.div`
  display: flex;
  border-radius: 8px;
  height: 36px;
  width: fit-content;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.dark};
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
`;

export const OptionButton = styled.button<OptionButtonProps>`
  ${subscriptRegularTypography}

  display: flex;
  font-family: inherit;
  border: none;
  outline: none;
  cursor: pointer;
  user-select: none;
  border-radius: 8px;
  align-items: center;
  padding: 0 16px;
  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.v3.text.primary : theme.colors.v3.text.secondary};
  background: ${({ theme, $selected }) =>
    $selected ? theme.colors.v3.surface.brandPrimary : "transparent"};

  &:first-child {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }

  &:last-child {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
`;
