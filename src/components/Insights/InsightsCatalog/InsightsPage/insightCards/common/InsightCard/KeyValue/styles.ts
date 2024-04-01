import styled from "styled-components";
import {
  footnoteRegularTypography,
  subscriptRegularTypography
} from "../../../../../../../common/App/typographies";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Key = styled.div`
  ${footnoteRegularTypography}

  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const Value = styled.div`
  ${subscriptRegularTypography}

  color: ${({ theme }) => theme.colors.v3.text.primary};
`;
