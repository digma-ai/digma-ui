import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 8px;
`;

export const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 10px;
  line-height: normal;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#7891d0";
      case "dark":
      case "dark-jetbrains":
        return "#92affa";
    }
  }};

  &:disabled {
    cursor: default;
    color: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#828797";
        case "dark":
        case "dark-jetbrains":
          return "#9b9b9b";
      }
    }};
  }
`;
