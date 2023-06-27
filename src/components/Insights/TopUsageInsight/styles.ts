import styled from "styled-components";
import { Button as CommonButton } from "../../common/Button";

export const FlowList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Flow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  border-radius: 4px;

  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#f9f9f9";
      case "dark":
      case "dark-jetbrains":
        return "#36414e";
    }
  }};
`;

export const FlowData = styled.span`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  font-size: 14px;
  line-height: 17px;
  font-weight: 500;
  word-break: break-all;

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
  height: fit-content;
  align-self: flex-start;
`;
