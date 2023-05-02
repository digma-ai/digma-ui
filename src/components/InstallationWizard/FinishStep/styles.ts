import styled from "styled-components";
import { PlayCircleIcon } from "../../common/icons/PlayCircleIcon";
import { SectionTitle as CommonSectionTitle } from "../SectionTitle";
import {
  IllustrationContainer as CommonIllustrationContainer,
  SectionDescription as CommonSectionDescription,
  Link
} from "../styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 8px;
`;

export const SectionTitle = styled(CommonSectionTitle)`
  gap: 8px;
  margin-bottom: 4px;
`;

export const SectionTitleNote = styled.span`
  font-size: 10px;
  line-height: 12px;
  font-weight: 400;

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#788ca9";
      case "dark":
      case "dark-jetbrains":
        return "#dadada";
    }
  }};
`;

export const SectionDescription = styled(CommonSectionDescription)`
  margin-bottom: 12px;
`;

export const IllustrationContainer = styled(CommonIllustrationContainer)`
  margin: 0 0 12px;
  position: relative;
`;

export const PlayIconContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 8%;
`;

export const GettingStartedVideoThumbnail = styled.img`
  width: 100%;
`;

export const RunOrDebugIllustration = styled.img`
  width: 66%;
  margin: 7% 17%;
`;

export const EmailInput = styled.input`
  box-sizing: border-box;
  font-size: 12px;
  line-height: 14px;
  padding: 8px 10px;
  border-radius: 4px;

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
      case "dark-jetbrains":
        return "#dadada";
    }
  }};

  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#e9eef4";
      case "dark":
      case "dark-jetbrains":
        return "#252526";
    }
  }};

  border: 1px solid
    ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#d0d6eb";
        case "dark":
        case "dark-jetbrains":
          return "#49494d";
      }
    }};

  &::placeholder {
    color: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#4d668a";
        case "dark":
        case "dark-jetbrains":
          return "#dadada";
      }
    }};
  }

  &:focus {
    border: 1px solid
      ${({ theme }) => {
        switch (theme.mode) {
          case "light":
            return "#7891d0";
          case "dark":
          case "dark-jetbrains":
            return "#9b9b9b";
        }
      }};
    outline: none;
  }
`;

export const ErrorMessage = styled(CommonSectionDescription)`
  margin-top: 4px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#e00036";
      case "dark":
      case "dark-jetbrains":
        return "#f93967";
    }
  }};
`;

export const SlackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 12px 0 20px;
`;

export const ThumbnailPlayCircleIcon = styled(PlayCircleIcon)`
  width: 100%;
  height: 100%;
`;
