import styled from "styled-components";
import type { ToggleOptionButtonProps } from "./types";

export const Container = styled.div`
  display: flex;
  border-radius: 4px;
  padding: 4px;
  gap: 4px;
  border: 1px solid ${({ theme }) => theme.colors.toggle.border};
  background: ${({ theme }) => theme.colors.toggle.background};
`;

export const ToggleOptionButton = styled.button<ToggleOptionButtonProps>`
  display: flex;
  border: none;
  outline: none;
  padding: 2px;
  border-radius: 2px;
  cursor: pointer;
  background: ${({ theme, $selected }) =>
    $selected
      ? theme.colors.toggle.option.selected.background
      : theme.colors.toggle.option.default.background};
  color: ${({ theme, $selected }) =>
    $selected
      ? theme.colors.toggle.option.selected.icon
      : theme.colors.toggle.option.default.icon};
`;
