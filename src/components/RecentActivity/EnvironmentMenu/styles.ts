import styled from "styled-components";
import { subscriptRegularTypography } from "../../common/App/typographies";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  border-radius: 4px;
  padding: 4px;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 29%);
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`;

export const IconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
`;

export const ListItem = styled.li`
  ${subscriptRegularTypography}

  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  list-style-type: none;
  padding: 4px 8px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.v3.text.primary};

  &:hover,
  &:active {
    border-radius: 2px;
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
