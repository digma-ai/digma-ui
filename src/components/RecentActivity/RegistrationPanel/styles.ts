import styled from "styled-components";
import { Button } from "../../common/Button";
import { TextField } from "../../common/TextField";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  font-size: 14px;
  border-radius: 4px;
  width: 390px;
  height: fit-content;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#818594";
      case "dark":
      case "dark-jetbrains":
        return "#b4b8bf";
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
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.span`
  font-weight: 600;
  font-size: 16px;
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

export const Description = styled.span`
  width: 350px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  padding-top: 8px;
  gap: 8px;
  justify-content: flex-end;
`;

export const CloseButton = styled.button`
  display: flex;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
`;

export const TextFieldContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const EmailTextField = styled(TextField)`
  width: 301px;
`;

export const CircleLoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

export const SubmitButton = styled(Button)`
  height: auto;
`;

export const ErrorMessage = styled.span`
  display: flex;
  gap: 4px;
  align-items: center;
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