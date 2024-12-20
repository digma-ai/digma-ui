import styled from "styled-components";

export const Header = styled.header`
  height: 104px;
  padding: 44px 44px 24px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.v3.stroke.tertiary};
  box-sizing: border-box;
`;
