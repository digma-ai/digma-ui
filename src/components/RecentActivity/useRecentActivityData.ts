import { useCallback, useContext, useEffect, useState } from "react";
import { useRecentActivityDispatch } from "../../containers/RecentActivity/hooks";
import { usePrevious } from "../../hooks/usePrevious";
import {
  digmaApi,
  useGetEnvironmentsQuery,
  useGetRecentActivityQuery
} from "../../redux/services/digma";
import { useToggleRecentIndicatorMutation } from "../../redux/services/plugin";
import type {
  Environment,
  RecentActivityEntry
} from "../../redux/services/types";
import { areBackendInfosEqual } from "../../utils/areBackendInfosEqual";
import { ConfigContext } from "../common/App/ConfigContext";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

interface RecentActivityData {
  environments: Environment[] | undefined;
  entries: RecentActivityEntry[] | undefined;
  areEnvironmentsLoading: boolean;
  areEntriesLoading: boolean;
}

export const useRecentActivityData = (environmentId: string | undefined) => {
  const { backendInfo, userInfo } = useContext(ConfigContext);
  const previousBackendInfo = usePrevious(backendInfo);
  const [toggleRecentIndicator] = useToggleRecentIndicatorMutation();
  const dispatch = useRecentActivityDispatch();

  const [data, setData] = useState<RecentActivityData>({
    environments: undefined,
    entries: undefined,
    areEnvironmentsLoading: false,
    areEntriesLoading: false
  });

  const { data: environments, isFetching: areEnvironmentsFetching } =
    useGetEnvironmentsQuery(undefined, {
      pollingInterval: REFRESH_INTERVAL,
      skip: !userInfo?.id && backendInfo?.centralize
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

  const clearData = useCallback(() => {
    setData((prevData) => ({
      ...prevData,
      environments: undefined,
      entries: undefined
    }));
    void toggleRecentIndicator({
      status: false
    });
    dispatch(digmaApi.util.invalidateTags(["Environment", "RecentActivity"]));
  }, [toggleRecentIndicator, dispatch]);

  // Clear data on backend change
  useEffect(() => {
    if (
      previousBackendInfo &&
      backendInfo &&
      !areBackendInfosEqual(previousBackendInfo, backendInfo)
    ) {
      clearData();
    }
  }, [previousBackendInfo, backendInfo, clearData]);

  // Clear data on user change
  useEffect(() => {
    clearData();
  }, [userInfo?.id, clearData]);

  // Clear recent activity data on environment change
  useEffect(() => {
    if (environmentId) {
      setData((prevData) => ({
        ...prevData,
        entries: undefined
      }));
    }
  }, [environmentId, dispatch]);

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
