import styled from "styled-components";
import {
  bodyBoldTypography,
  bodyMediumTypography,
  bodySemiboldTypography,
  footnoteRegularTypography,
  subscriptRegularTypography
} from "../../common/App/typographies";
import { CodeSnippet } from "../../common/CodeSnippet";
import { Button } from "../../common/v3/Button";

export const Container = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Header = styled.div`
  ${bodyMediumTypography}

  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const CloseButton = styled(Button)`
  margin-left: auto;
`;

export const Card = styled.div`
  display: flex;
  padding: 16px 12px;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  min-height: 152px;
  max-height: 200px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
  overflow: hidden;
  box-sizing: border-box;
`;

export const ContentContainer = styled.div`
  ${bodyBoldTypography}

  display: flex;
  gap: 12px;
  align-items: stretch;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};

  & > ${Card} {
    flex: 1;
  }
`;

export const CardDivider = styled.div`
  display: flex;
  align-items: center;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;
`;

export const CardTitleContainer = styled.div`
  ${subscriptRegularTypography}

  display: flex;
  flex-direction: column;
  gap: 4px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const CardTitle = styled.div`
  ${bodyMediumTypography}
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const CardButtons = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const ActionButton = styled(Button)`
  padding: 6px;
`;

export const RunConfigSetMessage = styled.div`
  ${footnoteRegularTypography}

  display: flex;
  height: 28px;
  padding: 4px 6px;
  box-sizing: border-box;
  align-items: center;
  gap: 4px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.v3.status.backgroundSuccess};
  color: ${({ theme }) => theme.colors.v3.status.success};
`;

export const RunConfigSetMessageIconContainer = styled.div`
  width: 12px;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CardContent = styled.div`
  display: flex;
  overflow: hidden;
`;

export const ColumnsContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  width: 100%;

  & > * {
    flex: 1;
  }
`;

export const KeyValue = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
`;

export const Label = styled.span`
  ${subscriptRegularTypography}

  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const MultiLineCodeSnippet = styled(CodeSnippet)`
  overflow: auto;
  flex-grow: 1;
`;

export const HighlightedCode = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.link};
`;

export const SingleLineCodeSnippet = styled(CodeSnippet)`
  height: 33px;

  & > code {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const PublicEnvironmentConnectCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  gap: 8px;
`;

export const PublicEnvironmentIconBackground = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.v3.surface.sidePanelHeader};
  color: ${({ theme }) => theme.colors.v3.icon.primary};
`;

export const PublicEnvironmentTextContainer = styled.div`
  ${footnoteRegularTypography}

  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;

export const PublicEnvironmentTitle = styled.div`
  ${bodySemiboldTypography}

  color: ${({ theme }) => theme.colors.v3.text.primary};
`;
