import styled from "styled-components";
import { subscriptRegularTypography } from "../../../common/App/typographies";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 438px;
  gap: 16px;
`;

export const Description = styled.div`
  ${subscriptRegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;
