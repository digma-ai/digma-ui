import styled from "styled-components";
import { getCodeFont } from "../App/styles";

export const Container = styled.div`
  padding: 6px 8px;
  border-radius: 4px;
  display: flex;
  gap: 8px;
  align-items: flex-start;
  justify-content: space-between;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#f7f8fa";
      case "dark":
      case "dark-jetbrains":
        return "#2b2d30";
    }
  }};
`;

export const Code = styled.code`
  ${({ theme }) => getCodeFont(theme.codeFont)}

  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.1px;
  white-space: pre-wrap;
  word-break: break-word;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#494b57";
      case "dark":
      case "dark-jetbrains":
        return "#dfe1e5";
    }
  }};
`;
