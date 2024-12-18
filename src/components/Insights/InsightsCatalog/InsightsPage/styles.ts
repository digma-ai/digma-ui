import styled from "styled-components";
import { Link } from "../../../common/Link";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  overflow: auto;
  padding: 0 8px;
`;

export const TroubleshootingLink = styled(Link)`
  font-size: 14px;
  text-decoration: underline;
`;
