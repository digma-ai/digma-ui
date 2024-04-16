import styled from "styled-components";
import { subscriptRegularTypography } from "../../../common/App/typographies";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Header = styled.div`
  ${subscriptRegularTypography}

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;
