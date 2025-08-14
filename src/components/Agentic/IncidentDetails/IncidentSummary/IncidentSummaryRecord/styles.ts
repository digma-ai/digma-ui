import styled from "styled-components";
import {
  bodyRegularTypography,
  subheading1RegularTypography
} from "../../../../common/App/typographies";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid
    ${({ theme }) => theme.colors.v3.surface.sidePanelHeader};

  &:nth-child(even) {
    background: ${({ theme }) => theme.colors.v3.surface.primaryLight};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const Header = styled.div`
  ${bodyRegularTypography}

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Agent = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const DateTime = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const Text = styled.span`
  ${subheading1RegularTypography}

  color: ${({ theme }) => theme.colors.v3.text.primary};
`;
