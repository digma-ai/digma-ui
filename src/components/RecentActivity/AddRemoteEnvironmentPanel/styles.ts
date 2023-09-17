import styled from "styled-components";
import { Button as CommonButton } from "../../common/Button";
import { Link as CommonLink } from "../../common/Link";
import { TextField as CommonTextField } from "../../common/TextField";

export const Container = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Header = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 16px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
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

export const TestConnectionContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
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

export const ConnectionTestResultMessage = styled.span<{
  result: "success" | "failure";
}>`
  display: flex;
  gap: 4px;
  align-items: center;
  color: ${({ theme, result }) => {
    if (result === "success") {
      switch (theme.mode) {
        case "light":
          return "#00c108";
        case "dark":
        case "dark-jetbrains":
          return "#67d28b";
      }
    }

    if (result === "failure") {
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
