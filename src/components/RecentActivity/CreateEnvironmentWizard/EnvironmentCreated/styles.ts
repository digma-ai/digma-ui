import styled from "styled-components";
import {
  bodyBoldTypography,
  footnoteRegularTypography
} from "../../../common/App/typographies";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 288px;
  gap: 16px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 4px;
`;

export const Title = styled.div`
  ${bodyBoldTypography}
`;

export const Description = styled.div`
  ${footnoteRegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const CheckMarkIconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.status.success};
`;
