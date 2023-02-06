import styled from "styled-components";

export const Button = styled.button`
  width: 22px;
  height: 22px;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    border-radius: 4px;
    background: #49494d;
  }

  &:disabled {
    background: transparent;
    cursor: initial;
  }
`;
