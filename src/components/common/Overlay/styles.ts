import styled from "styled-components";

import { LAYERS } from "../App/styles";

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgb(18 18 21 / 70%);
  display: flex;
  justify-content: center;
  padding: 80px 0;
  overflow: auto;
  z-index: ${LAYERS.OVERLAY};
`;
