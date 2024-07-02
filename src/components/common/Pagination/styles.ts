import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#818594";
      case "dark":
      case "dark-jetbrains":
        return "#b4b8bf";
    }
  }};
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 4px;
`;

export const Button = styled.button`
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#494b57";
      case "dark":
      case "dark-jetbrains":
        return "#dfe1e5";
    }
  }};

  &:disabled {
    cursor: initial;
    color: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#828797";
        case "dark":
        case "dark-jetbrains":
          return "#9da0a8";
      }
    }};
  }
`;

export const PageCounter = styled.span`
  flex-shrink: 0;
`;

export const CurrentPage = styled.span`
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
