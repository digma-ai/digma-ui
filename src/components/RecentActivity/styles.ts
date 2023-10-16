import styled from "styled-components";
import { Button } from "../common/Button";

export const HEADER_HEIGHT = 64; // in pixels;

export const Container = styled.div`
  height: 100%;
  position: relative;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#f7f8fa";
      case "dark":
        return "#0f0f0f";
      case "dark-jetbrains":
        return "#2b2d30";
    }
  }};

  .sash {
    --sash-size: 12px;
  }

  .sash-hover {
    --focus-border: none;
  }

  &&&&& .split-view-view::before {
    margin: 12px 0;
    height: calc(100% - 24px);

    --separator-border: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#b9c0d4";
        case "dark":
        case "dark-jetbrains":
          return "#9b9b9b";
      }
    }};
  }
`;

export const RecentActivityHeader = styled.div`
  height: ${HEADER_HEIGHT}px;
  box-sizing: border-box;
  padding: 12px;
  padding-right: 24px;
  z-index: 1;
  position: sticky;
  top: 0;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#f7f8fa";
      case "dark":
        return "#0f0f0f";
      case "dark-jetbrains":
        return "#2b2d30";
    }
  }};
`;

export const RecentActivityContainer = styled.div`
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
`;

export const RecentActivityContentContainer = styled.div`
  padding: 0 24px 12px 12px;
`;

export const RecentActivityTableTitle = styled.div`
  margin: 12px 0 8px;
  padding-left: 12px;
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#818594";
      case "dark":
        return "#b9c2eb";
      case "dark-jetbrains":
        return "#b4b8bf";
    }
  }};
`;

export const NoDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0 18px;
  border-radius: 12px;
  gap: 4px;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#ebecf0";
      case "dark":
        return "#1e1e1e";
      case "dark-jetbrains":
        return "#393b40";
    }
  }};
`;

export const NoDataTitle = styled.span`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#002d61";
      case "dark":
      case "dark-jetbrains":
        return "#b9c2eb";
    }
  }};
`;

export const NoDataText = styled.span`
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#7c7c94";
    }
  }};
`;

export const TroubleshootButton = styled(Button)`
  margin-top: 8px;
`;

export const LiveViewContainer = styled.div`
  padding: 12px;
  padding-left: 24px;
  height: 100%;
  box-sizing: border-box;
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  backdrop-filter: blur(2px);
  background: rgb(43 45 48 / 55%);
  display: flex;
  justify-content: center;
  padding: 80px 0;
  overflow: auto;
`;
