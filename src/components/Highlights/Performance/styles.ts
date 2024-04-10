import styled from "styled-components";
import { bodySemiboldTypography } from "../../common/App/typographies";
import { TableText } from "../common/TableText";

export const CardTitle = styled.div`
  ${bodySemiboldTypography}
`;

export const LastCallTableText = styled(TableText)`
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;
