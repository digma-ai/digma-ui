import styled from "styled-components";
import {
  footnoteRegularTypography,
  subscriptRegularTypography
} from "../../../../../../../common/App/typographies";
import { Link } from "../../../../../../../common/v3/Link";

export const CloseButton = styled.button`
  display: flex;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export const CloseButtonIconContainer = styled.div`
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  display: flex;
  padding-top: 4px;
  padding-right: 4px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: end;
`;

export const Description = styled.div`
  ${footnoteRegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 8px 8px;
`;

export const StyledLink = styled(Link)`
  ${subscriptRegularTypography}
  text-decoration: underline;
  padding: 4px 0;
`;
