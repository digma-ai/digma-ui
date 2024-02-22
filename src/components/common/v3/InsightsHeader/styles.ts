import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px;
  align-items: center;
  gap: 8px;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
`;

export const InfoContainer = styled.div`
  display: flex;
`;

export const Label = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  line-height: 18px;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
`;

export const Tags = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  gap: 8px;
  height: 24px;
`;

export const Active = styled.div`
  display: flex;
  flex-direction: row;
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
