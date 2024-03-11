import styled from "styled-components";
import { redScale } from "../../../common/App/v2colors";
import { ContainerProps } from "./types";

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  ${({ $selectable }) => ($selectable ? "" : "user-select: none;")}
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.jiraTicket.text.secondary};
`;

export const ErrorMessage = styled.span`
  display: flex;
  font-size: 13px;
  align-items: center;
  white-space: pre-line;
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
