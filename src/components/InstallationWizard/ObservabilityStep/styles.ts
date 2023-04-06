import styled from "styled-components";
import * as s from "../styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 8px;
`;

export const ObservabilityContainer = styled.div`
  padding: 20px;
  margin: 8px 0 12px;
  background: #303031;
  border: 1px solid #9b9b9b;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
`;

export const ObservabilityTitle = styled.span`
  font-weight: 500;
  font-size: 14px;
  text-transform: capitalize;
  color: #fff;
  text-align: center;
`;

export const ObservabilityDescription = styled.div`
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  color: #969798;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

export const ObservabilityToggleSwitchContainer = styled.div`
  padding-top: 12px;
  display: flex;
  justify-content: center;
`;

export const CongratulationsTextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  font-weight: 500;
  font-size: 10px;
  line-height: 11px;
  color: #dadada;
  flex-wrap: wrap;
  justify-content: center;
`;

export const CongratulationsText = styled.span`
  font-weight: 700;
  padding-left: 2px;
  color: #67d28b;
`;

export const IllustrationContainer = styled(s.IllustrationContainer)`
  margin-top: 8px;
  display: flex;
  justify-content: center;
`;

export const ObservabilityButtonIllustration = styled.img`
  width: 100%;
`;

export const StepFooter = styled.div`
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const SectionDescription = styled(s.SectionDescription)`
  padding: 8px 0;
`;
