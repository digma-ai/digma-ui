import { useCallback, useContext, useEffect, useState } from "react";
import { useRecentActivityDispatch } from "../../containers/RecentActivity/hooks";
import { usePrevious } from "../../hooks/usePrevious";
import { logger } from "../../logging";
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
  const previousUserId = usePrevious(userInfo?.id);
  const previousBackendInfo = usePrevious(backendInfo);
  const previousEnvironmentId = usePrevious(environmentId);
  const [toggleRecentIndicator] = useToggleRecentIndicatorMutation();
  const dispatch = useRecentActivityDispatch();

  const isInitialized = userInfo?.id && backendInfo;

  const [data, setData] = useState<RecentActivityData>({
    environments: undefined,
    entries: undefined,
    areEnvironmentsLoading: false,
    areEntriesLoading: false
  });

  const clearData = useCallback(() => {
    logger.info("Clearing recent activity data");
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
      logger.info("Backend info changed, clearing recent activity data");
      logger.info("Previous Backend Info:", previousBackendInfo);
      logger.info("Current Backend Info:", backendInfo);
      clearData();
    }
  }, [previousBackendInfo, backendInfo, clearData]);

  // Clear data on user change
  useEffect(() => {
    if (previousUserId !== userInfo?.id) {
      logger.info("User info changed, clearing recent activity data");
      logger.info("User ID:", userInfo?.id);
      clearData();
    }
  }, [previousUserId, userInfo?.id, clearData]);

  // Clear recent activity data on environment change
  useEffect(() => {
    if (previousEnvironmentId !== environmentId) {
      logger.info("Environment ID changed, clearing recent activity data");
      logger.info("Environment ID:", environmentId);
      setData((prevData) => ({
        ...prevData,
        entries: undefined
      }));
    }
  }, [previousEnvironmentId, environmentId, dispatch]);

  const { data: environments, isFetching: areEnvironmentsFetching } =
    useGetEnvironmentsQuery(undefined, {
      pollingInterval: REFRESH_INTERVAL,
      skip: !isInitialized
    });

  const { data: recentActivityData, isFetching: isRecentActivityDataFetching } =
    useGetRecentActivityQuery(
      {
        environments: environmentId ? [environmentId] : []
      },
      {
        skip:
          !isInitialized ||
          !environments ||
          environments.length === 0 ||
          !environmentId,
        pollingInterval: REFRESH_INTERVAL,
        refetchOnMountOrArgChange: true
      }
    );

  useEffect(() => {
    setData({
      environments,
      entries: recentActivityData?.entries,
      areEnvironmentsLoading: areEnvironmentsFetching,
      areEntriesLoading: isRecentActivityDataFetching
    });
  }, [
    environments,
    recentActivityData?.entries,
    areEnvironmentsFetching,
    isRecentActivityDataFetching
  ]);

  return data;
};
