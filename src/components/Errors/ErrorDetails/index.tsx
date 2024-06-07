import { useEffect, useMemo } from "react";
import {
  DataFetcherConfiguration,
  useFetchData
} from "../../../hooks/useFetchData";
import { NewCircleLoader } from "../../common/NewCircleLoader";
import { EmptyStateContainer } from "../ErrorsList/styles";
import { actions } from "../actions";
import { ErrorDetailsCardContent } from "./ErrorDetailsCardContent";
import { ErrorDetailsCardHeader } from "./ErrorDetailsCardHeader";
import * as s from "./styles";
import {
  ErrorDetailsProps,
  GetErrorDetailsPayload,
  SetErrorDetailsPayload
} from "./types";

const dataFetcherConfiguration: DataFetcherConfiguration = {
  requestAction: actions.GET_ERROR_DETAILS,
  responseAction: actions.SET_ERROR_DETAILS,
  refreshWithInterval: true,
  refreshOnPayloadChange: true
};

export const ErrorDetails = ({ id, onGoToAllErrors }: ErrorDetailsProps) => {
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

  if (!data) {
    // TODO: replace with skeletons
    return (
      <EmptyStateContainer>
        <NewCircleLoader size={32} />
      </EmptyStateContainer>
    );
  }

  const handleGoBack = () => {
    onGoToAllErrors();
  };

  return (
    <s.Container>
      <s.ErrorDetailsCard
        header={
          <ErrorDetailsCardHeader onGoBack={handleGoBack} data={data.details} />
        }
        content={<ErrorDetailsCardContent id={id} data={data.details} />}
      />
    </s.Container>
  );
};
