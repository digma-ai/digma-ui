import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  font-size: 12px;
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
`;

export const Checkbox = styled.input`
  cursor: pointer;
`;

export const Label = styled.label`
  user-select: none;
  cursor: pointer;
`;
