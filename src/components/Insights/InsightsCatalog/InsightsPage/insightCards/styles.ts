import styled from "styled-components";
import { caption1RegularTypography } from "../../../../common/App/typographies";

export const Description = styled.div`
  color: ${({ theme }) => theme.colors.v3.text.secondary};

  ${caption1RegularTypography}
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
