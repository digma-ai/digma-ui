import styled from "styled-components";
import { KeyValue } from "../common/InsightCard/KeyValue";
import { ContentContainer } from "../styles";

export const Container = styled(ContentContainer)`
  gap: 4px;
`;

export const DescriptionColumn = styled(KeyValue)`
  flex-grow: 2;
`;
