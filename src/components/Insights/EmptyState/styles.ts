import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  gap: 4px;
  flex-grow: 1;
`;

export const IconContainer = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#d0d6eb";
      case "dark":
      case "dark-jetbrains":
        return "#323334";
    }
  }};
`;

export const Title = styled.div`
  margin-top: 4px;
  text-transform: capitalize;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
      case "dark-jetbrains":
        return "#dadada";
    }
  }};
`;
