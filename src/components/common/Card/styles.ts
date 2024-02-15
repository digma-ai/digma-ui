import styled from "styled-components";

export const Container = styled.div`
  border-radius: 4px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#818594";
      case "dark":
      case "dark-jetbrains":
        return "#b4b8bf";
    }
  }};
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#ebecf0";
      case "dark":
      case "dark-jetbrains":
        return "#393b40";
    }
  }};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  gap: 8px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  font-weight: 500;
  font-size: 14px;
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

export const ButtonsContainer = styled.div`
  margin-top: auto;
  padding-top: 4px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;
