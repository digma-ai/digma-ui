import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  align-items: center;
  font-size: 16px;
  padding: 8px;
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

export const HeaderItem = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-shrink: 0;
  height: 36px;
`;
