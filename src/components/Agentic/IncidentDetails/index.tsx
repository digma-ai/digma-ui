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
import { Tooltip } from "../../common/v3/Tooltip";
import { AdditionalInfo } from "./AdditionalInfo";
import { AgentEvents } from "./AgentEvents";
import { AgentFlowChart } from "./AgentFlowChart";
import { Chat } from "./Chat";
import { IncidentMetaData } from "./IncidentMetaData";
import * as s from "./styles";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

export const IncidentDetails = () => {
  const theme = useTheme();
  const incidentId = useAgenticSelector((state) => state.incidents.incidentId);
  const agentId = useAgenticSelector((state) => state.incidents.agentId);
  const dispatch = useAgenticDispatch();
  const [isChatMode, setIsChatMode] = useState(false);

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
    setIsChatMode(false);
  };

  const handleChatButtonClick = () => {
    setIsChatMode(true);
  };

  useEffect(() => {
    setIsChatMode(false);
  }, [agentId]);

  if (!incidentId) {
    return null;
  }

  const incidentStatus = incidentData?.status;

  const agentName = agentsData?.agents.find(
    (agent) => agent.name === agentId
  )?.display_name;

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
              <s.Breadcrumbs>
                <s.BaseBreadcrumb onClick={handleHomeBreadcrumbClick}>
                  Home
                </s.BaseBreadcrumb>
                {agentId && (
                  <>
                    <s.BreadcrumbsDivider>/</s.BreadcrumbsDivider>
                    <s.Breadcrumb
                      $isActive={!isChatMode}
                      onClick={handleAgentBreadcrumbClick}
                    >
                      {agentName}
                    </s.Breadcrumb>
                    <s.Breadcrumb
                      $isActive={isChatMode}
                      onClick={handleChatButtonClick}
                    >
                      Chat
                    </s.Breadcrumb>
                  </>
                )}
              </s.Breadcrumbs>
              {agentId ? (
                isChatMode ? (
                  <Chat />
                ) : (
                  <AgentEvents />
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
