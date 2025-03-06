import { useEffect, useState } from "react";
import { dispatcher } from "../../../../../dispatcher";
import { useLoading } from "../../../../../hooks/useLoading";
import { platform } from "../../../../../platform";
import { useGetSpanCodeLocationsQuery } from "../../../../../redux/services/digma";
import type { GetSpanCodeLocationsResponse } from "../../../../../redux/services/types";
import type { SpanInfo } from "../../../../../types";
import { groupBy } from "../../../../../utils/groupBy";
import { actions } from "../../../actions";
import type { CodeLocationsData } from "../types";

const formatCodeLocation = (codeLocation: string) =>
  codeLocation.replace("$_$", ".");

const getCodeLocations = (
  data: GetSpanCodeLocationsResponse | undefined,
  methodCodeObjectId: string | undefined | null
): string[] => {
  const codeLocations: string[] = [];

  if (methodCodeObjectId && methodCodeObjectId.length > 0) {
    codeLocations.push(formatCodeLocation(methodCodeObjectId));
    return codeLocations;
  }

  const spans = data?.navigationEntry.closestParentSpans ?? [];
  const spanDistanceGroups = groupBy(spans, (x) => x.distance);
  const sortedDistances = Object.keys(spanDistanceGroups)
    .map(Number)
    .sort((a, b) => a - b);

  for (const distance of sortedDistances) {
    const spanGroup = spanDistanceGroups[distance];
    for (const span of spanGroup) {
      const methodCodeObjectId = span.methodCodeObjectId;
      if (methodCodeObjectId && methodCodeObjectId.length > 0) {
        codeLocations.push(formatCodeLocation(methodCodeObjectId));
        return codeLocations;
      }
    }
  }

  return codeLocations;
};

export const useCodeLocations = (
  environmentId: string | undefined,
  spanInfo: SpanInfo | null
) => {
  const [isLoading, setIsLoading] = useLoading(false);
  const [codeLocations, setCodeLocations] = useState<string[]>([]);
  const { data, isFetching: areCodeLocationsLoading } =
    useGetSpanCodeLocationsQuery(
      {
        environment: environmentId ?? "",
        spanCodeObjectId: spanInfo?.spanCodeObjectId ?? ""
      },
      {
        skip: !environmentId || !spanInfo?.spanCodeObjectId
      }
    );

  useEffect(() => {
    const handleCodeLocationsData = (data: unknown) => {
      const codeLocationsData = data as CodeLocationsData;
      setCodeLocations(codeLocationsData.codeLocations);
      setIsLoading(false);
    };

    dispatcher.addActionListener(
      actions.SET_CODE_LOCATIONS,
      handleCodeLocationsData
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_CODE_LOCATIONS,
        handleCodeLocationsData
      );
    };
  }, [setIsLoading]);

  useEffect(() => {
    const spanCodeObjectId = spanInfo?.spanCodeObjectId;
    const methodCodeObjectId = spanInfo?.methodCodeObjectId ?? undefined;

    setIsLoading(true);
    window.sendMessageToDigma({
      action: actions.GET_CODE_LOCATIONS,
      payload: {
        spanCodeObjectId,
        methodCodeObjectId
      }
    });
  }, [spanInfo, setIsLoading]);

  return {
    isLoading: platform === "JetBrains" ? isLoading : areCodeLocationsLoading,
    codeLocations:
      platform === "JetBrains"
        ? codeLocations
        : getCodeLocations(data, spanInfo?.methodCodeObjectId)
  };
};
