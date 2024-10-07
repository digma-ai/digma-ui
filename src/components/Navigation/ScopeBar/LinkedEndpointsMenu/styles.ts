import styled from "styled-components";
import {
  bodyRegularTypography,
  footnoteRegularTypography
} from "../../../common/App/typographies";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const MenuItem = styled.div`
  display: flex;
  flex-direction: 4px;
  padding: 0 8px;
  gap: 4px;
  align-items: center;
  color: ${({ theme }) => theme.colors.v3.icon.brandSecondary};
  cursor: pointer;
  ${bodyRegularTypography}

  &:hover {
    text-decoration: underline;
  }
`;

export const Title = styled.div`
  ${footnoteRegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
