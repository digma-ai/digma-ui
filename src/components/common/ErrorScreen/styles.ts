import styled from "styled-components";
import { bodyRegularTypography } from "../App/typographies";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  height: 100%;
`;

export const TextContainer = styled.div`
  ${bodyRegularTypography}
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const Title = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;
