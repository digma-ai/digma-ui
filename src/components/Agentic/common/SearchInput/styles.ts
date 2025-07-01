import styled from "styled-components";
import { subscriptRegularTypography } from "../../../common/App/typographies";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-grow: 1;
  height: 30px;
`;

export const Input = styled.input`
  ${subscriptRegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.primary};
  height: 100%;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.dark};
  background: ${({ theme }) => theme.colors.v3.surface.primary};
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 13%);
  border-radius: 4px;
  box-sizing: border-box;
  padding: 6px 8px 6px 24px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.v3.text.primary};
  }
`;

export const IconContainer = styled.div`
  position: absolute;
  left: 8px;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
`;
