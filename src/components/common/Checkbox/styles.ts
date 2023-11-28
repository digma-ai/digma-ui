import styled from "styled-components";
import { LabelProps } from "./types";

export const CheckboxContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const CheckContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Checkbox = styled.input`
  appearance: none;
  margin: 1px;
  cursor: pointer;
  border: 1px solid
    ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#b9c0d4";
        case "dark":
        case "dark-jetbrains":
          return "#7c7c94";
      }
    }};
  width: 10px;
  height: 10px;
  border-radius: 1px;
  background: transparent;

  &:checked {
    border: 1px solid
      ${({ theme }) => {
        switch (theme.mode) {
          case "light":
            return "#426dda";
          case "dark":
          case "dark-jetbrains":
            return "#7891d0";
        }
      }};
  }

  &:hover {
    border: 1px solid
      ${({ theme }) => {
        switch (theme.mode) {
          case "light":
            return "#828797";
          case "dark":
          case "dark-jetbrains":
            return "#dadada";
        }
      }};
  }

  &:disabled {
    border: 1px solid
      ${({ theme }) => {
        switch (theme.mode) {
          case "light":
            return "#dadada";
          case "dark":
          case "dark-jetbrains":
            return "#49494d";
        }
      }};
  }

  & + ${CheckContainer} {
    color: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#b9c0d4";
        case "dark":
        case "dark-jetbrains":
          return "#7c7c94";
      }
    }};
  }

  &:checked + ${CheckContainer} {
    color: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#426dda";
        case "dark":
        case "dark-jetbrains":
          return "#7891d0";
      }
    }};
  }

  &:hover + ${CheckContainer} {
    color: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#828797";
        case "dark":
        case "dark-jetbrains":
          return "#dadada";
      }
    }};
  }

  &:disabled + ${CheckContainer} {
    color: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#dadada";
        case "dark":
        case "dark-jetbrains":
          return "#49494d";
      }
    }};
  }
`;

export const Label = styled.label<LabelProps>`
  user-select: none;
  cursor: pointer;
  display: flex;
  gap: 4px;
  align-items: center;
  font-size: 14px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};

  &:hover {
    color: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#828797";
        case "dark":
        case "dark-jetbrains":
          return "#e2e7ff";
      }
    }};
  }

  &:has(${Checkbox}:disabled) {
    cursor: initial;
    color: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#dadada";
        case "dark":
        case "dark-jetbrains":
          return "#49494d";
      }
    }};
  }
`;

export const LabelText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
