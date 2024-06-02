import { useEffect, useState } from "react";
import { useRefreshData } from "../../../hooks/useRefreshData";
import { isNull } from "../../../typeGuards/isNull";
import { isNumber } from "../../../typeGuards/isNumber";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { formatTimeDistance } from "../../../utils/formatTimeDistance";
import { ProductionAffectionBar } from "../../Insights/InsightsCatalog/InsightsPage/insightCards/common/InsightCard/ProductionAffectionBar";
import { NewCircleLoader } from "../../common/NewCircleLoader";
import { ChevronIcon as ChevronIcon12px } from "../../common/icons/12px/ChevronIcon";
import { ChevronIcon as ChevronIcon16px } from "../../common/icons/16px/ChevronIcon";
import { WrenchIcon } from "../../common/icons/16px/WrenchIcon";
import { Direction } from "../../common/icons/types";
import { Card } from "../../common/v3/Card";
import { Tooltip } from "../../common/v3/Tooltip";
import { EmptyStateContainer } from "../ErrorsList/styles";
import { HIGH_SEVERITY_SCORE_THRESHOLD, Score } from "../Score";
import { actions } from "../actions";
import { getErrorMethodId } from "../getErrorMethodId";
import { trackingEvents } from "../tracking";
import { FlowStack } from "./FlowStack";
import * as s from "./styles";
import {
  ErrorDetailsProps,
  FlowInfo,
  GetErrorDetailsPayload,
  ServiceInfo,
  SetErrorDetailsPayload
} from "./types";

export const ErrorDetails = ({ id, onGoToAllErrors }: ErrorDetailsProps) => {
  const [currentFlowStack, setCurrentFlowStack] = useState(0);

  const { data, getData } = useRefreshData<
    GetErrorDetailsPayload,
    SetErrorDetailsPayload
  >({
    request: {
      action: actions.GET_ERROR_DETAILS,
      payload: { errorId: id }
    },
    response: {
      action: actions.SET_ERROR_DETAILS
    }
  });

  useEffect(() => {
    getData();
  }, []);

  if (!data) {
    // TODO: restyle
    return (
      <EmptyStateContainer>
        <NewCircleLoader size={32} />
      </EmptyStateContainer>
    );
  }

  const name = data.details.name;
  const location = getErrorMethodId(data.details.sourceCodeObjectId || "");
  const scoreInfo = data.details.scoreInfo;
  const services = data.details.originServices
    .filter((x) => !isNull(x) && !isNull(x.serviceName))
    .map((x) => (x as ServiceInfo).serviceName as string);
  const startedString = formatTimeDistance(data.details.firstOccurenceTime);
  const lastString = formatTimeDistance(data.details.lastOccurenceTime);

  const flows = data.details.errors.filter((x) => !isNull(x)) as FlowInfo[];
  const currentFlow = flows[currentFlowStack];

  const isPreviousFlowButtonDisabled = currentFlowStack === 0;
  const isNextFlowButtonDisabled = currentFlowStack === flows.length - 1;

  const handleBackButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.BACK_BUTTON_CLICKED);

    onGoToAllErrors();
  };

  const handleFlowPaginationButtonClick = (flowNumber: number) => {
    sendUserActionTrackingEvent(trackingEvents.FLOW_PAGINATION_BUTTON_CLICKED);

    setCurrentFlowStack(flowNumber);
  };

  return (
    <Card
      header={
        <s.Header>
          <s.TitleRow>
            <s.BackButton onClick={handleBackButtonClick}>
              {/* // TODO: check icon */}
              <ChevronIcon16px
                direction={Direction.LEFT}
                size={16}
                color={"currentColor"}
              />
            </s.BackButton>
            <Tooltip title={name}>
              <s.Title>{name}</s.Title>
            </Tooltip>
            <s.ScoreContainer>
              <Score data={scoreInfo} />
            </s.ScoreContainer>
          </s.TitleRow>
          <s.SubtitleRow>
            <span>From </span>
            <Tooltip title={location}>
              <s.LocationName>{location}</s.LocationName>
            </Tooltip>
          </s.SubtitleRow>
        </s.Header>
      }
      content={
        <s.Content>
          {scoreInfo.score > HIGH_SEVERITY_SCORE_THRESHOLD && (
            <ProductionAffectionBar isTicketCreated={false} />
          )}
          {services.length > 0 && (
            <s.StyledKeyValue label={"Affected services"}>
              <s.ServicesContainer>
                <s.ServicesIconContainer>
                  {/* // TODO: check icon */}
                  <WrenchIcon color={"currentColor"} size={16} />
                </s.ServicesIconContainer>
                <span>{services.join(", ")}</span>
              </s.ServicesContainer>
            </s.StyledKeyValue>
          )}
          <s.ColumnsContainer>
            <s.StyledKeyValue label={"Started"}>
              {startedString}
            </s.StyledKeyValue>
            <s.StyledKeyValue label={"Last"}>{lastString}</s.StyledKeyValue>
            {isNumber(data.details.dayAvg) && (
              <s.StyledKeyValue label={"Frequency"}>
                {data.details.dayAvg}/day
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
                {/* // TODO: check icon */}
                <ChevronIcon12px
                  direction={Direction.LEFT}
                  size={12}
                  color={"currentColor"}
                />
              </s.IconButton>
              <span>
                Flow Stacks{" "}
                <s.CurrentFlowNumber>
                  {currentFlowStack + 1}
                </s.CurrentFlowNumber>
                /{data.details.errors.length}
              </span>
              <s.IconButton
                onClick={() =>
                  handleFlowPaginationButtonClick(currentFlowStack + 1)
                }
                disabled={isNextFlowButtonDisabled}
              >
                {/* // TODO: check icon */}
                <ChevronIcon12px
                  direction={Direction.RIGHT}
                  size={12}
                  color={"currentColor"}
                />
              </s.IconButton>
            </s.FlowPagination>
            <FlowStack data={currentFlow} />
          </s.FlowsContainer>
        </s.Content>
      }
    />
  );
};
