import { useMemo } from "react";
import {
  DataFetcherConfiguration,
  useFetchData
} from "../../../hooks/useFetchData";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { NewCircleLoader } from "../../common/NewCircleLoader";
import { ErrorCard } from "../ErrorCard";
import { NoDataEmptyState } from "../NoDataEmptyState";
import { actions } from "../actions";
import { EmptyStateContainer } from "../styles";
import { trackingEvents } from "../tracking";
import { GetErrorsDataPayload, SetErrorsDataPayload } from "../types";
import * as s from "./styles";
import { ErrorsListProps } from "./types";

const dataFetcherConfiguration: DataFetcherConfiguration = {
  requestAction: actions.GET_ERRORS_DATA,
  responseAction: actions.SET_ERRORS_DATA,
  refreshWithInterval: true,
  refreshOnPayloadChange: true
};

export const ErrorsList = ({
  onErrorSelect,
  spanCodeObjectId,
  methodId
}: ErrorsListProps) => {
  const payload = useMemo(
    () => ({
      spanCodeObjectId,
      methodId
    }),
    [spanCodeObjectId, methodId]
  );

  const { data } = useFetchData<GetErrorsDataPayload, SetErrorsDataPayload>(
    dataFetcherConfiguration,
    payload
  );

  if (!data) {
    // TODO: replace with skeletons
    return (
      <EmptyStateContainer>
        <NewCircleLoader size={32} />
      </EmptyStateContainer>
    );
  }

  if (data.errors.length === 0) {
    return <NoDataEmptyState />;
  }

  const handleErrorCardClick = (errorId: string) => {
    sendUserActionTrackingEvent(trackingEvents.ERROR_CARD_CLICKED);
    onErrorSelect(errorId);
  };

  return (
    <s.Container>
      {data.errors.map((x) => (
        <ErrorCard key={x.uid} data={x} onClick={handleErrorCardClick} />
      ))}
    </s.Container>
  );
};
