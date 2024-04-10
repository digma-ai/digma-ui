import styled from "styled-components";
import {
  bodyBoldTypography,
  subscriptRegularTypography
} from "../../../common/App/typographies";
import { Button } from "../../../common/v3/Button";
import { Spinner } from "../../../common/v3/Spinner";
import { TextField } from "../../../common/v3/TextField";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
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
  flex-direction: row;
  gap: 8px;
  height: 32px;
`;

export const CircleLoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubmitButton = styled(Button)`
  height: 100%;
`;

export const TextInput = styled(TextField)`
  padding: 6px 8px;
`;

export const Loader = styled(Spinner)`
  align-items: center;
`;
