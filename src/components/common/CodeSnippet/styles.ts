import styled from "styled-components";
import { getCodeFont } from "../App/styles";
import { FloatingIconButton } from "../FloatingIconButton";

export const Container = styled.div`
  padding: 4px 4px 4px 8px;
  border-radius: 4px;
  display: flex;
  gap: 27px;
  align-items: flex-start;
  justify-content: space-between;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#e9eef4";
      case "dark":
      case "dark-jetbrains":
        return "#252526";
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
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#dadada";
    }
  }};
`;

export const CopyButton = styled(FloatingIconButton)`
  padding: 3px;
`;