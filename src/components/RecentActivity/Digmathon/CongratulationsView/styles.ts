import styled from "styled-components";
import {
  bodyRegularTypography,
  footnoteRegularTypography,
  subscriptRegularTypography
} from "../../../common/App/typographies";
import { Link } from "../../../common/v3/Link";

export const Container = styled.div`
  background: url("/assets/images/confettiBackground.svg") no-repeat center
    top / cover;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

export const IconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.status.success};
`;

export const TextContainer = styled.div`
  ${footnoteRegularTypography}

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
  width: 288px;
`;

export const Title = styled.span`
  ${bodyRegularTypography}

  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const ContactLink = styled(Link)`
  ${subscriptRegularTypography}

  padding: 4px 0;
`;
