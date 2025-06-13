import styled from "styled-components";
import { subheading1RegularTypography } from "../../../common/App/typographies";

export const HumanMessage = styled.div`
  background: ${({ theme }) => theme.colors.v3.surface.highlight};
  padding: 8px;
  border-radius: 8px;
  align-self: flex-end;
`;

export const AgentMessage = styled.div`
  ${subheading1RegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;
