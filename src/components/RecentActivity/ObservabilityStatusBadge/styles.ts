import styled from "styled-components";
import { Link } from "../../common/Link";

export const Container = styled.div`
  border-radius: 8px;
  border: 1px solid rgb(255 129 13 / 50%);
  background: rgb(255 129 13 / 10%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
`;

export const MessageContainer = styled.div`
  display: flex;
  gap: 4px;
`;

export const Message = styled.div`
  display: flex;
  gap: 8px;
  font-size: 14px;
`;

export const Title = styled.span`
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

export const Divider = styled.div`
  height: 100%;
  width: 1px;
  background: currentcolor;
`;

export const Description = styled.span`
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

export const IconContainer = styled.div`
  display: flex;
  align-self: center;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#e06c00";
      case "dark":
      case "dark-jetbrains":
        return "#ff810d";
    }
  }};
`;

export const TurnOnLink = styled(Link)`
  padding: 4px;
`;
