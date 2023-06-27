import styled from "styled-components";
import { Button as CommonButton } from "../../common/Button";

export const SpanList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Span = styled.span`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 4px;
  font-size: 14px;
  line-height: 17px;
  font-weight: 500;

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#49494d";
      case "dark":
      case "dark-jetbrains":
        return "#dadada";
    }
  }};
`;

export const Stats = styled.span`
  display: flex;
  gap: 24px;
`;

export const Stat = styled.span`
  display: flex;
  gap: 4px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Description = styled.span`
  font-size: 14px;
  line-height: 17px;

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#70787d";
      case "dark":
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};
`;

export const Button = styled(CommonButton)`
  margin-left: auto;
`;
