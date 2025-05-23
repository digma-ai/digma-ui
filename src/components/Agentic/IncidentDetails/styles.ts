import styled from "styled-components";
import { subheading2RegularTypography } from "../../common/App/typographies";

export const Container = styled.div`
  display: flex;
  height: 100%;

  .sash {
    --sash-size: 24px;
  }

  .sash-hover {
    --focus-border: none;
  }

  &&&&& .split-view-view::before {
    --separator-border: ${({ theme }) => theme.colors.v3.surface.primary};
  }
`;

export const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24px 24px;
  height: 100%;
  box-sizing: border-box;
`;

export const Holder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  flex-shrink: 0;
`;

export const ContentContainer = styled.div`
  display: flex;
  gap: 24px;
  height: 100%;
`;

export const BottomContentContainer = styled.div`
  display: flex;
  gap: 24px;
  height: 100%;
  overflow: auto;
`;

export const Breadcrumbs = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  font-size: 20px;
  height: 40px;
`;

export const BreadcrumbsDivider = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.disabled};
`;

export const Breadcrumb = styled.span`
  cursor: pointer;
`;

export const ActiveBreadcrumb = styled(Breadcrumb)`
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.v3.surface.brandPrimary};
  color: ${({ theme }) => theme.colors.v3.text.primary};
  padding: 8px 12px;
`;

export const StatusBar = styled.div`
  ${subheading2RegularTypography};
  color: ${({ theme }) => theme.colors.v3.text.white};
  display: flex;
  padding: 10px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.v3.status.success};
  background: ${({ theme }) => theme.colors.v3.status.backgroundSuccess};
  height: 24px;
  flex-shrink: 0;
  margin-bottom: 24px;
`;

export const SummaryContainer = styled.div`
  display: flex;
  padding: 24px;
  flex-direction: column;
  flex-grow: 1;
  gap: 24px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
  width: 60%;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 40%;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
`;
