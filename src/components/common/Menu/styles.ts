import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 4px rgb(0 0 0 / 12%);
  border-radius: 2px;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#fbfdff";
      case "dark":
      case "dark-jetbrains":
        return "#2e2e2e";
    }
  }};
`;

export const Header = styled.div`
  padding: 2px 8px;
  font-size: 14px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#7c7c94";
    }
  }};
`;

export const List = styled.ul<{ width?: string }>`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: ${(props) => props.width || "auto"};
`;

export const ListItem = styled.li`
  flex-direction: row;
  width: 100%;
  box-sizing: border-box;
  list-style-type: none;
  padding: 6px 8px;
  font-size: 14px;
  display: flex;
  gap: 6px;
  cursor: pointer;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};

  &:hover {
    background: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#f1f5fa";
        case "dark":
        case "dark-jetbrains":
          return "#383838";
      }
    }};
  }

  &:active {
    color: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#4d668a";
        case "dark":
        case "dark-jetbrains":
          return "#e2e7ff";
      }
    }};
    background: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#e9eef4";
        case "dark":
        case "dark-jetbrains":
          return "#49494d";
      }
    }};
  }

  & svg {
    padding-top: 3px;
  }
`;
