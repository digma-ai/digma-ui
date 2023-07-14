import styled from "styled-components";
import { Description } from "../styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 6px;
`;

export const Stats = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 10px;
  line-height: normal;
  gap: 4px;
  font-weight: 500;
`;

export const Label = styled(Description)`
  font-weight: 400;
`;

export const Value = styled.div`
  display: flex;
  gap: 5px;
`;

export const LastCallTimeDistance = styled.div<{ isRecent: boolean }>`
  color: ${({ theme, isRecent }) => {
    if (isRecent) {
      switch (theme.mode) {
        case "light":
          return "#426dda";
        case "dark":
        case "dark-jetbrains":
          return "#92affa";
      }
    }

    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};
`;

export const Percentile = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  line-height: normal;
  font-weight: 500;
`;
