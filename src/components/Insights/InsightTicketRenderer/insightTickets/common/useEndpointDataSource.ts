import { useGetSpanInsightQuery } from "../../../../../redux/services/digma";
import type { InsightType, SpanInfo } from "../../../../../types";
import type { GenericCodeObjectInsight } from "../../../types";
import { useSpanDataSource } from "./useSpanDataSource";

export const useEndpointDataSource = <T extends GenericCodeObjectInsight>(
  spanInfo: SpanInfo | null,
  insightType: InsightType,
  environmentId: string
) => {
  const { data, isFetching, refetch } = useGetSpanInsightQuery(
    {
      spanCodeObjectId: spanInfo?.spanCodeObjectId ?? "",
      insightType,
      environment: environmentId
    },
    {
      skip: !spanInfo
    }
  );

  const {
    isLoading: isInsightMetaIsLoading,
    codeLocations,
    commitInfos
  } = useSpanDataSource<T>(spanInfo, (data as T) ?? null, environmentId);

  const handleReloadSpanInsight = () => {
    void refetch();
  };

  return {
    isLoading: isFetching || isInsightMetaIsLoading,
    codeLocations,
    spanInsight: (data as T) ?? null,
    commitInfos,
    onReloadSpanInsight: handleReloadSpanInsight
  };
};
