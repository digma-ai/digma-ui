import styled from "styled-components";
import { footnoteRegularTypography } from "../../App/typographies";
import { OptionButtonProps } from "./types";

export const Container = styled.div`
  display: flex;
  border-radius: 4px;
  padding: 3px;
  gap: 4px;
  width: fit-content;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.tertiary};
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
`;

export const OptionButton = styled.button<OptionButtonProps>`
  ${footnoteRegularTypography}

  display: flex;
  font-family: inherit;
  border: none;
  outline: none;
  cursor: pointer;
  user-select: none;
  border-radius: ${({ $size }) => ($size === "small" ? "2px" : " 4px")};
  padding: ${({ $size }) => ($size === "small" ? "2px" : "2px 4px")};
  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.v3.text.white : theme.colors.v3.text.primary};
  background: ${({ theme, $selected }) =>
    $selected ? theme.colors.v3.surface.brandTertiary : "transparent"};
`;
