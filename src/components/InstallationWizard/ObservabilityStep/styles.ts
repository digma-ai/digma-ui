import styled from "styled-components";
import { ToggleSwitch } from "../../common/ToggleSwitch";
import * as s from "../styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 8px;
`;

export const ObservabilityContainer = styled.div`
  padding: 20px;
  margin: 8px 0 12px;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;
`;

export const ObservabilityTitle = styled.span`
  font-weight: 500;
  font-size: 14px;
  text-transform: capitalize;
  text-align: center;

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
      case "dark-jetbrains":
        return "#fff";
    }
  }};
`;

export const ObservabilityDescription = styled.div`
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#969798";
    }
  }};
`;

export const ObservabilityToggleSwitchContainer = styled.div`
  padding: 32px 0 12px;
  display: flex;
  justify-content: center;
`;

export const ObservabilityToggleSwitch = styled(ToggleSwitch)`
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#426dda";
      case "dark":
      case "dark-jetbrains":
        return "#7891d0";
    }
  }};
`;

export const CongratulationsTextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  font-weight: 500;
  font-size: 10px;
  line-height: 11px;
  flex-wrap: wrap;
  justify-content: center;

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
      case "dark-jetbrains":
        return "#dadada";
    }
  }};
`;

export const CongratulationsText = styled.span`
  font-weight: 700;
  padding-left: 2px;

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#00c108";
      case "dark":
      case "dark-jetbrains":
        return "#67d28b";
    }
  }};
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
