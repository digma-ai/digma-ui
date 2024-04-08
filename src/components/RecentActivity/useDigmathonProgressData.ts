import { useEffect, useState } from "react";
import { actions as globalActions } from "../../actions";
import { dispatcher } from "../../dispatcher";
import { usePrevious } from "../../hooks/usePrevious";
import { InsightType } from "../Insights/types";
import { getDigmathonInsightCardData } from "./Digmathon/getDigmathonInsightData";
import { actions } from "./actions";
import { DigmathonInsightData, DigmathonProgressData } from "./types";

const REQUIRED_COUNT_OF_FOUND_ISSUES = 3;

const getData = () => {
  window.sendMessageToDigma({
    action: actions.GET_DIGMATHON_PROGRESS_DATA
  });
};

const getIsFound = (
  data: DigmathonProgressData | undefined,
  type: InsightType
) => {
  if (!data) {
    return false;
  }

  switch (type) {
    case InsightType.EndpointQueryOptimizationV2:
    case InsightType.EndpointQueryOptimization:
    case InsightType.SpanQueryOptimization:
      return data.insights.some((x) =>
        [
          InsightType.EndpointQueryOptimizationV2,
          InsightType.EndpointQueryOptimization,
          InsightType.SpanQueryOptimization
        ].includes(x)
      );
    case InsightType.EndpointSpanNPlusOne:
    case InsightType.EndpointSpaNPlusOne:
    case InsightType.SpaNPlusOne:
      return data.insights.some((x) =>
        [
          InsightType.EndpointSpanNPlusOne,
          InsightType.EndpointSpaNPlusOne,
          InsightType.SpaNPlusOne
        ].includes(x)
      );
    case InsightType.EndpointBottleneck:
    case InsightType.SpanEndpointBottleneck:
      return data.insights.some((x) =>
        [
          InsightType.EndpointBottleneck,
          InsightType.SpanEndpointBottleneck
        ].includes(x)
      );
    default:
      return data.insights.includes(type);
  }
};

export const useDigmathonProgressData = () => {
  const [data, setData] = useState<DigmathonInsightData[]>();
  const foundIssuesCount = data?.filter((x) => x.isFound).length || 0;
  const isDigmathonCompleted =
    foundIssuesCount >= REQUIRED_COUNT_OF_FOUND_ISSUES;
  const previousIsDigmathonCompleted = usePrevious(isDigmathonCompleted);

  useEffect(() => {
    getData();

    const handleSetDigmaProgressData = (data: unknown) => {
      const payload = data as DigmathonProgressData;
      const insights: DigmathonInsightData[] = [
        {
          type: InsightType.SpanScaling,
          data: getDigmathonInsightCardData(InsightType.SpanScaling),
          isFound: getIsFound(payload, InsightType.SpanScaling)
        },
        {
          type: InsightType.SpanNexus,
          data: getDigmathonInsightCardData(InsightType.SpanNexus),
          isFound: getIsFound(payload, InsightType.SpanNexus)
        },
        {
          type: InsightType.SpanQueryOptimization,
          data: getDigmathonInsightCardData(InsightType.SpanQueryOptimization),
          isFound: getIsFound(payload, InsightType.SpanQueryOptimization)
        },
        {
          type: InsightType.HotSpot,
          data: getDigmathonInsightCardData(InsightType.HotSpot),
          isFound: getIsFound(payload, InsightType.HotSpot)
        },
        {
          type: InsightType.SpaNPlusOne,
          data: getDigmathonInsightCardData(InsightType.SpaNPlusOne),
          isFound: getIsFound(payload, InsightType.SpaNPlusOne)
        },
        {
          type: InsightType.EndpointSessionInView,
          data: getDigmathonInsightCardData(InsightType.EndpointSessionInView),
          isFound: getIsFound(payload, InsightType.EndpointSessionInView)
        },
        {
          type: InsightType.SpanUsages,
          data: getDigmathonInsightCardData(InsightType.SpanUsages),
          isFound: getIsFound(payload, InsightType.SpanUsages)
        },
        {
          type: InsightType.EndpointHighNumberOfQueries,
          data: getDigmathonInsightCardData(
            InsightType.EndpointHighNumberOfQueries
          ),
          isFound: getIsFound(payload, InsightType.EndpointHighNumberOfQueries)
        },
        {
          type: InsightType.EndpointBottleneck,
          data: getDigmathonInsightCardData(InsightType.EndpointBottleneck),
          isFound: getIsFound(payload, InsightType.EndpointBottleneck)
        }
      ];

      setData(insights);
    };

    dispatcher.addActionListener(
      actions.SET_DIGMATHON_PROGRESS_DATA,
      handleSetDigmaProgressData
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_DIGMATHON_PROGRESS_DATA,
        handleSetDigmaProgressData
      );
    };
  }, []);

  useEffect(() => {
    if (
      previousIsDigmathonCompleted !== isDigmathonCompleted &&
      isDigmathonCompleted
    ) {
      window.sendMessageToDigma({
        action: globalActions.FINISH_DIGMATHON_GAME
      });
    }
  }, [isDigmathonCompleted, previousIsDigmathonCompleted]);

  return {
    data,
    getData,
    foundIssuesCount,
    isDigmathonCompleted
  };
};
