import styled from "styled-components";
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

export const StyledOverlay = styled(Overlay)`
  padding: 40vh 0 0;
`;
