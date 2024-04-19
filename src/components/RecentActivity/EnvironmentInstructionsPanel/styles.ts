import styled from "styled-components";
import { getCodeFont } from "../../common/App/styles";
import {
  bodyMediumTypography,
  footnoteRegularTypography,
  subscriptRegularTypography
} from "../../common/App/typographies";
import { CodeSnippet } from "../../common/CodeSnippet";
import { Link as CommonLink } from "../../common/Link";
import { Button } from "../../common/v3/Button";

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
  justify-content: space-between;
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
  height: 100%;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
  ${subscriptRegularTypography}
`;

export const Link = styled(CommonLink)`
  text-transform: capitalize;
`;

export const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AddToConfigContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const AddToConfigSuccessMessage = styled.span`
  color: ${({ theme }) => theme.colors.v3.status.success};
`;

export const AddToConfigFailureMessage = styled.span`
  color: ${({ theme }) => theme.colors.v3.status.high};
`;

export const IllustrationContainer = styled.div`
  padding-top: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const RunOrDebugIllustration = styled.img`
  width: 206px;
  height: 52px;
  border-radius: 4px;
  object-fit: cover;
`;

export const CodeSection = styled(CodeSnippet)`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.v3.surface.gray};
`;

export const HeaderContentContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const Divider = styled.div`
  border-radius: 1px;
  width: 1px;
  height: 13px;
  background: ${({ theme }) => theme.colors.v3.stroke.primary};
`;

export const EnvironmentIdLabel = styled.span`
  ${subscriptRegularTypography}

  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;

export const EnvironmentIdContainer = styled.div`
  ${({ theme }) => getCodeFont(theme.codeFont)}

  display: flex;
  align-items: center;
  padding-left: 8px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.v3.surface.gray};
  max-width: 299px;
`;

export const EnvironmentId = styled.span`
  ${footnoteRegularTypography}

  color: ${({ theme }) => theme.colors.v3.text.link};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const CloseButton = styled(Button)`
  margin-left: auto;
`;
