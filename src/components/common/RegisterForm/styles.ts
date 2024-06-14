import styled from "styled-components";
import {
  bodyBoldTypography,
  subscriptRegularTypography
} from "../App/typographies";
import { Button } from "../v3/Button";
import { Spinner } from "../v3/Spinner";
import { TextField } from "../v3/TextField";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 24px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${bodyBoldTypography}
  color:  ${({ theme }) => theme.colors.v3.text.primary};
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  ${subscriptRegularTypography}
  color:  ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const Form = styled.form`
  display: flex;
  gap: 8px;
`;

export const CircleLoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubmitButton = styled(Button)`
  height: 28px;
  width: 100%;

  span {
    width: 100%;
  }
`;

export const TextInput = styled(TextField)`
  padding: 6px 8px;
  max-width: 134px;
`;

export const Loader = styled(Spinner)`
  align-items: center;
`;
