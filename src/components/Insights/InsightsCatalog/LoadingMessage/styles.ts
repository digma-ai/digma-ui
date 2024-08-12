import styled from "styled-components";
import {
  bodySemiboldTypography,
  footnoteRegularTypography
} from "../../../common/App/typographies";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 100%;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.v3.surface.sidePanelHeader};
  color: ${({ theme }) => theme.colors.v3.surface.gray};
`;

export const Title = styled.span`
  ${bodySemiboldTypography}

  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const TextContainer = styled.div`
  ${footnoteRegularTypography}

  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: center;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  max-width: 210px;
`;
