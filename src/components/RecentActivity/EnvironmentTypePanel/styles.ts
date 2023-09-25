import styled from "styled-components";

export const Container = styled.div`
  margin-top: 12px;
  display: flex;
  gap: 8px;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
`;

export const Title = styled.span`
  font-size: 16px;
  font-weight: 600;
  text-transform: capitalize;
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

export const Subtitle = styled.span`
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

export const ContentContainer = styled.div`
  display: flex;
  margin-top: 4px;
  gap: 16px;
  width: 100%;
`;

export const EnvironmentTypeDescription = styled.span`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
  flex: 1;

  &:first-child {
    text-align: right;
    align-items: flex-end;
  }
`;

export const EnvironmentTypeDescriptionTitle = styled.span`
  font-weight: 600;
  text-transform: capitalize;
`;

export const EnvironmentTypeButton = styled.button`
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 8px;
  text-transform: capitalize;
  align-items: center;
  width: 120px;
  border-radius: 4px;
  font-weight: 600;
  font-family: inherit;
  font-size: 16px;
  border: 1px solid transparent;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#494b57";
      case "dark":
      case "dark-jetbrains":
        return "#dfe1e5";
    }
  }};
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#ebecf0";
      case "dark":
      case "dark-jetbrains":
        return "#393b40";
    }
  }};

  &:hover,
  &:focus {
    border-color: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#92affa";
        case "dark":
        case "dark-jetbrains":
          return "#7c7c94";
      }
    }};
  }
`;

export const EnvironmentTypeIconContainer = styled.div`
  border-radius: 4px;
  padding: 14px 10px;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#dfe1e5";
      case "dark":
      case "dark-jetbrains":
        return "#43454a";
    }
  }};
`;
