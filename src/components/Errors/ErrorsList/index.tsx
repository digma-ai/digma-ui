import { useEffect } from "react";
import { useRefreshData } from "../../../hooks/useRefreshData";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { NewCircleLoader } from "../../common/NewCircleLoader";
import { CheckCircleIcon } from "../../common/icons/38px/CheckCircleIcon";
import { ErrorCard } from "../ErrorCard";
import { GetErrorDetailsPayload } from "../ErrorDetails/types";
import { actions } from "../actions";
import { trackingEvents } from "../tracking";
import { SetErrorsDataPayload } from "../types";
import * as s from "./styles";
import { ErrorsListProps } from "./types";

export const ErrorsList = ({ onErrorSelect }: ErrorsListProps) => {
  const { data, getData } = useRefreshData<
    GetErrorDetailsPayload,
    SetErrorsDataPayload
  >({
    request: {
      action: actions.GET_ERRORS_DATA
    },
    response: {
      action: actions.SET_ERRORS_DATA
    }
  });

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
