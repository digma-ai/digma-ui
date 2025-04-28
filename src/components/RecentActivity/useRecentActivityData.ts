import { useEffect, useState } from "react";
import {
  useGetEnvironmentsQuery,
  useGetRecentActivityQuery
} from "../../redux/services/digma";
import type {
  Environment,
  RecentActivityEntry
} from "../../redux/services/types";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

interface RecentActivityData {
  environments: Environment[] | undefined;
  entries: RecentActivityEntry[] | undefined;
  areEnvironmentsLoading: boolean;
  areEntriesLoading: boolean;
}

export const useRecentActivityData = (environmentId: string | undefined) => {
  const [data, setData] = useState<RecentActivityData>({
    environments: undefined,
    entries: undefined,
    areEnvironmentsLoading: false,
    areEntriesLoading: false
  });

  const { data: environments, isFetching: areEnvironmentsFetching } =
    useGetEnvironmentsQuery(undefined, {
      pollingInterval: REFRESH_INTERVAL
    });

  const { data: recentActivityData, isFetching: isRecentActivityDataFetching } =
    useGetRecentActivityQuery(
      {
        environments: environmentId ? [environmentId] : []
      },
      {
        skip: !environments || environments.length === 0 || !environmentId,
        pollingInterval: REFRESH_INTERVAL
      }
    );

  useEffect(() => {
    if (environmentId) {
      setData((prevData) => ({
        ...prevData,
        entries: undefined
      }));
    }
  }, [environmentId]);

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      areEnvironmentsLoading: areEnvironmentsFetching
    }));
  }, [areEnvironmentsFetching]);

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      areEntriesLoading: isRecentActivityDataFetching
    }));
  }, [isRecentActivityDataFetching]);

  useEffect(() => {
    if (environments) {
      setData((prevData) => ({
        ...prevData,
        environments
      }));
    }
  }, [environments]);

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      entries: recentActivityData?.entries
    }));
  }, [recentActivityData]);

  return data;
};
