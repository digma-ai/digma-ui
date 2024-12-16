import styled from "styled-components";
import { Button as CommonButton } from "../../common/Button";
import { Link as CommonLink } from "../../common/Link";
import { TextField as CommonTextField } from "../../common/TextField";
import type { NotificationMessageProps } from "./types";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px;
  border-radius: 4px;
  font-size: 14px;
  height: fit-content;
  width: 462px;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#ebecf0";
      case "dark":
      case "dark-jetbrains":
        return "#393b40";
    }
  }};
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

export const Header = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
`;

export const Title = styled.div`
  display: flex;
  gap: 8px;
  font-size: 16px;
  align-items: center;
  font-weight: 600;
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

export const CloseButton = styled.button`
  margin-left: auto;
  padding: 0;
  cursor: pointer;
  background: none;
  border: none;
  height: 14px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TextFieldContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const TextField = styled(CommonTextField)`
  width: 564px;
`;

export const Link = styled(CommonLink)`
  text-transform: capitalize;
  max-width: fit-content;
`;

export const TestConnectionStatusContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

export const Button = styled(CommonButton)`
  height: 26px;
  padding: 6px 12px;
`;

export const ServiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  gap: 8px;
  border-radius: 4px;
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

export const ServiceTitle = styled.div`
  font-weight: 600;
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

export const NotificationMessage = styled.div<NotificationMessageProps>`
  display: flex;
  gap: 4px;
  align-items: center;
  color: ${({ theme, $type }) => {
    if ($type === "success") {
      switch (theme.mode) {
        case "light":
          return "#00c108";
        case "dark":
        case "dark-jetbrains":
          return "#67d28b";
      }
    }

    if ($type === "failure") {
      switch (theme.mode) {
        case "light":
          return "#e00036";
        case "dark":
        case "dark-jetbrains":
          return "#f93967";
      }
    }
  }};
`;

export const CopyButton = styled.button`
  background: none;
  border: none;
  display: inline-flex;
  padding: 0 4px;
  cursor: pointer;
  color: currentcolor;
`;
