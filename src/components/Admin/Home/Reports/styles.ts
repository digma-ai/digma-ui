import styled from "styled-components";
import { HomeSection } from "../HomeSection";

export const Container = styled.div`
  display: flex;
  padding: 24px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
`;

export const Section = styled(HomeSection)`
  flex-grow: 1;
`;

export const WidgetsContainer = styled.div`
  display: flex;
  gap: 16px;
  overflow: auto;
`;
