import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TabList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;

  border-bottom: 1px solid
    ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#b9c0d4";
        case "dark":
        case "dark-jetbrains":
          return "#2e2e2e";
      }
    }};
`;
