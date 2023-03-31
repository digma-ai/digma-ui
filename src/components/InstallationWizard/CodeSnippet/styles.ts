import styled from "styled-components";
import { getCodeFont } from "../../common/App/styles";
import { ContainerProps } from "./types";

export const Container = styled.div<ContainerProps>`
  background: #0c0b0b;
  padding: 8px 12px;
  border-radius: 2px;
  margin: 8px 0 12px;
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
  background: transparent;
  border: none;
  cursor: pointer;
`;
