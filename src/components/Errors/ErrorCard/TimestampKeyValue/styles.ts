import styled from "styled-components";
import { subscriptRegularTypography } from "../../../common/App/typographies";

export const Container = styled.div`
  ${subscriptRegularTypography}

  display: flex;
  gap: 4px;
  align-items: center;
  overflow: hidden;
`;

export const Label = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;

export const TimeDistance = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
