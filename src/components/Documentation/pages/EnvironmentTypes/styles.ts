import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  min-width: 856px;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#ebecf0";
      case "dark":
      case "dark-jetbrains":
        return "#191919";
    }
  }};
`;

export const Header = styled.div`
  display: flex;
  height: 151px;
  padding: 12px;
  flex-direction: column;
  gap: 10px;
  font-size: 14px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#b4b8bf";
    }
  }};
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#e9eef4";
      case "dark":
      case "dark-jetbrains":
        return "#2b2d30";
    }
  }};
`;

export const Title = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  text-transform: capitalize;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
      case "dark-jetbrains":
        return "#fff";
    }
  }};
`;

export const EnvironmentsContainer = styled.div`
  position: absolute;
  top: 100px;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  gap: 8px;
  padding: 0 8px;
  flex-grow: 1;
`;
