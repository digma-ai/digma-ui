import { useEffect, useState } from "react";
import { dispatcher } from "../../../../dispatcher";
import { InsightType, SpanInfo } from "../../../../types";
import { actions } from "../../actions";
import { GenericCodeObjectInsight } from "../../types";
import { useLoading } from "./useLoading";
import { useSpanDataSource } from "./useSpanDataSource";

export const useEndpointDataSource = <
  TInsight extends GenericCodeObjectInsight
>(
  spanInfo: SpanInfo | null,
  insightType: InsightType
) => {
  const [isLoading, setIsLoading] = useLoading(true);
  const [spanInsight, setSpanInsight] = useState<TInsight | null>(null);

  const {
    isLoading: isInsightMetaIsLoading,
    codeLocations,
    commitInfos
  } = useSpanDataSource(spanInfo, spanInsight);

  useEffect(() => {
    const handleSpanInsightData = (data: unknown) => {
      const insightData = data as { insight: TInsight | null };
      if (insightData.insight && insightData.insight.type === insightType) {
        setSpanInsight(insightData.insight);
      } else {
        setSpanInsight(null);
      }

      setIsLoading(false);
    };

    dispatcher.addActionListener(
      actions.SET_SPAN_INSIGHT,
      handleSpanInsightData
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_SPAN_INSIGHT,
        handleSpanInsightData
      );
    };
  }, [insightType]);

  useEffect(() => {
    const spanCodeObjectId = spanInfo?.spanCodeObjectId;
    setIsLoading(true);

    window.sendMessageToDigma({
      action: actions.GET_SPAN_INSIGHT,
      payload: {
        spanCodeObjectId,
        insightType
      }
    });
  }, [insightType, spanInfo]);

  const onReloadSpanInsight = () => {
    if (!spanInfo?.spanCodeObjectId) {
      return;
    }

    setIsLoading(true);
    window.sendMessageToDigma({
      action: actions.GET_SPAN_INSIGHT,
      payload: {
        spanCodeObjectId: spanInfo?.spanCodeObjectId,
        insightType
      }
    });
  };

  return {
    isLoading: isLoading || isInsightMetaIsLoading,
    codeLocations,
    spanInsight,
    commitInfos,
    onReloadSpanInsight
  };
};
