import styled from "styled-components";
import { EnvironmentChip } from "./EnvironmentChip";

export const CarouselEnvironmentChip = styled(EnvironmentChip)`
  width: 100%;
`;

export const EnvironmentsContainer = styled.div`
  display: flex;
  gap: 4px;

  & > * {
    flex: 1 1 0;
  }
`;
