import styled from "styled-components";
import {
  subheading1BoldTypography,
  subscriptRegularTypography
} from "../../../common/App/typographies";
import { Link } from "../../../common/v3/Link";
import { NewButton } from "../../../common/v3/NewButton";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 64px;
  gap: 24px;
`;

export const Illustration = styled.img`
  height: 220px;
`;

export const TextContainer = styled.div`
  ${subscriptRegularTypography}
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
  max-width: 324px;
`;

export const Title = styled.span`
  ${subheading1BoldTypography}
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const ResendButton = styled(NewButton)`
  max-width: 250px;
`;

export const IActivatedMyAccountLink = styled(Link)`
  margin-top: 14px;
`;
