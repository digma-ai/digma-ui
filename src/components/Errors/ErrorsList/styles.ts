import styled from "styled-components";
import {
  bodySemiboldTypography,
  footnoteRegularTypography
} from "../../common/App/typographies";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  overflow: auto;
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  justify-content: center;
  flex-grow: 1;
  align-self: center;
`;

export const EmptyStateIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.v3.icon.secondary};
  background: ${({ theme }) => theme.colors.v3.surface.sidePanelHeader};
`;

export const EmptyStateTextContainer = styled.div`
  ${footnoteRegularTypography}

  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 4px;
  padding-top: 4px;
  padding-bottom: 4px;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;

export const EmptyStateTitle = styled.div`
  ${bodySemiboldTypography}

  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;
