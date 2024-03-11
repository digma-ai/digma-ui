import styled from "styled-components";
import { subscriptSemiboldTypography } from "../../App/typographies";
import { Button } from "../../v3/Button";

export const HintContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px;
  width: 235px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
  word-break: keep-all;
`;

export const HintHeader = styled.div`
  ${subscriptSemiboldTypography}

  display: flex;
  gap: 4px;
  align-items: center;
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const HintIconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.icon.primary};
`;

export const TryNowButton = styled(Button)`
  margin-top: 8px;
  align-self: flex-end;
`;
