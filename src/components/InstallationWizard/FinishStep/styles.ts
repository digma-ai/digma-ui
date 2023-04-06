import styled from "styled-components";
import * as s from "../styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 8px;
`;

export const SectionTitle = styled(s.SectionTitle)`
  gap: 8px;
  margin-bottom: 4px;
`;

export const IllustrationContainer = styled(s.IllustrationContainer)`
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
  color: #b9c2eb;
  margin-top: 8px;
`;
