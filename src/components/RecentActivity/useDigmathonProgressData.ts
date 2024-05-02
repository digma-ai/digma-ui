import { useEffect, useState } from "react";
import { actions as globalActions } from "../../actions";
import { dispatcher } from "../../dispatcher";
import { usePrevious } from "../../hooks/usePrevious";
import { isString } from "../../typeGuards/isString";
import { InsightType } from "../Insights/types";
import { getDigmathonInsightCardData } from "./Digmathon/getDigmathonInsightData";
import { actions } from "./actions";
import {
  DigmathonInsightData,
  DigmathonProgressData,
  DigmathonProgressInsightData,
  SetDigmathonProgressDataPayload
} from "./types";

// const REQUIRED_COUNT_OF_FOUND_ISSUES = 3;

const getData = () => {
  window.sendMessageToDigma({
    action: actions.GET_DIGMATHON_PROGRESS_DATA
  });
};

const getMinFoundDate = (insights: DigmathonProgressInsightData[]) =>
  insights.reduce((minDate, cur) => {
    if (
      isString(minDate) &&
      new Date(cur.foundAt).valueOf() < new Date(minDate).valueOf()
    ) {
      return cur.foundAt;
    }

    return minDate;
  }, null as string | null);

const getFoundAt = (
  insights: DigmathonProgressInsightData[],
  type: InsightType
) => {
  switch (type) {
    case InsightType.EndpointQueryOptimizationV2:
    case InsightType.EndpointQueryOptimization:
    case InsightType.SpanQueryOptimization: {
      const filteredInsights = insights.filter((x) =>
        [
          InsightType.EndpointQueryOptimizationV2,
          InsightType.EndpointQueryOptimization,
          InsightType.SpanQueryOptimization
        ].includes(x.type)
      );
      return getMinFoundDate(filteredInsights);
    }
    case InsightType.EndpointSpanNPlusOne:
    case InsightType.EndpointSpaNPlusOne:
    case InsightType.SpaNPlusOne: {
      const filteredInsights = insights.filter((x) =>
        [
          InsightType.EndpointSpanNPlusOne,
          InsightType.EndpointSpaNPlusOne,
          InsightType.SpaNPlusOne
        ].includes(x.type)
      );
      return getMinFoundDate(filteredInsights);
    }
    case InsightType.EndpointBottleneck:
    case InsightType.SpanEndpointBottleneck: {
      const filteredInsights = insights.filter((x) =>
        [
          InsightType.EndpointBottleneck,
          InsightType.SpanEndpointBottleneck
        ].includes(x.type)
      );
      return getMinFoundDate(filteredInsights);
    }
    default:
      return insights.find((x) => x.type === type)?.foundAt || null;
  }
};

export const useDigmathonProgressData = () => {
  const [data, setData] = useState<DigmathonProgressData>();
  const foundIssuesCount =
    data?.insights.filter((x) => isString(x.foundAt)).length || 0;
  const isDigmathonCompleted = false;
  //   foundIssuesCount >= REQUIRED_COUNT_OF_FOUND_ISSUES;
  const previousIsDigmathonCompleted = usePrevious(isDigmathonCompleted);
  useEffect(() => {
    const handleSetDigmaProgressData = (data: unknown) => {
      const payload = data as SetDigmathonProgressDataPayload;

      const insights: DigmathonInsightData[] = [
        {
          type: InsightType.SpanScaling,
          data: getDigmathonInsightCardData(InsightType.SpanScaling),
          foundAt: getFoundAt(payload.insights, InsightType.SpanScaling)
        },
        {
          type: InsightType.SpanNexus,
          data: getDigmathonInsightCardData(InsightType.SpanNexus),
          foundAt: getFoundAt(payload.insights, InsightType.SpanNexus)
        },
        {
          type: InsightType.SpanQueryOptimization,
          data: getDigmathonInsightCardData(InsightType.SpanQueryOptimization),
          foundAt: getFoundAt(
            payload.insights,
            InsightType.SpanQueryOptimization
          )
        },
        {
          type: InsightType.HotSpot,
          data: getDigmathonInsightCardData(InsightType.HotSpot),
          foundAt: getFoundAt(payload.insights, InsightType.HotSpot)
        },
        {
          type: InsightType.SpaNPlusOne,
          data: getDigmathonInsightCardData(InsightType.SpaNPlusOne),
          foundAt: getFoundAt(payload.insights, InsightType.SpaNPlusOne)
        },
        {
          type: InsightType.EndpointSessionInView,
          data: getDigmathonInsightCardData(InsightType.EndpointSessionInView),
          foundAt: getFoundAt(
            payload.insights,
            InsightType.EndpointSessionInView
          )
        },
        {
          type: InsightType.SpanUsages,
          data: getDigmathonInsightCardData(InsightType.SpanUsages),
          foundAt: getFoundAt(payload.insights, InsightType.SpanUsages)
        },
        {
          type: InsightType.EndpointHighNumberOfQueries,
          data: getDigmathonInsightCardData(
            InsightType.EndpointHighNumberOfQueries
          ),
          foundAt: getFoundAt(
            payload.insights,
            InsightType.EndpointHighNumberOfQueries
          )
        },
        {
          type: InsightType.EndpointBottleneck,
          data: getDigmathonInsightCardData(InsightType.EndpointBottleneck),
          foundAt: getFoundAt(payload.insights, InsightType.EndpointBottleneck)
        }
      ];

      setData({
        insights,
        lastUpdatedByUserAt: payload.lastUpdatedByUserAt
      });
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
