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

export const StepSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24px 24px;
  height: 100%;
  box-sizing: border-box;
`;

export const StepSummaryContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex-grow: 1;
`;

export const Holder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
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
`;

export const StepSummaryTextContainer = styled.div`
  display: flex;
  padding: 24px;
  flex-direction: column;
  flex-grow: 1;
  gap: 24px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
`;
