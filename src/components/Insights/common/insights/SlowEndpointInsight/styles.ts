import styled from "styled-components";
import { caption1RegularTypography } from "../../../../common/App/typographies";

export const ContentContainer = styled.div`
  gap: 24px;
  display: flex;
  padding: 8px 0;
`;

export const Description = styled.div`
  color: ${({ theme }) => theme.colors.v3.text.secondary};
  ${caption1RegularTypography}
`;
