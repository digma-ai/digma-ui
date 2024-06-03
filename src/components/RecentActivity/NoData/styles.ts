import styled from "styled-components";
import {
  bodyMediumTypography,
  subscriptRegularTypography
} from "../../common/App/typographies";

export const NoDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 19px;
  gap: 8px;
`;

export const NoDataTextContainer = styled.span`
  ${subscriptRegularTypography}

  display: flex;
  flex-direction: column;
  text-align: center;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;

export const NoDataTitle = styled.span`
  ${bodyMediumTypography}

  color: ${({ theme }) => theme.colors.v3.text.primary};
`;
