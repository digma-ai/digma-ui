import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 6px;
`;

export const Stats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ValueContainer = styled.div`
  display: flex;
  gap: 5px;
`;

export const Value = styled.span`
  font-weight: 500;
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
        return "#9da0a8";
    }
  }};
`;
