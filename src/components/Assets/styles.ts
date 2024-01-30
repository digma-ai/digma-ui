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

export const SearchInputContainer = styled.div`
  display: flex;
  position: relative;
  margin-left: auto;
`;

export const SearchInputIconContainer = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 4px;
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

export const SearchInput = styled.input`
  font-size: 14px;
  padding: 4px 4px 4px 20px;
  border-radius: 4px;
  width: 70px;
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
