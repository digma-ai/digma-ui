import styled from "styled-components";
import {
  caption1RegularTypography,
  footnoteBoldTypography
} from "../../../../common/App/typographies";

export const Container = styled.div`
  ${footnoteBoldTypography}

  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.v3.status.low};
  background: ${({ theme }) => theme.colors.v3.status.backgroundLow};
  display: flex;
  align-items: center;
  padding: 4px 8px;
  gap: 4px;
`;

export const IconContainer = styled.div`
  color: ${({ theme }) => theme.colors.v3.status.low};
  display: flex;
`;

export const Title = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.primary};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const TicketStatus = styled.div`
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const Info = styled.span`
  ${caption1RegularTypography}
`;
