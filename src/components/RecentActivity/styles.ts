import styled from "styled-components";
import { grayScale } from "../common/App/getTheme";
import { LAYERS } from "../common/App/styles";
import { Button } from "../common/Button";

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
        return grayScale[1200];
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

export const RecentActivityContainer = styled.div`
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
`;

// export const RecentActivityContainerBackground = styled.div`
//   position: absolute;
//   inset: 0;
//   overflow: hidden;
// `;

// export const RecentActivityContainerBackgroundGradient = styled.div`
//   position: absolute;
//   left: 0;
//   right: 0;
//   margin: auto;
//   top: 16.8%;
//   height: 413%;
//   width: 80.4%;
//   border-radius: 413px;
//   opacity: 0.7;
//   background: radial-gradient(
//     50% 50% at 50% 50%,
//     rgb(79 93 163 / 60%) 0%,
//     rgb(79 93 163 / 0%) 100%
//   );
//   filter: blur(5px);
// `;

export const RecentActivityHeader = styled.div`
  box-sizing: border-box;
  padding: 12px 12px 8px;
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
        return grayScale[1200];
    }
  }};
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const RecentActivityToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 8px;
  font-weight: 400;
  font-size: 14px;
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

export const RecentActivityContentContainer = styled.div`
  padding: 0 12px 12px;
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
  background: rgb(18 18 21 / 70%);
  display: flex;
  justify-content: center;
  padding: 80px 0;
  overflow: auto;
  z-index: ${LAYERS.OVERLAY};
`;
