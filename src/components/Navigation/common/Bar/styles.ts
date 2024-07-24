import styled from "styled-components";

export const Container = styled.div`
  height: 32px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
  box-shadow: 0 0 4.9px 0 rgb(0 0 0 / 13%);
  display: flex;
  flex-grow: 1;
  padding: 5px 8px;
  overflow: hidden;
`;
