import styled from "styled-components";
import { redScale } from "../../App/getTheme";
import { TextField } from "../../TextField";

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.jiraTicket.text.secondary};
`;

export const TextFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
`;

export const RelativeTextField = styled(TextField)`
  position: relative;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.field.border};

  & > input {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

export const ButtonContainer = styled.div`
  position: absolute;
  right: 4px;
  top: 0;
  bottom: 0;
  margin: auto;
  height: fit-content;
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
