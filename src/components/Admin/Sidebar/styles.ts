import styled from "styled-components";
import { menuItemStyles } from "./NavMenu/NavMenuItem/styles";

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 230px;
  padding: 40px 24px 32px;
  border-right: 1px solid ${({ theme }) => theme.colors.v3.stroke.tertiary};
  box-sizing: border-box;
  flex-shrink: 0;
`;

export const Logo = styled.img`
  align-self: start;
  height: 24px;
`;

export const LogoutButton = styled.button`
  ${menuItemStyles}

  font-family: inherit;
  border: none;
  background: none;
  margin-top: auto;
`;
