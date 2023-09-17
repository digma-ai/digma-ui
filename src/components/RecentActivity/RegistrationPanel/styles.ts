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
  width: 390px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.span`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#494b57";
      case "dark":
      case "dark-jetbrains":
        return "#dfe1e5";
    }
  }};
  text-transform: capitalize;
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

export const SubmitButton = styled(Button)`
  height: auto;
`;
