import styled from "styled-components";
import {
  bodyBoldTypography,
  subscriptRegularTypography
} from "../../../common/App/typographies";
import { TextField } from "../../../common/v3/TextField";
import { TextInputProps } from "./types";

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

export const NameInput = styled(TextField)<TextInputProps>`
  width: 220px;
  ${({ theme, $isValid }) => {
    if ($isValid) {
      return;
    }

    return {
      background: theme.colors.v3.status.backgroundHigh,
      border: `1px solid ${theme.colors.v3.status.high}`
    };
  }};
`;
