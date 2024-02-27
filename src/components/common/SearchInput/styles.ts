import styled from "styled-components";
import { grayScale } from "../App/v2colors";

export const SearchInputContainer = styled.div`
  display: flex;
  position: relative;
  flex-grow: 1;
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
  border: 1px solid ${({ theme }) => theme.colors.stroke.primary};
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return grayScale[50];
      case "dark":
      case "dark-jetbrains":
        return grayScale[1000];
    }
  }};
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

  &:disabled {
    background: ${({ theme }) => theme.colors.v3.surface.gray};
  }

  &:focus:enabled,
  &:hover:enabled {
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

export const DeleteTagButton = styled.button`
  padding: 0;
  cursor: pointer;
  background: none;
  border: none;
  height: 14px;
  right: 4px;
  display: flex;
  align-items: center;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  color: ${({ theme }) => theme.colors.icon.disabledAlt};

  &:disabled {
    pointer-events: none;
  }
`;
