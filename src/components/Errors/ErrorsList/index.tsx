import { useMemo } from "react";
import { useGetErrorsQuery } from "../../../redux/services/digma";
import type { GetErrorsPayload } from "../../../redux/services/types";
import { isString } from "../../../typeGuards/isString";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { EmptyState } from "../EmptyState";
import { ErrorCard } from "../ErrorCard";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import type { ErrorsListProps } from "./types";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

export const ErrorsList = ({
  onErrorSelect,
  spanCodeObjectId,
  methodId,
  environmentId
}: ErrorsListProps) => {
  const payload: GetErrorsPayload = useMemo(
    () => ({
      codeObjectId: [spanCodeObjectId, methodId].filter(isString),
      environment: environmentId ?? ""
    }),
    [spanCodeObjectId, methodId, environmentId]
  );

  const { data } = useGetErrorsQuery(payload, {
    pollingInterval: REFRESH_INTERVAL,
    skip: !environmentId
  });

  if (!data) {
    // TODO: replace with skeletons
    return <EmptyState preset={"loading"} />;
  }

  if (data.length === 0) {
    return <EmptyState preset={"noData"} />;
  }

  const handleErrorCardClick = (errorId: string) => {
    sendUserActionTrackingEvent(trackingEvents.ERROR_CARD_CLICKED);
    onErrorSelect(errorId);
  };

  return (
    <s.Container>
      {data.map((x) => (
        <ErrorCard key={x.uid} data={x} onClick={handleErrorCardClick} />
      ))}
    </s.Container>
  );
};
