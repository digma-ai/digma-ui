import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 16px 0 rgb(0 0 0 / 16%);
  width: 160px;
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

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  list-style-type: none;
  padding: 6px 8px;
  font-size: 14px;
  cursor: pointer;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#818594";
      case "dark":
      case "dark-jetbrains":
        return "#b4b8bf";
    }
  }};

  &:hover,
  &:active {
    color: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#494b57";
        case "dark":
        case "dark-jetbrains":
          return "#dfe1e5";
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
  }
`;
