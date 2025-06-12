import { useEffect } from "react";
import { useAdminDispatch } from "../../../../../../containers/Admin/hooks";
import { setScope } from "../../../../../../redux/slices/repositorySlice";
import { useStore } from "../../../../../../store/useStore";
import { useInsightsData } from "../../../../../Insights/hooks/useInsightsData";
import * as s from "./styles";
import type { AnalyticsProps } from "./types";

export const Analytics = ({
  query,
  onScopeChange,
  onGoToTab
}: AnalyticsProps) => {
  const { setInsightViewType } = useStore.getState();
  const dispatch = useAdminDispatch();
  const { data, isLoading, refresh } = useInsightsData();

  const handleRefresh = () => {
    refresh();
  };

  // Set the insight view type in zustand store on component mount
  useEffect(() => {
    setInsightViewType("Analytics");
  }, [setInsightViewType]);

  // Set the scope on query change
  useEffect(() => {
    dispatch(
      setScope({
        span: query?.scopedSpanCodeObjectId
          ? {
              spanCodeObjectId: query.scopedSpanCodeObjectId,
              displayName: "",
              methodId: null,
              serviceName: null,
              role: null
            }
          : null,
        code: {
          relatedCodeDetailsList: [],
          codeDetailsList: []
        },
        hasErrors: false,
        issuesInsightsCount: 0,
        analyticsInsightsCount: 0,
        unreadInsightsCount: 0,
        environmentId: query?.environment
      })
    );
  }, [query, dispatch]);

  return (
    <s.Content
      data={data}
      isLoading={isLoading}
      onScopeChange={onScopeChange}
      onGoToTab={onGoToTab}
      onRefresh={handleRefresh}
    />
  );
};
