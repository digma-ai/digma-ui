import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px 8px 0;
  text-align: center;
`;

export const Title = styled.span`
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
  text-transform: capitalize;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#788ca9";
      case "dark":
      case "dark-jetbrains":
        return "#dadada";
    }
  }};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};
`;

export const ErrorMessage = styled.span`
  word-break: break-word;
  max-width: 300px;
  white-space: pre-line;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#e00036";
      case "dark":
      case "dark-jetbrains":
        return "#f93967";
    }
  }};
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  height: 75px;
`;

export const ButtonDivider = styled.div`
  height: 22px;
  width: 1px;
  margin: 4px;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#b9c0d4";
      case "dark":
      case "dark-jetbrains":
        return "#49494d";
    }
  }};
`;
