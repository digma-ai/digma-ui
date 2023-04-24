import styled from "styled-components";
import { SectionTitle as CommonSectionTitle } from "../SectionTitle";
import {
  IllustrationContainer as CommonIllustrationContainer,
  SectionDescription as CommonSectionDescription
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
  height: 32px;
  width: 32px;
`;

export const GettingStartedVideoThumbnail = styled.img`
  width: 100%;
`;

export const RunOrDebugIllustration = styled.img`
  width: 206px;
`;
