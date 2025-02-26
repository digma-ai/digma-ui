import styled from "styled-components";

import { subscriptBoldTypography } from "../../../common/App/typographies";

export const Button = styled.button`
  width: 180px;
  height: 36px;
  border-radius: 8px;
  padding: 0 12px;
  background: ${({ theme }) => theme.colors.v3.surface.brandTertiary};
  box-shadow: 0 0 4.9px 0 rgb(0 0 0 / 13%);
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;
  color: ${({ theme }) => theme.colors.v3.icon.brandSecondary};
  flex-shrink: 0;
`;

export const EnvironmentName = styled.span`
  ${subscriptBoldTypography}
  color: ${({ theme }) => theme.colors.v3.text.primary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ChevronIconContainer = styled.div`
  margin-left: auto;
  display: flex;
`;
