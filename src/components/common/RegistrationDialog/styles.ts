import styled from "styled-components";
import { grayScale, redScale } from "../App/v2colors";
import { NewButton } from "../NewButton";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  font-size: 13px;
  border-radius: 7px;
  width: 390px;
  height: fit-content;
  color: ${grayScale[500]};
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
  box-shadow: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "0 1px 5px 0 rgb(0 0 0 / 12%)";
      case "dark":
      case "dark-jetbrains":
        return "0 1px 4px 0 rgb(0 0 0 / 45%)";
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
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.span`
  font-size: 16px;
  text-transform: capitalize;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return grayScale[900];
      case "dark":
      case "dark-jetbrains":
        return grayScale[100];
    }
  }};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  padding-top: 4px;
  gap: 8px;
  justify-content: flex-end;
`;

export const CloseButton = styled.button`
  display: flex;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return grayScale[800];
      case "dark":
      case "dark-jetbrains":
        return grayScale[200];
    }
  }};
`;

export const CircleLoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubmitButton = styled(NewButton)`
  align-self: flex-end;
`;

export const ErrorMessage = styled.span`
  display: flex;
  font-size: 13px;
  height: 15px;
  align-items: center;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return redScale[500];
      case "dark":
      case "dark-jetbrains":
        return redScale[300];
    }
  }};
`;
