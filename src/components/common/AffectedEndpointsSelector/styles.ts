import styled from "styled-components";
import { footnoteRegularTypography } from "../App/typographies";

export const ListHeader = styled.div`
  display: flex;
  gap: 4px;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};

  ${footnoteRegularTypography}
`;

export const ServicePart = styled.div`
  width: 151px;
`;
