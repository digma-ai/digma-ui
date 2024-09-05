import { useEffect, useMemo } from "react";
import {
  DataFetcherConfiguration,
  useFetchData
} from "../../../hooks/useFetchData";
import { trackingEvents as globalEvents } from "../../../trackingEvents";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { useHistory } from "../../Main/useHistory";
import { TAB_IDS } from "../../Navigation/Tabs/types";
import { NewCircleLoader } from "../../common/NewCircleLoader";
import { ErrorIcon } from "../../common/icons/16px/ErrorIcon";
import { CheckCircleIcon } from "../../common/icons/38px/CheckCircleIcon";
import { NewButton } from "../../common/v3/NewButton";
import { NewEmptyState } from "../../common/v3/NewEmptyState";
import { ErrorCard } from "../ErrorCard";
import { actions } from "../actions";
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
  const { goTo } = useHistory();
  const payload = useMemo(
    () => ({
      spanCodeObjectId,
      methodId
    }),
    [spanCodeObjectId, methodId]
  );

  const handleSeeAllAssetsClick = () => {
    sendUserActionTrackingEvent(globalEvents.GOT_TO_ALL_ASSETS_CLICKED, {
      source: "Error tab"
    });
    goTo(`/${TAB_IDS.ASSETS}`);
  };

  const { data, getData } = useFetchData<
    GetErrorsDataPayload,
    SetErrorsDataPayload
  >(dataFetcherConfiguration, payload);

  useEffect(() => {
    getData();
  }, [getData]);

  if (!spanCodeObjectId) {
    return (
      <s.EmptyStateContainer>
        <NewEmptyState
          icon={ErrorIcon}
          title={"Select an asset to view errors"}
          content={
            <>
              <s.EmptyStateTextContainer>
                <span>The Errors tab shows details for</span>
                <span>exceptions for each Digma-tracked</span>
                <span>asset. See all tracked assets on the</span>
                <span>Assets page.</span>
              </s.EmptyStateTextContainer>

              <NewButton
                buttonType="primary"
                onClick={handleSeeAllAssetsClick}
                label="See all assets"
              />
            </>
          }
        />
      </s.EmptyStateContainer>
    );
  }

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
