import styled from "styled-components";
import { footnoteRegularTypography } from "../../../../App/typographies";

export const Container = styled.div`
  ${footnoteRegularTypography}

  display: flex;
  gap: 4px;
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const Label = styled.span`
  text-transform: capitalize;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;
