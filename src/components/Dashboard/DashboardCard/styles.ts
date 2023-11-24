import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: calc(50% - 4px);
  min-width: 300px;
  border-radius: 4px;
  padding: 12px;
  box-sizing: border-box;
  overflow: auto;
  height: 231px;
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

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid
    ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#c9ccd6";
        case "dark":
        case "dark-jetbrains":
          return "#4e5157";
      }
    }};
  min-height: 31px;
`;

export const Title = styled.div`
  display: flex;
  gap: 4px;
  font-size: 14px;
  font-weight: 700;
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
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;
