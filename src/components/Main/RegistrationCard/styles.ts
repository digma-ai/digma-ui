import styled from "styled-components";
import {
  bodyMediumTypography,
  subscriptRegularTypography
} from "../../common/App/typographies";
import { RegisterFrom } from "../../common/RegisterForm";
import { Button } from "../../common/v3/Button";
import { Link } from "../../common/v3/Link";

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
  padding: 32px 10px 10px;
  align-items: center;
  border-radius: 12px 12px 0 0;
  position: relative;
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
`;

export const CrossButton = styled(Button)`
  padding: 0;
  position: absolute;
  top: 16px;
  right: 9px;
`;

export const Description = styled.div`
  ${subscriptRegularTypography}

  color: ${({ theme }) => theme.colors.v3.text.secondary};
  max-width: 308px;
  text-align: center;
`;

export const FormContainer = styled.div`
  max-width: 308px;
  display: flex;
  gap: 12px;
  flex-direction: column;
`;

export const Register = styled(RegisterFrom)`
  flex-direction: column;

  form {
    gap: 2px;
  }
`;

export const SlackLink = styled(Link)`
  ${bodyMediumTypography}
  display: flex;
  align-items: center;
  gap: 4px;
  height: 60px;
  text-decoration: underline;
`;