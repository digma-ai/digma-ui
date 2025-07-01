import styled from "styled-components";
import { getCodeFont } from "../../../../common/App/styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-grow: 1;
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
