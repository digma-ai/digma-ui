import styled from "styled-components";
import {
  bodySemiboldTypography,
  caption1RegularTypography,
  subscriptMediumTypography,
  subscriptRegularTypography
} from "../../common/App/typographies";

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`;

export const Section = styled.div`
  padding: 8px;
`;

export const Header = styled(Section)`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.v3.surface.primary};
`;

export const TitleContainer = styled.div`
  ${bodySemiboldTypography}

  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const IconContainer = styled.div`
  display: flex;
`;

export const ExpandButton = styled.button`
  ${subscriptMediumTypography}

  display: flex;
  gap: 4px;
  align-items: center;
  color: ${({ theme }) => theme.colors.v3.text.link};
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

export const ExpandButtonIconButtonContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.icon.brandTertiary};
  padding: 2px;
`;

export const ContentContainer = styled(Section)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 8px 12px;
`;

export const StatsContainer = styled.div`
  display: flex;
  gap: 5px;
  flex-grow: 1;
`;

export const Stat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  flex-grow: 1;
`;

export const ServicesStat = styled(Stat)`
  width: 60%;
`;

export const EnvironmentsStat = styled(Stat)`
  width: 40%;
`;

export const StatIconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
`;

export const StatLabel = styled.div`
  ${caption1RegularTypography}
`;

export const StatValue = styled.div`
  ${subscriptRegularTypography}

  display: flex;
  align-items: center;
  gap: 4px;
`;

export const StatValueText = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;
