import styled from "styled-components";
import { getCodeFont } from "../../../common/App/styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 635px;
  height: 420px;
  padding: 12px;
  gap: 16px;
  border-radius: 4px;
  background: ${(props) => props.theme.colors.v3.surface.primary};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.v3.text.primary};
  ${/* TODO: change to typography from the theme*/ ""}
  font-size: 14px;
  font-weight: 600;
  width: 100%;
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.v3.text.secondary};
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
  font-weight: 500;
  resize: none;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-end;
`;
