import { useMemo } from "react";
import type { DataFetcherConfiguration } from "../../../hooks/useFetchData";
import { useFetchData } from "../../../hooks/useFetchData";
import { actions } from "../actions";
import { EmptyState } from "../EmptyState";
import { ErrorDetailsCardContent } from "./ErrorDetailsCardContent";
import { ErrorDetailsCardHeader } from "./ErrorDetailsCardHeader";
import * as s from "./styles";
import type {
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

  const { data } = useFetchData<GetErrorDetailsPayload, SetErrorDetailsPayload>(
    dataFetcherConfiguration,
    payload
  );

  if (!data) {
    // TODO: replace with skeletons
    return <EmptyState preset={"loading"} />;
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
