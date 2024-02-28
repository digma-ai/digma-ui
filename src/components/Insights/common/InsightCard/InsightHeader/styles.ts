import styled from "styled-components";
import { bodyMediumTypography } from "../../../../common/App/typographies";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const InfoContainer = styled.div`
  display: flex;
`;

export const Label = styled.div`
  ${bodyMediumTypography}

  display: flex;
  gap: 4px;
  align-items: center;
`;

export const Tags = styled.div`
  margin-left: auto;
  display: flex;
  gap: 8px;
  height: 24px;
  font-size: 12px;
  line-height: 16px;
`;

export const Active = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
  padding: 4px;
`;

export const Indicator = styled.div`
  border-radius: 50%;
  width: 6px;
  height: 6px;
  background: ${({ theme }) => theme.colors.v3.status.success};
`;
