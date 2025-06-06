import styled from "styled-components";
import { getCodeFont } from "../../../common/App/styles";
import { subscriptRegularTypography } from "../../../common/App/typographies";
import { ToggleSwitch } from "../../../common/v3/ToggleSwitch";
import type { ToolTagDeleteButtonProps, ToolTagProps } from "./types";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 635px;
  height: 615px;
  padding: 12px;
  gap: 16px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.v3.text.primary};
  ${/* TODO: change to typography from the theme*/ ""}
  font-size: 14px;
  font-weight: 600;
  width: 100%;
`;

export const ToolsEditor = styled.div`
  display: flex;
  padding: 24px;
  flex-direction: column;
  gap: 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.dark};
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
`;

export const ToolsEditorToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: ${({ theme }) => theme.colors.v3.text.primary};
  font-size: 14px;
  font-weight: 600;
`;

export const SearchInputContainer = styled.div`
  position: relative;
  display: flex;
  flex-grow: 1;
  height: 30px;
`;

export const SearchInput = styled.input`
  ${subscriptRegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.primary};
  height: 100%;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.dark};
  background: ${({ theme }) => theme.colors.v3.surface.primary};
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 13%);
  border-radius: 4px;
  box-sizing: border-box;
  padding: 6px 8px 6px 24px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.v3.text.primary};
  }
`;

export const SearchInputIconContainer = styled.div`
  position: absolute;
  left: 8px;
  top: 8px;
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
`;

export const SelectAllToggleSwitch = styled(ToggleSwitch)`
  ${subscriptRegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;

export const ToolsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const ToolTag = styled.div<ToolTagProps>`
  ${subscriptRegularTypography}
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 8px;
  gap: 4px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.dark};
  color: ${({ theme }) => theme.colors.v3.text.primary};
  background: ${({ theme, $isHighlighted }) =>
    $isHighlighted
      ? theme.colors.v3.surface.brandTertiary
      : theme.colors.v3.surface.primary};
  box-shadow: ${({ $isHighlighted }) =>
    $isHighlighted ? "none" : "0 2px 4px 0 rgb(0 0 0 / 13%)"};
  user-select: none;
`;

export const ToolTagDeleteButton = styled.button<ToolTagDeleteButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  color: ${({ theme, $isHighlighted }) =>
    $isHighlighted
      ? theme.colors.v3.icon.primary
      : theme.colors.v3.stroke.primary};
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
  background: none;
  border: none;
  cursor: pointer;
`;

export const TextArea = styled.textarea`
  ${({ theme }) => getCodeFont(theme.codeFont)}
  display: flex;
  flex-grow: 1;
  padding: 24px;
  flex-direction: column;
  gap: 10px;
  border-radius: 8px;
  ${/* TODO: change to color from the theme */ ""}
  background: #000;
  overflow: auto;
  ${/* TODO: change to color from the theme */ ""}
  color: #fff;
  ${/* TODO: change to typography from the theme */ ""}
  font-size: 14px;
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.v3.text.secondary};
  }
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-end;
`;
