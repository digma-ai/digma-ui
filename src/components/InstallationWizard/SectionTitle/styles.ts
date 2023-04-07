import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  font-weight: 500;
  font-size: 14px;
  align-items: center;
  text-transform: capitalize;

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
      case "dark-jetbrains":
        return "#ededed";
    }
  }};
`;

export const IconContainer = styled.div`
  display: flex;
  flex-shrink: 0;
`;
