import styled from "styled-components";
import {
  bodyMediumTypography,
  footnoteMediumTypography,
  footnoteRegularTypography,
  subscriptRegularTypography
} from "../../../common/App/typographies";

export const Header = styled.div`
  ${footnoteRegularTypography}

  display: flex;
  gap: 8px;
  height: 32px;
  flex-shrink: 0;
  align-items: center;
  color: ${({ theme }) => theme.colors.v3.text.primary};
  padding: 0 12px;
`;

export const HeaderTitle = styled.span`
  ${footnoteMediumTypography}
`;

export const HeaderDescription = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const IssuesCounter = styled.span`
  margin-left: auto;
`;

export const FoundIssuesNumber = styled.span`
  color: ${({ theme }) => theme.colors.v3.icon.brandSecondary};
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-gap: 8px 10px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  padding: 0 12px 12px;
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

export const EmptyStateContentContainer = styled.div`
  width: 290px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const EmptyStateTextContainer = styled.div`
  ${subscriptRegularTypography}

  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: center;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const EmptyStateTitle = styled.span`
  ${bodyMediumTypography}

  color: ${({ theme }) => theme.colors.v3.text.primary};
`;
