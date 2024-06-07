import { useEffect, useState } from "react";
import { usePrevious } from "../../../../hooks/usePrevious";
import { isNull } from "../../../../typeGuards/isNull";
import { isNumber } from "../../../../typeGuards/isNumber";
import { isString } from "../../../../typeGuards/isString";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { formatTimeDistance } from "../../../../utils/formatTimeDistance";
import { roundTo } from "../../../../utils/roundTo";
import { ProductionAffectionBar } from "../../../Insights/InsightsCatalog/InsightsPage/insightCards/common/InsightCard/ProductionAffectionBar";
import { ChevronIcon as ChevronIcon12px } from "../../../common/icons/12px/ChevronIcon";
import { WrenchIcon } from "../../../common/icons/16px/WrenchIcon";
import { Direction } from "../../../common/icons/types";
import { Tooltip } from "../../../common/v3/Tooltip";
import { HIGH_SEVERITY_SCORE_THRESHOLD } from "../../Score";
import { trackingEvents } from "../../tracking";
import { FlowInfo, ServiceInfo } from "../types";
import { FlowStack } from "./FlowStack";
import * as s from "./styles";
import { ErrorDetailsCardContentProps } from "./types";

export const ErrorDetailsCardContent = ({
  id,
  data
}: ErrorDetailsCardContentProps) => {
  const previousId = usePrevious(id);
  const [currentFlowStack, setCurrentFlowStack] = useState(0);

  useEffect(() => {
    if (isString(previousId) && previousId !== id) {
      setCurrentFlowStack(0);
    }
  }, [previousId, id]);

  const services = data.originServices
    .filter((x) => !isNull(x) && !isNull(x.serviceName))
    .map((x) => (x as ServiceInfo).serviceName as string);
  const startedTooltip = new Date(data.firstOccurenceTime).toString();
  const startedString = formatTimeDistance(data.firstOccurenceTime);
  const lastTooltip = new Date(data.lastOccurenceTime).toString();
  const lastString = formatTimeDistance(data.lastOccurenceTime);
  const avgPerDay = data.dayAvg;

  const flows = data.errors.filter((x) => !isNull(x)) as FlowInfo[];
  const currentFlow = flows[currentFlowStack];

  const isPreviousFlowButtonDisabled = currentFlowStack === 0;
  const isNextFlowButtonDisabled = currentFlowStack === flows.length - 1;

  const handleFlowPaginationButtonClick = (flowNumber: number) => {
    sendUserActionTrackingEvent(trackingEvents.FLOW_PAGINATION_BUTTON_CLICKED);

    setCurrentFlowStack(flowNumber);
  };

  return (
    <s.Container>
      {data.scoreInfo.score > HIGH_SEVERITY_SCORE_THRESHOLD && (
        <ProductionAffectionBar isTicketCreated={false} />
      )}
      {services.length > 0 && (
        <s.StyledKeyValue label={"Affected services"}>
          <s.ServicesContainer>
            <s.ServicesIconContainer>
              <WrenchIcon color={"currentColor"} size={16} />
            </s.ServicesIconContainer>
            <span>{services.join(", ")}</span>
          </s.ServicesContainer>
        </s.StyledKeyValue>
      )}
      <s.ColumnsContainer>
        <s.StyledKeyValue label={"Started"}>
          <Tooltip title={startedTooltip}>
            <span>{startedString}</span>
          </Tooltip>
        </s.StyledKeyValue>
        <s.StyledKeyValue label={"Last"}>
          <Tooltip title={lastTooltip}>
            <span>{lastString}</span>
          </Tooltip>
        </s.StyledKeyValue>
        {isNumber(avgPerDay) && (
          <s.StyledKeyValue label={"Frequency"}>
            {roundTo(avgPerDay, 1)}/day
          </s.StyledKeyValue>
        )}
      </s.ColumnsContainer>
      <s.FlowsContainer>
        <s.FlowPagination>
          <s.IconButton
            onClick={() =>
              handleFlowPaginationButtonClick(currentFlowStack - 1)
            }
            disabled={isPreviousFlowButtonDisabled}
          >
            <ChevronIcon12px
              direction={Direction.LEFT}
              size={12}
              color={"currentColor"}
            />
          </s.IconButton>
          <span>
            Flow Stacks{" "}
            <s.FlowsCountNumber>
              <s.CurrentFlowNumber>{currentFlowStack + 1}</s.CurrentFlowNumber>/
              {data.errors.length}
            </s.FlowsCountNumber>
          </span>
          <s.IconButton
            onClick={() =>
              handleFlowPaginationButtonClick(currentFlowStack + 1)
            }
            disabled={isNextFlowButtonDisabled}
          >
            <ChevronIcon12px
              direction={Direction.RIGHT}
              size={12}
              color={"currentColor"}
            />
          </s.IconButton>
        </s.FlowPagination>
        <FlowStack data={currentFlow} key={currentFlowStack} />
      </s.FlowsContainer>
    </s.Container>
  );
};
