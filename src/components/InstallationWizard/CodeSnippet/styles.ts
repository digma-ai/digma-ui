import styled from "styled-components";
import { getCodeFont } from "../../common/App/styles";
import { ContainerProps } from "./types";

export const Container = styled.div<ContainerProps>`
  background: #252526;
  padding: 4px 4px 4px 8px;
  border-radius: 4px;
  display: flex;
  gap: 27px;
  align-items: flex-start;
  justify-content: space-between;

  ${({ disabled }) => (disabled ? "opacity: 0.5;" : "")}
`;

export const Code = styled.code`
  ${({ theme }) => getCodeFont(theme.codeFont)}
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: -0.1px;
  color: #dadada;
  white-space: pre-wrap;
`;

export const CopyButton = styled.button`
  padding: 0;
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  background: #2e2e2e;
  border: 1px solid #383838;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
`;
