import styled from "styled-components";
import { Button as CommonButton } from "../../common/Button";

export const LastCall = styled.span`
  display: flex;
  font-size: 14px;
  line-height: 17px;
  font-weight: 500;
  margin-bottom: 8px;

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

export const PercentileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Percentile = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
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

export const Button = styled(CommonButton)`
  margin-left: auto;
`;
