import styled from "styled-components";
import { NewButton } from "../common/v3/NewButton";

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

export const SearchInputContainer = styled.div`
  display: flex;
  position: relative;
  margin-left: auto;
  width: 290px;
`;

export const SearchInputIconContainer = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 4px;
  color: ${({ theme }) => theme.colors.icon.disabledAlt};
`;

export const SearchInput = styled.input`
  width: 100%;
  font-size: 14px;
  padding: 4px 4px 4px 20px;
  border-radius: 4px;
  outline: none;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.dark};
  background: ${({ theme }) => theme.colors.v3.surface.primary};
  box-shadow: 1px 1px 4px 0 rgb(0 0 0 / 25%);
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
    color: ${({ theme }) => theme.colors.text.disabledAlt};
  }

  &:focus::placeholder {
    color: transparent;
  }
`;

export const UpgradeMessage = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 8px;
`;

export const RefreshButton = styled(NewButton)`
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.dark};
  background: ${({ theme }) => theme.colors.v3.surface.primary};

  &:hover:enabled {
    color: ${({ theme }) => theme.colors.v3.icon.white};
    background: none;
  }
`;
