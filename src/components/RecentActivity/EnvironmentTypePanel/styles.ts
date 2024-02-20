import styled from "styled-components";
import { grayScale } from "../../common/App/v2colors";

export const Container = styled.div`
  margin-top: 12px;
  display: flex;
  gap: 4px;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
`;

export const Title = styled.span`
  font-size: 16px;
  font-weight: 500;
  text-transform: capitalize;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return grayScale[900];
      case "dark":
      case "dark-jetbrains":
        return grayScale[50];
    }
  }};
`;

export const Subtitle = styled.span`
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return grayScale[600];
      case "dark":
      case "dark-jetbrains":
        return grayScale[400];
    }
  }};
`;

export const ContentContainer = styled.div`
  display: flex;
  margin-top: 8px;
  gap: 16px;
`;

export const EnvironmentTypeCard = styled.div`
  border: 1px solid
    ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return grayScale[200];
        case "dark":
        case "dark-jetbrains":
          return grayScale[900];
      }
    }};
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return grayScale[50];
      case "dark":
      case "dark-jetbrains":
        return grayScale[1000];
    }
  }};
  box-shadow: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "0 1px 5px 0 rgb(0 0 0 / 12%)";
      case "dark":
      case "dark-jetbrains":
        return "0 1px 4px 0 rgb(0 0 0 / 45%)";
    }
  }};
  border-radius: 7px;
  display: flex;
  width: 218px;
  padding: 12px;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const EnvironmentTypeTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: ${grayScale[500]};
`;

export const EnvironmentTypeTitle = styled.span`
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return grayScale[900];
      case "dark":
      case "dark-jetbrains":
        return grayScale[100];
    }
  }};
  font-weight: 500;
`;
