import styled from "styled-components";
import { TextField } from "../../../common/TextField";

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.jiraTicket.text.secondary};
`;

export const TextFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
`;

export const ReleativeTextField = styled(TextField)`
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