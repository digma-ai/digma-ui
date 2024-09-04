import styled from "styled-components";
import { bodySemiboldTypography } from "../../App/typographies";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  gap: 4px;
  flex-grow: 1;
`;

export const IconContainer = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.v3.surface.sidePanelHeader};
  color: ${({ theme }) => theme.colors.v3.surface.gray};
`;

export const Title = styled.div`
  ${bodySemiboldTypography}
  text-align: center;
  color: ${({ theme }) => theme.colors.v3.text.primary};
  margin-top: 4px;
`;
