import styled from "styled-components";
import { getCodeFont } from "../../common/App/styles";
import { ContainerProps } from "./types";

export const Container = styled.div<ContainerProps>`
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

  ${({ disabled }) => (disabled ? "opacity: 0.5;" : "")}
`;

// postcss-styled-components-disable-next-line
export const Code = styled.code`
  ${({ theme }) => getCodeFont(theme.codeFont)}

  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: -0.1px;
  white-space: pre-wrap;

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

  border-radius: 4px;

  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#f1f5fa";
      case "dark":
      case "dark-jetbrains":
        return "#2e2e2e";
    }
  }};

  border: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "0.9px solid #fbfdff";
      case "dark":
      case "dark-jetbrains":
        return "1px solid #383838";
    }
  }};

  box-shadow: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "0.9px 0.9px 2.7px rgba(0, 0, 0, 0.15)";
      case "dark":
      case "dark-jetbrains":
        return "1px 1px 4px rgba(0, 0, 0, 0.25)";
    }
  }};
`;
