import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { useTheme } from "styled-components";
import {
  useAgenticDispatch,
  useAgenticSelector
} from "../../../containers/Agentic/hooks";
import { useGetIncidentQuery } from "../../../redux/services/digma";
import { setAgentId } from "../../../redux/slices/incidentsSlice";
import { TwoVerticalLinesIcon } from "../../common/icons/16px/TwoVerticalLinesIcon";
import { Direction } from "../../common/icons/types";
import { NewButton } from "../../common/v3/NewButton";
import { AgentFlowChart } from "./AgentFlowChart";
import { AgentLiveStream } from "./AgentLiveStream";
import * as s from "./styles";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

export const IncidentDetails = () => {
  const theme = useTheme();
  const incidentId = useAgenticSelector((state) => state.incidents.incidentId);
  const agentId = useAgenticSelector((state) => state.incidents.agentId);
  const dispatch = useAgenticDispatch();

  const { data: incidentData } = useGetIncidentQuery(
    { id: incidentId ?? "" },
    {
      pollingInterval: REFRESH_INTERVAL,
      skip: !incidentId
    }
  );

  const handleGoBackToSummaryButtonClick = () => {
    dispatch(setAgentId(null));
  };

  if (!incidentId) {
    return null;
  }

  return (
    <s.Container>
      <Allotment defaultSizes={[30, 70]} vertical={true}>
        <AgentFlowChart />
        <s.StepSummaryContainer>
          <s.Holder>
            <TwoVerticalLinesIcon
              color={theme.colors.v3.icon.disabled}
              size={16}
              direction={Direction.Left}
            />
          </s.Holder>
          <s.StepSummaryContentContainer>
            <s.StatusBar>{incidentData?.status}</s.StatusBar>
            <s.StepSummaryTextContainer>
              {agentId ? (
                <>
                  <NewButton
                    label={"Go back to summary"}
                    onClick={handleGoBackToSummaryButtonClick}
                  />
                  <AgentLiveStream />
                </>
              ) : (
                incidentData?.summary
              )}
            </s.StepSummaryTextContainer>
          </s.StepSummaryContentContainer>
        </s.StepSummaryContainer>
      </Allotment>
    </s.Container>
  );
};
