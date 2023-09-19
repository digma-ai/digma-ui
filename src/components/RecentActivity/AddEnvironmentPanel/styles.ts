import styled from "styled-components";
import { Link as CommonLink } from "../../common/Link";

export const Container = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Header = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 16px;
`;

export const ContentContainer = styled.div`
  display: flex;
  gap: 12px;
`;

export const Section = styled.div`
  display: flex;
  flex: 1 1 0;
  padding: 12px;
  flex-direction: column;
  gap: 4px;
  border-radius: 4px;
  font-size: 14px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#818594";
      case "dark":
      case "dark-jetbrains":
        return "#b4b8bf";
    }
  }};
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#ebecf0";
      case "dark":
      case "dark-jetbrains":
        return "#393b40";
    }
  }};
  height: fit-content;
`;

export const SectionHeader = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const SectionNumber = styled.span`
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  font-size: 14px;
  line-height: 100%;
  font-weight: 500;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: #6a6dfa;
`;

export const SectionTitle = styled.span`
  font-weight: 600;
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

export const SectionContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Link = styled(CommonLink)`
  text-transform: capitalize;
  max-width: fit-content;
`;

export const AddToConfigContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const AddToConfigSuccessMessage = styled.span`
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

export const AddToConfigFailureMessage = styled.span`
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

export const IllustrationContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const RunOrDebugIllustration = styled.img`
  width: 206px;
  height: 52px;
  border-radius: 4px;
  object-fit: cover;
`;
