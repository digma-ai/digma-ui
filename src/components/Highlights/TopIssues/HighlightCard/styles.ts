import styled from "styled-components";
import {
  bodySemiboldTypography,
  caption1RegularTypography
} from "../../../common/App/typographies";

export const Header = styled.div`
  ${bodySemiboldTypography}

  display: flex;
  align-items: center;
  gap: 8px;
`;

export const InfoContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.icon.disabled};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const AssetNameContainer = styled.div`
  ${caption1RegularTypography}

  display: flex;
  flex-direction: column;
  gap: 4px;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;
