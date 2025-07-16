import { useEffect } from "react";
import { useStore } from "../../../../../../store/useStore";
import { useInsightsData } from "../../../../../Insights/hooks/useInsightsData";
import * as s from "./styles";
import type { AnalyticsProps } from "./types";

export const Analytics = ({ onScopeChange, onGoToTab }: AnalyticsProps) => {
  const { setInsightViewType } = useStore.getState();
  const { data, isLoading, refresh } = useInsightsData();

  const handleRefresh = () => {
    refresh();
  };

  // Set the insight view type in zustand store on component mount
  useEffect(() => {
    setInsightViewType("Analytics");
  }, [setInsightViewType]);

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
