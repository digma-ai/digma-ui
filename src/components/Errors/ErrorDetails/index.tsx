import { useEffect, useMemo, useState } from "react";
import {
  DataFetcherConfiguration,
  useFetchData
} from "../../../hooks/useFetchData";
import { usePrevious } from "../../../hooks/usePrevious";
import { isNull } from "../../../typeGuards/isNull";
import { isNumber } from "../../../typeGuards/isNumber";
import { isString } from "../../../typeGuards/isString";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { formatTimeDistance } from "../../../utils/formatTimeDistance";
import { ProductionAffectionBar } from "../../Insights/InsightsCatalog/InsightsPage/insightCards/common/InsightCard/ProductionAffectionBar";
import { NewCircleLoader } from "../../common/NewCircleLoader";
import { ChevronIcon as ChevronIcon12px } from "../../common/icons/12px/ChevronIcon";
import { ChevronIcon as ChevronIcon16px } from "../../common/icons/16px/ChevronIcon";
import { WrenchIcon } from "../../common/icons/16px/WrenchIcon";
import { Direction } from "../../common/icons/types";
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

const dataFetcherConfiguration: DataFetcherConfiguration = {
  requestAction: actions.GET_ERROR_DETAILS,
  responseAction: actions.SET_ERROR_DETAILS
};

export const ErrorDetails = ({ id, onGoToAllErrors }: ErrorDetailsProps) => {
  const previousId = usePrevious(id);
  const [currentFlowStack, setCurrentFlowStack] = useState(0);

  const payload = useMemo(
    () => ({
      errorId: id
    }),
    [id]
  );

  const { data, getData } = useFetchData<
    GetErrorDetailsPayload,
    SetErrorDetailsPayload
  >(dataFetcherConfiguration, payload);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (isString(previousId) && previousId !== id) {
      setCurrentFlowStack(0);
    }
  }, [previousId, id]);

  if (!data) {
    // TODO: replace with skeletons
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
  const startedTooltip = new Date(data.details.firstOccurenceTime).toString();
  const startedString = formatTimeDistance(data.details.firstOccurenceTime);
  const lastTooltip = new Date(data.details.lastOccurenceTime).toString();
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
    <s.Container>
      <s.ErrorDetailsCard
        header={
          <s.Header>
            <s.TitleRow>
              <s.BackButton onClick={handleBackButtonClick}>
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
    </s.Container>
  );
};
