import { useMemo } from "react";
import {
  useGetEnvironmentsQuery,
  useGetRecentActivityQuery
} from "../../redux/services/digma";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

export const useRecentActivityData = () => {
  const { data: environments } = useGetEnvironmentsQuery(undefined, {
    pollingInterval: REFRESH_INTERVAL
  });
  const { data: recentActivityData } = useGetRecentActivityQuery(
    {
      environments: environments?.map((env) => env.id) ?? []
    },
    {
      skip: !environments || environments.length === 0,
      pollingInterval: REFRESH_INTERVAL
    }
  );

  const data = useMemo(
    () => ({
      environments: environments ?? [],
      entries: recentActivityData?.entries ?? []
    }),
    [environments, recentActivityData]
  );

  return {
    recentActivityData: data
  };
};
