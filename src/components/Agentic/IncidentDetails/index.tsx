import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { useTheme } from "styled-components";
import { useAgenticSelector } from "../../../containers/Agentic/hooks";
import { useGetIncidentQuery } from "../../../redux/services/digma";
import { TwoVerticalLinesIcon } from "../../common/icons/16px/TwoVerticalLinesIcon";
import { Direction } from "../../common/icons/types";
import { AgentFlowChart } from "./AgentFlowChart";
import * as s from "./styles";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

export const IncidentDetails = () => {
  const theme = useTheme();
  const incidentId = useAgenticSelector((state) => state.incidents.incidentId);

  const { data } = useGetIncidentQuery(
    { id: incidentId ?? "" },
    {
      pollingInterval: REFRESH_INTERVAL,
      skip: !incidentId
    }
  );

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
            <s.StatusBar>{data?.status}</s.StatusBar>
            <s.StepSummaryTextContainer>
              {data?.summary}
            </s.StepSummaryTextContainer>
          </s.StepSummaryContentContainer>
        </s.StepSummaryContainer>
      </Allotment>
    </s.Container>
  );
};
