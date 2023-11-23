import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const ContentContainer = styled.div`
  padding: 12px 0 18px;
  flex-grow: 1;
`;

export const EntryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ItemsCount = styled.span`
  font-weight: 500;
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

export const PageItemsCount = styled.span`
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

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  flex-grow: 1;
  color: #dadada;
`;

export const EmptyStateIconContainer = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#fbfdff";
      case "dark":
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};
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

export const ErrorMessage = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#e00036";
      case "dark":
      case "dark-jetbrains":
        return "#f93967";
    }
  }};
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;
