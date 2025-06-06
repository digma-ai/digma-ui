import styled from "styled-components";
import { heading2BoldTypography } from "../../common/App/typographies";
import { AgentFlowChart } from "../IncidentDetails/AgentFlowChart";
import { PromptInput } from "../common/PromptInput";

export const Container = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Header = styled.header`
  ${heading2BoldTypography}

  display: flex;
  padding: 32px 24px 24px;
  align-items: flex-start;
  gap: var(--spacing-guides-715-rem-24-px, 24px);
  align-self: stretch;
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const StyledAgentFlowChart = styled(AgentFlowChart)`
  .react-flow {
    --xy-edge-stroke-default: #3e404a; /* TODO: change to color from the theme */

    /* stylelint-disable-next-line selector-class-pattern */
    .react-flow__edge path {
      stroke-dasharray: 5;
    }
  }
`;

export const StyledIncidentPromptInput = styled(PromptInput)`
  height: 105px;

  & > textarea {
    height: 100%;

    &::placeholder {
      color: ${({ theme }) => theme.colors.v3.text.primary};
    }
  }
`;

export const StyledAgentPromptInput = styled(PromptInput)`
  height: 96px;
  ${/* TODO: change to color from the theme */ ""}
  border: 1px solid #6063f6;

  & > textarea {
    height: 100%;

    &::placeholder {
      color: ${({ theme }) => theme.colors.v3.text.primary};
    }
  }
`;
