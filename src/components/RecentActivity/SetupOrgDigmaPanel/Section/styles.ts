import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  padding: 12px;
  flex-direction: column;
  gap: 8px;
  border-radius: 4px;
  font-size: 14px;
  overflow: hidden;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#818594";
      case "dark":
      case "dark-jetbrains":
        return "#b4b8bf";
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

export const HeaderButton = styled.button`
  display: flex;
  justify-content: space-between;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
`;

export const Header = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const Number = styled.span`
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  font-size: 14px;
  line-height: 100%;
  font-weight: 500;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: #6a6dfa;
`;

export const Title = styled.span`
  font-size: 16px;
  font-weight: 600;
  text-transform: capitalize;
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
