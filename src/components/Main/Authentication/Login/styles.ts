import styled from "styled-components";
import { subscriptRegularTypography } from "../../../common/App/typographies";
import { Link } from "../../../common/v3/Link";
import { StatusMessage } from "../styles";

export const UserIsNotActivatedErrorMessageContainer = styled.div`
  margin-top: 58px;
  padding: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
  margin-bottom: 25px;
`;

export const SuccessMessage = styled(StatusMessage)`
  color: ${({ theme }) => theme.colors.v3.status.success};
`;

export const ResendVerificationEmailLink = styled(Link)`
  padding: 4px;
`;

export const ForgotPasswordMessage = styled.span`
  text-align: center;
  margin-top: 25px;
  ${subscriptRegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;
