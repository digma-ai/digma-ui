import styled from "styled-components";
import {
  footnoteRegularTypography,
  subscriptRegularTypography
} from "../../../common/App/typographies";
import { NewButton } from "../../../common/v3/NewButton";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
  background: ${({ theme }) => theme.colors.v3.surface.brandDark};
`;

export const Illustration = styled.img`
  width: 100%;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 8px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Title = styled.span`
  ${subscriptRegularTypography}

  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const Description = styled.span`
  ${footnoteRegularTypography}

  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;

export const StartButton = styled(NewButton)`
  width: 100%;
  justify-content: center;
`;
