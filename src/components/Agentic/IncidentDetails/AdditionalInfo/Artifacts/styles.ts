import styled from "styled-components";
import { Link as CommonLink } from "../../../../common/v3/Link";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 24px;
`;

export const ArtifactInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
`;

export const ArtifactIconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
`;

export const Link = styled(CommonLink)`
  font-size: 16px;
  line-height: 18px;
  text-decoration: underline;
`;

export const ArtifactId = styled.span`
  font-size: 16px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;
