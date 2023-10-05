import styled from "styled-components";
import { Link } from "../../common/Link";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid
    ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#c9ccd6";
        case "dark":
        case "dark-jetbrains":
          return "#4e5157";
      }
    }};
`;

export const Title = styled.div`
  display: flex;
  gap: 4px;
  font-size: 14px;
  font-weight: 700;
  align-items: center;
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

export const ContentContainer = styled.div`
  padding: 12px 0 18px;
  flex-grow: 1;
`;

export const EntryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Entry = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4px;
`;

export const SpanLink = styled(Link)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Duration = styled.span`
  flex-shrink: 0;
  font-size: 14px;
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
  font-size: 14px;
  flex-grow: 1;
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
