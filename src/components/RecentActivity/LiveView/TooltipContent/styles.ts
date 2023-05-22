import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  padding: 8px;
  gap: 4px;

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
      case "dark-jetbrains":
        return "#7891d0";
    }
  }};

  border: 1px solid
    ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#d1d1d1";
        case "dark":
        case "dark-jetbrains":
          return "#323232";
      }
    }};

  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#fbfdff";
      case "dark":
      case "dark-jetbrains":
        return "#383838";
    }
  }};
`;
