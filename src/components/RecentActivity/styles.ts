import styled from "styled-components";
import { Spinner as CommonSpinner } from "../common/v3/Spinner";
import { RecentActivityHeader } from "./RecentActivityToolbar";

const RECENT_ACTIVITY_NO_DATA_PADDING_TOP = 39; // in pixels
const RECENT_ACTIVITY_MIN_WIDTH = 550; // in pixels

export const Container = styled.div`
  height: 100%;
  position: relative;
  background: ${({ theme }) => theme.colors.recentActivity.background};

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

export const EnvironmentPanelContainer = styled.div`
  box-sizing: border-box;
  z-index: 1;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  min-width: ${RECENT_ACTIVITY_MIN_WIDTH}px;
  background: ${({ theme }) => theme.colors.recentActivity.background};
  height: 44px;
`;

export const NoDataRecentActivityHeader = styled(RecentActivityHeader)`
  position: relative;
`;

export const RecentActivityContentContainer = styled.div`
  padding: 0 12px 12px;
  box-sizing: border-box;
  min-width: ${RECENT_ACTIVITY_MIN_WIDTH}px;
`;

export const LiveViewContainer = styled.div`
  padding: 12px;
  padding-left: 24px;
  height: 100%;
  box-sizing: border-box;
`;

export const NoDataContainer = styled.div`
  position: relative;
  padding-top: ${RECENT_ACTIVITY_NO_DATA_PADDING_TOP}px;
`;

export const NoDataRecentActivityContainerBackground = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`;

export const NoDataRecentActivityContainerBackgroundGradient = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: ${RECENT_ACTIVITY_NO_DATA_PADDING_TOP}px;
  height: 454.5%;
  width: 80.41%;
  border-radius: 100%;
  opacity: 0.7;
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgb(79 93 163 / 60%) 0%,
    rgb(79 93 163 / 0%) 100%
  );
  filter: blur(5px);
`;

export const RecentActivityContainerBackgroundGradient = styled.div`
  z-index: -1;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 0;
  height: 383.6%;
  width: 82.1%;
  border-radius: 100%;
  opacity: 0.7;
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgb(79 93 163 / 60%) 0%,
    rgb(79 93 163 / 0%) 100%
  );
  filter: blur(5px);
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 60px;
`;

export const Spinner = styled(CommonSpinner)`
  color: ${({ theme }) => theme.colors.v3.surface.gray};
`;

export const ClearDataMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 315px;
`;
