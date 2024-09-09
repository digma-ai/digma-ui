import styled from "styled-components";
import {
  bodySemiboldTypography,
  footnoteRegularTypography
} from "../../common/App/typographies";

export const Container = styled.div`
  ${footnoteRegularTypography}

  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border-radius: 4px;
  height: fit-content;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.span`
  ${bodySemiboldTypography}

  text-transform: capitalize;
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
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const MessageContainer = styled.span`
  width: 339px;
`;
