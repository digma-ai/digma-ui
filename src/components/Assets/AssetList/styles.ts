import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  display: flex;
  padding: 0;
  cursor: pointer;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
  padding: 8px 12px 8px 8px;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#f1f5fa";
      case "dark":
      case "dark-jetbrains":
        return "#383838";
    }
  }};
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#002d61";
      case "dark":
      case "dark-jetbrains":
        return "#dadada";
    }
  }};
`;

export const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
`;

export const PopoverContainer = styled.div`
  margin-left: auto;
`;

export const SearchInputContainer = styled.div`
  display: flex;
  position: relative;
`;

export const SearchInputIconContainer = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 4px;
`;

export const SearchInput = styled.input`
  font-size: 10px;
  padding: 4px 4px 4px 18px;
  border-radius: 4px;
  width: 140px;
  outline: none;
  caret-color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
      case "dark-jetbrains":
        return "#dadada";
    }
  }};
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
      case "dark-jetbrains":
        return "#dadada";
    }
  }};
  border: 1px solid
    ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#d0d6eb";
        case "dark":
        case "dark-jetbrains":
          return "#606060";
      }
    }};

  &:focus,
  &:hover {
    border: 1px solid
      ${({ theme }) => {
        switch (theme.mode) {
          case "light":
            return "#7891d0";
          case "dark":
          case "dark-jetbrains":
            return "#9b9b9b";
        }
      }};
  }

  &::placeholder {
    color: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#4d668a";
        case "dark":
        case "dark-jetbrains":
          return "#dadada";
      }
    }};
  }

  &:focus::placeholder {
    color: transparent;
  }
`;

export const SortingMenuContainer = styled.div`
  display: flex;
  gap: 2px;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  align-items: center;
  height: 20px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};
`;

export const SortingLabel = styled.span`
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  text-transform: capitalize;
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

export const ItemsCount = styled.span`
  margin-left: auto;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#9f9f9f";
    }
  }};
`;

export const List = styled.ul`
  padding: 0 9px 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
`;

export const ListItem = styled.li`
  display: flex;
`;

export const NoDataText = styled.span`
  padding: 10px;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};
`;

export const InsightIconsContainer = styled.span`
  display: flex;
  gap: 2px;
`;

export const InsightIconContainer = styled.span`
  background: #2e2e2e;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
`;
