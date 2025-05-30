import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useTheme } from "styled-components";
import { useStableSearchParams } from "../../../hooks/useStableSearchParams";
import {
  useGetIncidentAgentsQuery,
  useGetIncidentQuery
} from "../../../redux/services/digma";
import { TwoVerticalLinesIcon } from "../../common/icons/16px/TwoVerticalLinesIcon";
import { Direction } from "../../common/icons/types";
import type { ToggleOption } from "../../common/v3/Toggle/types";
import { Tooltip } from "../../common/v3/Tooltip";
import { AdditionalInfo } from "./AdditionalInfo";
import { AgentEvents } from "./AgentEvents";
import { AgentFlowChart } from "./AgentFlowChart";
import { Chat } from "./Chat";
import { IncidentMetaData } from "./IncidentMetaData";
import * as s from "./styles";
import type { AgentViewMode } from "./types";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

const viewModeOptions: ToggleOption<AgentViewMode>[] = [
  {
    label: "Chat",
    value: "chat"
  },
  {
    label: "Summary",
    value: "summary"
  }
];

export const IncidentDetails = () => {
  const theme = useTheme();
  const params = useParams();
  const incidentId = params.id;
  const [searchParams, setSearchParams] = useStableSearchParams();
  const agentId = searchParams.get("agent");
  const [agentViewMode, setAgentViewMode] = useState<AgentViewMode>("summary");

  const { data: agentsData } = useGetIncidentAgentsQuery(
    { id: incidentId ?? "" },
    {
      pollingInterval: REFRESH_INTERVAL,
      skip: !incidentId
    }
  );

  const { data: incidentData } = useGetIncidentQuery(
    { id: incidentId ?? "" },
    {
      pollingInterval: REFRESH_INTERVAL,
      skip: !incidentId
    }
  );

  const handleHomeBreadcrumbClick = () => {
    setSearchParams((params) => {
      params.delete("agent");
      return params;
    });
  };

  const handleAgentBreadcrumbClick = () => {
    setAgentViewMode("summary");
  };

  const handleAgentViewModeChange = (value: AgentViewMode) => {
    setAgentViewMode(value);
  };

  useEffect(() => {
    setAgentViewMode("summary");
  }, [agentId]);

  if (!incidentId) {
    return null;
  }

  const incidentStatus = incidentData?.status;

  const agentName = agentsData?.agents.find(
    (agent) => agent.name === agentId
  )?.display_name;

  const isAgentChatEnabled = agentsData?.agents.find(
    (agent) => agent.name === `${agentId}_chat`
  );

  return (
    <s.Container key={incidentId}>
      <IncidentMetaData />
      <Allotment defaultSizes={[40, 60]} vertical={true}>
        <AgentFlowChart />
        <s.BottomContainer>
          <s.Holder>
            <TwoVerticalLinesIcon
              color={theme.colors.v3.icon.disabled}
              size={16}
              direction={Direction.Left}
            />
          </s.Holder>
          <s.StatusBar>
            <Tooltip title={incidentStatus}>
              <s.StatusBarText>{incidentStatus}</s.StatusBarText>
            </Tooltip>
          </s.StatusBar>
          <s.BottomContentContainer>
            <s.SummaryContainer>
              <s.SummaryContainerToolbar>
                <s.Breadcrumbs>
                  <s.Breadcrumb
                    $isActive={!agentId}
                    onClick={handleHomeBreadcrumbClick}
                  >
                    Home
                  </s.Breadcrumb>
                  {agentId && (
                    <>
                      <s.BreadcrumbsDivider>/</s.BreadcrumbsDivider>
                      <s.AgentBreadcrumb onClick={handleAgentBreadcrumbClick}>
                        {agentName}
                      </s.AgentBreadcrumb>
                    </>
                  )}
                </s.Breadcrumbs>
                {agentId && isAgentChatEnabled && (
                  <s.StyledToggle
                    options={viewModeOptions}
                    onValueChange={handleAgentViewModeChange}
                    value={agentViewMode}
                  />
                )}
              </s.SummaryContainerToolbar>
              {agentId ? (
                agentViewMode === "chat" ? (
                  <Chat key={agentId} />
                ) : (
                  <AgentEvents key={agentId} />
                )
              ) : (
                <s.IncidentSummaryText>
                  {incidentData?.summary}
                </s.IncidentSummaryText>
              )}
            </s.SummaryContainer>
            <s.AdditionalInfoContainer>
              <AdditionalInfo />
            </s.AdditionalInfoContainer>
          </s.BottomContentContainer>
        </s.BottomContainer>
      </Allotment>
    </s.Container>
  );
};
