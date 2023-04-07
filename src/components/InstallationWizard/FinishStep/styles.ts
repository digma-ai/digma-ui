import styled from "styled-components";
import { SectionTitle as CommonSectionTitle } from "../SectionTitle";
import { IllustrationContainer as CommonIllustrationContainer } from "../styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 8px;
`;

export const SectionTitle = styled(CommonSectionTitle)`
  gap: 8px;
  margin-bottom: 4px;
`;

export const IllustrationContainer = styled(CommonIllustrationContainer)`
  margin: 12px 0 12px;
`;

export const ObservabilityPanelIllustration = styled.img`
  width: 100%;
`;

export const RunOrDebugIllustration = styled.img`
  width: 206px;
`;

export const TipContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  gap: 4px;
  font-weight: 500;
  font-size: 12px;
  margin-top: 8px;

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#788ca9";
      case "dark":
      case "dark-jetbrains":
        return "#b9c2eb";
    }
  }};
`;

export const TipIconContainer = styled.div`
  display: flex;
  flex-shrink: 0;
`;
