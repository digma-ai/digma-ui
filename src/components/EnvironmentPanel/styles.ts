import styled from "styled-components";

const BORDER_RADIUS = 8; // in pixels

export const BorderContainer = styled.div`
  padding: 1px;
  border-radius: ${BORDER_RADIUS}px;
  ${/* TODO: Change to another one as export from Digma in not accurate */ ""}
  background: radial-gradient(
    1090.88% 24948.48% at 100% 100%,
    #2f3750 0%,
    #3e489b 48.96%,
    #7b85d7 100%
  );

  box-shadow: 0px 0px 5px rgba(167, 176, 255, 0.25);
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background: #1e1e1e;
  padding: 6px 12px;
  border-radius: 8px;
  position: relative;
  box-sizing: border-box;
  flex-wrap: wrap;
`;

export const LogoContainer = styled.div`
  margin-right: 12px;
`;

export const ViewModeButtonContainer = styled.div`
  margin-left: auto;
`;
