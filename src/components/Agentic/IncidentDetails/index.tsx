import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useTheme } from "styled-components";
import { useAgenticDispatch } from "../../../containers/Agentic/hooks";
import { useStableSearchParams } from "../../../hooks/useStableSearchParams";
import {
  useGetIncidentAgentsQuery,
  useGetIncidentQuery
} from "../../../redux/services/digma";
import { setStatusDetails } from "../../../redux/slices/incidentsSlice";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { TwoVerticalLinesIcon } from "../../common/icons/16px/TwoVerticalLinesIcon";
import { InfoCircleIcon } from "../../common/icons/InfoCircleIcon";
import { Direction } from "../../common/icons/types";
import { NewIconButton } from "../../common/v3/NewIconButton";
import { Spinner } from "../../common/v3/Spinner";
import type { ToggleOption } from "../../common/v3/Toggle/types";
import { Tooltip } from "../../common/v3/Tooltip";
import { AgentFlowChart } from "../common/AgentFlowChart";
import { trackingEvents } from "../tracking";
import { AdditionalInfo } from "./AdditionalInfo";
import { AgentSummary } from "./AgentSummary";
import { IncidentAgentChat } from "./IncidentAgentChat";
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

  const dispatch = useAgenticDispatch();

  const { data: agentsData } = useGetIncidentAgentsQuery(
    { id: incidentId ?? "" },
    {
      pollingInterval: REFRESH_INTERVAL,
      skip: !incidentId
    }
  );

  const {
    data: incidentData,
    isLoading,
    error
  } = useGetIncidentQuery(
    { id: incidentId ?? "" },
    {
      pollingInterval: REFRESH_INTERVAL,
      skip: !incidentId
    }
  );

  const handleHomeBreadcrumbClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.INCIDENT_HOME_BREADCRUMB_CLICKED,
      { agentName: agentId ?? "" }
    );
    setSearchParams((params) => {
      params.delete("agent");
      return params;
    });
  };

  const handleAgentViewModeChange = (value: AgentViewMode) => {
    sendUserActionTrackingEvent(
      trackingEvents.INCIDENT_AGENT_VIEW_MODE_TOGGLE_CHANGED,
      { agentName: agentId ?? "", mode: value }
    );
    setAgentViewMode(value);
  };

  const agent = agentsData?.agents.find((agent) => agent.name === agentId);
  const currentStatusData = agent?.status_details[agent?.status];

  const handleInfoButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.INCIDENT_AGENT_INFO_BUTTON_CLICKED,
      {
        agentName: agentId ?? ""
      }
    );

    if (!agent || !currentStatusData?.status_info) {
      return;
    }

    dispatch(
      setStatusDetails({
        status: agent.status,
        info: currentStatusData.status_info
      })
    );
  };

  useEffect(() => {
    setAgentViewMode("summary");
  }, [agentId]);

  if (!incidentId) {
    return null;
  }

  const incidentStatus = incidentData?.description;

  const isAgentChatEnabled = agentsData?.agents.find(
    (agent) => agent.name === `${agentId}_chat`
  );

  const handleAgentSelect = (id: string | null) => {
    setSearchParams((params) => {
      if (id) {
        params.set("agent", id);
      } else {
        params.delete("agent");
      }
      return params;
    });
  };

  if (!incidentData && isLoading) {
    return (
      <s.Container>
        <s.LoadingContainer>
          <Spinner size={32} />
        </s.LoadingContainer>
      </s.Container>
    );
  }

  if (!incidentData && error) {
    return (
      <s.Container>
        <s.LoadingContainer>Failed to get incident details</s.LoadingContainer>
      </s.Container>
    );
  }

  return (
    <s.Container key={incidentId}>
      <IncidentMetaData />
      <Allotment defaultSizes={[40, 60]} vertical={true}>
        {agentsData ? (
          <AgentFlowChart
            agents={agentsData.agents}
            onAgentSelect={handleAgentSelect}
            selectedAgentId={agentId}
          />
        ) : (
          <s.LoadingContainer>
            <Spinner size={32} />
          </s.LoadingContainer>
        )}
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
                      <s.AgentBreadcrumb>{agent?.name}</s.AgentBreadcrumb>
                      {currentStatusData?.status_info && (
                        <Tooltip title={"Additional details"}>
                          <NewIconButton
                            icon={InfoCircleIcon}
                            onClick={handleInfoButtonClick}
                            buttonType={"secondaryBorderless"}
                            size={"large"}
                          />
                        </Tooltip>
                      )}
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
                  <IncidentAgentChat key={agentId} />
                ) : (
                  <AgentSummary key={agentId} />
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
