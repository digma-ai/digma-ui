import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#fbfdff";
      case "dark":
      case "dark-jetbrains":
        return "#2b2d30";
    }
  }};
`;

export const Header = styled.div`
  padding: 8px;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  flex-shrink: 0;
  height: 36px;
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

export const ServiceMenuButton = styled.button`
  border: 1px solid #4e5157;
  background: transparent;
  border-radius: 4px;
  padding: 8px;
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const ServiceMenuButtonLabel = styled.span`
  display: flex;
  gap: 4px;
  align-items: center;
  font-size: 14px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#818594";
      case "dark":
      case "dark-jetbrains":
        return "#b4b8bf";
    }
  }};
`;

export const SelectedServiceNumberPlaceholder = styled.span`
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#494b57";
      case "dark":
      case "dark-jetbrains":
        return "#dfe1e5";
    }
  }};
  user-select: none;
`;

export const Number = styled.span`
  min-width: 18px;
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
  background: #5053d4;
`;

export const ServiceMenuChevronIconContainer = styled.span`
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
