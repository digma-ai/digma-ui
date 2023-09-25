import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  gap: 8px;
`;

export const IconContainer = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#fff";
      case "dark":
      case "dark-jetbrains":
        return "#868a91";
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
`;

export const Title = styled.div`
  text-transform: capitalize;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
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
