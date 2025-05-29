import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import {
  useAgenticDispatch,
  useAgenticSelector
} from "../../../containers/Agentic/hooks";
import {
  useGetIncidentAgentsQuery,
  useGetIncidentQuery
} from "../../../redux/services/digma";
import { setAgentId } from "../../../redux/slices/incidentsSlice";
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
import type { SummaryViewMode } from "./types";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

const viewModeOptions: ToggleOption<SummaryViewMode>[] = [
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
  const incidentId = useAgenticSelector((state) => state.incidents.incidentId);
  const agentId = useAgenticSelector((state) => state.incidents.agentId);
  const dispatch = useAgenticDispatch();
  const [summaryViewMode, setSummaryViewMode] =
    useState<SummaryViewMode>("summary");

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
    dispatch(setAgentId(null));
  };

  const handleAgentBreadcrumbClick = () => {
    setSummaryViewMode("summary");
  };

  const handleViewModeChange = (value: SummaryViewMode) => {
    setSummaryViewMode(value);
  };

  useEffect(() => {
    setSummaryViewMode("summary");
  }, [agentId]);

  if (!incidentId) {
    return null;
  }

  const incidentStatus = incidentData?.status;

  const agentName = agentsData?.agents.find(
    (agent) => agent.name === agentId
  )?.display_name;

  const key = `${incidentId}-${agentId}`;

  return (
    <s.Container>
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
                      <s.AgentBreadcrumb
                        $isActive={summaryViewMode === "chat"}
                        onClick={handleAgentBreadcrumbClick}
                      >
                        {agentName}
                      </s.AgentBreadcrumb>
                    </>
                  )}
                </s.Breadcrumbs>
                {agentId && (
                  <s.StyledToggle
                    options={viewModeOptions}
                    onValueChange={handleViewModeChange}
                    value={summaryViewMode}
                  />
                )}
              </s.SummaryContainerToolbar>
              {agentId ? (
                summaryViewMode === "chat" ? (
                  <Chat key={key} />
                ) : (
                  <AgentEvents key={key} />
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
