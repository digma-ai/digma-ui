import styled from "styled-components";
import {
  bodyMediumTypography,
  bodyRegularTypography,
  caption1RegularTypography,
  subscriptRegularTypography
} from "../../common/App/typographies";
import { Button } from "../../common/v3/Button";
import { Link } from "../../common/v3/Link";

export const Container = styled.div`
  padding: 10px;
  height: 100%;
  gap: 16px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;

export const Message = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: center;
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.colors.v3.text.white};
  ${bodyMediumTypography}
`;

export const Description = styled.div`
  color: ${({ theme }) => theme.colors.v3.text.secondary};
  ${subscriptRegularTypography}
`;

export const ToggleOptions = styled.div`
  padding: 4px 8px;
  height: 16px;
  width: 95px;

  ${subscriptRegularTypography}
`;

export const Footer = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: center;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const ContentContainer = styled(FormContainer)`
  margin-top: 50%;
`;

export const Inputs = styled.div`
  gap: 8px;
  display: flex;
  flex-direction: column;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
`;

export const ErrorMessage = styled.span`
  display: flex;
  font-size: 13px;
  height: 15px;
  align-items: center;
  align-self: flex-start;
  color: ${({ theme }) => theme.colors.v3.status.high};
`;

export const SubmitButton = styled(Button)`
  align-self: flex-end;
  width: 100%;
  display: flex;
  justify-content: center;
  height: 28px;
`;

export const InputForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const InfoMessage = styled.div`
  ${caption1RegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const SlackLink = styled(Link)`
  ${bodyRegularTypography}
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  text-decoration: underline;
  padding: 15px;
`;
