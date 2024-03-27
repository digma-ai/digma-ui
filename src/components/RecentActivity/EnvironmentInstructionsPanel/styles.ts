import styled from "styled-components";
import {
  bodyMediumTypography,
  subscriptRegularTypography
} from "../../common/App/typographies";
import { Link as CommonLink } from "../../common/Link";

export const Container = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Header = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.v3.text.primary};
  ${bodyMediumTypography}
`;

export const ContentContainer = styled.div`
  display: flex;
  gap: 12px;
`;

export const Section = styled.div`
  display: flex;
  flex: 1 1 0;
  padding: 16px 12px;
  flex-direction: column;
  gap: 8px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
  height: fit-content;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
  box-shadow: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "0 1px 5px 0 rgb(0 0 0 / 12%)";
      case "dark":
      case "dark-jetbrains":
        return "0 1px 4px 0 rgb(0 0 0 / 45%)";
    }
  }};
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
  ${bodyMediumTypography}
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const SectionContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
  ${subscriptRegularTypography}
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
  padding-top: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RunOrDebugIllustration = styled.img`
  width: 206px;
  height: 52px;
  border-radius: 4px;
  object-fit: cover;
`;
