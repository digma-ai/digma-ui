import styled from "styled-components";
import { LAYERS } from "../common/App/styles";
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

export const EmptyStateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const MainOverlay = styled(Overlay)`
  align-items: center;
  z-index: ${LAYERS.GLOBAL_OVERLAY};
`;
