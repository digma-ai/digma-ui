import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 150px;
  height: 100%;

  border: 1px solid
    ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#d1d1d1";
        case "dark":
        case "dark-jetbrains":
          return "#323232";
      }
    }};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  gap: 12px;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;

  border-bottom: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "1px solid #d1d1d1";
      case "dark":
      case "dark-jetbrains":
        return "none";
    }
  }};

  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#e3e7ed";
      case "dark":
      case "dark-jetbrains":
        return "#3c3f41";
    }
  }};
`;

export const Title = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  overflow: hidden;
`;

export const SpanIconContainer = styled.span`
  display: flex;
`;

export const SpanName = styled.span`
  font-size: 12px;
  line-height: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
      case "dark-jetbrains":
        return "#7891d0";
    }
  }};
`;

export const LiveBadge = styled.span`
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: auto;
  padding: 2px 4px;

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#426dda";
      case "dark":
      case "dark-jetbrains":
        return "#b9c2eb";
    }
  }};
`;

export const CloseButton = styled.button`
  display: flex;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
`;

export const ChartContainer = styled.div`
  padding: 44px 12px 6px;
  height: 100%;
  overflow: hidden;

  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#fbfdff";
      case "dark":
      case "dark-jetbrains":
        return "#383838";
    }
  }};
`;
