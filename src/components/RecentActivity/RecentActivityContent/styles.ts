import styled from "styled-components";
import { Spinner as CommonSpinner } from "../../common/v3/Spinner";
import { RecentActivityHeader } from "../RecentActivityToolbar";

const RECENT_ACTIVITY_NO_DATA_PADDING_TOP = 39; // in pixels

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

export const NoDataRecentActivityHeader = styled(RecentActivityHeader)`
  position: relative;
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
