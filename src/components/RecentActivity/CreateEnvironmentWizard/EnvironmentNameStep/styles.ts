import styled from "styled-components";
import {
  bodyBoldTypography,
  subscriptRegularTypography
} from "../../../common/App/typographies";
import { TextField } from "../../../common/v3/TextField";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 438px;
  gap: 16px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 10px;
`;

export const Title = styled.div`
  ${bodyBoldTypography}
`;

export const Description = styled.div`
  ${subscriptRegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const InputContainer = styled.div`
  display: flex;
  gap: 8px;
  height: 28px;
`;

export const NameInput = styled(TextField)`
  width: 220px;
`;

export const CheckMarkIconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.status.success};
`;

export const ErrorIconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.status.high};
`;
