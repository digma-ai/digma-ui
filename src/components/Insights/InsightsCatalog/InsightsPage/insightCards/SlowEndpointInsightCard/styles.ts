import styled from "styled-components";
import { KeyValue } from "../common/InsightCard/KeyValue";

export const ContentContainer = styled.div`
  padding: 8px 0;
  display: flex;
`;

export const DescriptionColumn = styled(KeyValue)`
  flex-grow: 2;
`;
