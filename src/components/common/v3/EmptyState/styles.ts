import styled from "styled-components";
import {
  bodySemiboldTypography,
  footnoteRegularTypography
} from "../../../common/App/typographies";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 4px;
  white-space: pre-line;
  ${footnoteRegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  max-width: 210px;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.v3.surface.gray};
  background: ${({ theme }) => theme.colors.v3.surface.sidePanelHeader};
`;

export const Title = styled.span`
  ${bodySemiboldTypography}
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;
