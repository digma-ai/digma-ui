import styled from "styled-components";
import {
  bodyBoldTypography,
  footnoteRegularTypography
} from "../App/typographies";
import { NewButton } from "../v3/NewButton";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  border-radius: 4px;
  gap: 8px;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
  width: 315px;
  height: fit-content;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.span`
  ${bodyBoldTypography}
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const ButtonsContainer = styled.div`
  display: flex;
  padding-top: 8px;
  gap: 8px;
  justify-content: flex-end;
`;

export const CloseButton = styled.button`
  display: flex;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
`;

export const Description = styled.div`
  ${footnoteRegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const CancelButton = styled(NewButton)`
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.dark};
`;
