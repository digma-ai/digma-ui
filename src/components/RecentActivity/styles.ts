import styled from "styled-components";

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

export const RecentActivityHeader = styled.div`
  box-sizing: border-box;
  z-index: 1;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  min-width: ${RECENT_ACTIVITY_MIN_WIDTH}px;
  background: ${({ theme }) => theme.colors.recentActivity.background};
`;

export const RecentActivityToolbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 12px 20px;
`;

export const RecentActivityToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.recentActivity.header.text};
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
  padding: 16px 12px 20px;
`;
