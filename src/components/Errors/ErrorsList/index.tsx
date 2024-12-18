import { useMemo } from "react";
import type { DataFetcherConfiguration } from "../../../hooks/useFetchData";
import { useFetchData } from "../../../hooks/useFetchData";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { EmptyState } from "../EmptyState";
import { ErrorCard } from "../ErrorCard";
import { actions } from "../actions";
import { trackingEvents } from "../tracking";
import type { GetErrorsDataPayload, SetErrorsDataPayload } from "../types";
import * as s from "./styles";
import type { ErrorsListProps } from "./types";

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
    return <EmptyState preset={"loading"} />;
  }

  if (data.errors.length === 0) {
    return <EmptyState preset={"noData"} />;
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
