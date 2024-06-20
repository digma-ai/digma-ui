import styled from "styled-components";
import {
  bodyRegularTypography,
  subscriptRegularTypography
} from "../../../common/App/typographies";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: center;
`;

export const Header = styled.div`
  ${bodyRegularTypography}
  color:  ${({ theme }) => theme.colors.v3.text.primary};
`;

export const Description = styled.div`
  ${subscriptRegularTypography}
  color:  ${({ theme }) => theme.colors.v3.text.secondary};
  max-width: 204px;
`;
