import { useEffect, useMemo } from "react";
import {
  DataFetcherConfiguration,
  useFetchData
} from "../../../hooks/useFetchData";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { NewCircleLoader } from "../../common/NewCircleLoader";
import { CheckCircleIcon } from "../../common/icons/38px/CheckCircleIcon";
import { ErrorCard } from "../ErrorCard";
import { actions } from "../actions";
import { trackingEvents } from "../tracking";
import { GetErrorsDataPayload, SetErrorsDataPayload } from "../types";
import * as s from "./styles";
import { ErrorsListProps } from "./types";

const dataFetcherConfiguration: DataFetcherConfiguration = {
  requestAction: actions.GET_ERRORS_DATA,
  responseAction: actions.SET_ERRORS_DATA
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

  const { data, getData } = useFetchData<
    GetErrorsDataPayload,
    SetErrorsDataPayload
  >(dataFetcherConfiguration, payload);

  useEffect(() => {
    getData();
  }, [getData]);

  if (!data) {
    // TODO: replace with skeletons
    return (
      <s.EmptyStateContainer>
        <NewCircleLoader size={32} />
      </s.EmptyStateContainer>
    );
  }

  if (data.errors.length === 0) {
    return (
      <s.EmptyStateContainer>
        <s.EmptyStateIconContainer>
          <CheckCircleIcon size={38} color={"currentColor"} />
        </s.EmptyStateIconContainer>
        <s.EmptyStateTextContainer>
          <s.EmptyStateTitle>
            <span>Good News!</span>
            <span>No Errors Recorded Yet</span>
          </s.EmptyStateTitle>
          You should return to this page if any exceptions do occur to see more
          details.
        </s.EmptyStateTextContainer>
      </s.EmptyStateContainer>
    );
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
