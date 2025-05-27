import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;

  .react-flow {
    background: ${({ theme }) => theme.colors.v3.surface.secondary};

    --xy-edge-stroke-default: ${({ theme }) =>
      theme.colors.v3.surface.brandPrimary};

    /* stylelint-disable-next-line selector-class-pattern */
    .react-flow__handle {
      cursor: default;
    }
  }
`;
