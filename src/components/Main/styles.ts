import styled, { css } from "styled-components";
import { Overlay } from "../common/Overlay";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
`;

export const ContentContainer = styled.div`
  height: 100%;
  overflow: auto;
`;

export const CardContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

export const CustomOverlay = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: black;
  opacity: 0.5;
`;

export const MainOverlay = styled(Overlay)<{ $isVisible: boolean }>`
  overflow: hidden;
  padding: 0;
  ${({ $isVisible }) =>
    $isVisible
      ? ""
      : css`
          display: none;
        `}
`;
