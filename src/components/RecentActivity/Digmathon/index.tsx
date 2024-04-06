import { useEffect, useMemo, useState } from "react";
import { dispatcher } from "../../../dispatcher";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { InsightType } from "../../Insights/types";
import { ChevronIcon } from "../../common/icons/16px/ChevronIcon";
import { Direction } from "../../common/icons/types";
import { actions } from "../actions";
import { trackingEvents } from "../tracking";
import { CongratulationsView } from "./CongratulationsView";
import { ProgressView } from "./ProgressView";
import { getDigmathonInsightCardData } from "./getDigmathonInsightData";
import * as s from "./styles";
import {
  DigmathonInsightData,
  DigmathonProgressData,
  DigmathonProgressProps
} from "./types";

const REQUIRED_COUNT_OF_FOUND_ISSUES = 3;

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
      return Boolean(
        data.insights.find(
          (x) =>
            [
              InsightType.EndpointQueryOptimizationV2,
              InsightType.EndpointQueryOptimization,
              InsightType.SpanQueryOptimization
            ].includes(x.type) && x.isFound
        )
      );
    case InsightType.EndpointSpanNPlusOne:
    case InsightType.EndpointSpaNPlusOne:
    case InsightType.SpaNPlusOne:
      return Boolean(
        data.insights.find(
          (x) =>
            [
              InsightType.EndpointSpanNPlusOne,
              InsightType.EndpointSpaNPlusOne,
              InsightType.SpaNPlusOne
            ].includes(x.type) && x.isFound
        )
      );
    case InsightType.EndpointBottleneck:
    case InsightType.SpanEndpointBottleneck:
      return Boolean(
        data.insights.find(
          (x) =>
            [
              InsightType.EndpointBottleneck,
              InsightType.SpanEndpointBottleneck
            ].includes(x.type) && x.isFound
        )
      );
    default:
      return Boolean(data.insights.find((x) => x.type === type && x.isFound));
  }
};

export const Digmathon = ({
  onGoBack,
  isCongratulationsView
}: DigmathonProgressProps) => {
  const [data, setData] = useState<DigmathonProgressData>();

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.GET_DIGMATHON_PROGRESS_DATA
    });

    const handleSetDigmaProgressData = (data: unknown) => {
      setData(data as DigmathonProgressData);
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

  const handleGoBackButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.DIGMATHON_VIEW_BACK_BUTTON_CLICKED
    );
    onGoBack();
  };

  const insights: DigmathonInsightData[] = useMemo(
    () => [
      {
        type: InsightType.SpanScaling,
        data: getDigmathonInsightCardData(InsightType.SpanScaling),
        isFound: getIsFound(data, InsightType.SpanScaling)
      },
      {
        type: InsightType.SpanNexus,
        data: getDigmathonInsightCardData(InsightType.SpanNexus),
        isFound: getIsFound(data, InsightType.SpanNexus)
      },
      {
        type: InsightType.SpanQueryOptimization,
        data: getDigmathonInsightCardData(InsightType.SpanQueryOptimization),
        isFound: getIsFound(data, InsightType.SpanQueryOptimization)
      },
      {
        type: InsightType.HotSpot,
        data: getDigmathonInsightCardData(InsightType.HotSpot),
        isFound: getIsFound(data, InsightType.HotSpot)
      },
      {
        type: InsightType.SpaNPlusOne,
        data: getDigmathonInsightCardData(InsightType.SpaNPlusOne),
        isFound: getIsFound(data, InsightType.SpaNPlusOne)
      },
      {
        type: InsightType.EndpointSessionInView,
        data: getDigmathonInsightCardData(InsightType.EndpointSessionInView),
        isFound: getIsFound(data, InsightType.EndpointSessionInView)
      },
      {
        type: InsightType.SpanUsages,
        data: getDigmathonInsightCardData(InsightType.SpanUsages),
        isFound: getIsFound(data, InsightType.SpanUsages)
      },
      {
        type: InsightType.EndpointHighNumberOfQueries,
        data: getDigmathonInsightCardData(
          InsightType.EndpointHighNumberOfQueries
        ),
        isFound: getIsFound(data, InsightType.EndpointHighNumberOfQueries)
      },
      {
        type: InsightType.EndpointBottleneck,
        data: getDigmathonInsightCardData(InsightType.EndpointBottleneck),
        isFound: getIsFound(data, InsightType.EndpointBottleneck)
      }
    ],
    [data]
  );

  const foundIssuesCount = insights.filter((x) => x.isFound).length;

  return (
    <s.Container>
      <s.Header>
        <s.BackButton onClick={handleGoBackButtonClick}>
          <ChevronIcon
            size={16}
            color={"currentColor"}
            direction={Direction.LEFT}
          />
          Back
        </s.BackButton>
        <s.Divider />
        Digmathon
      </s.Header>
      {foundIssuesCount >= REQUIRED_COUNT_OF_FOUND_ISSUES ||
      isCongratulationsView ? (
        <CongratulationsView />
      ) : (
        <ProgressView insights={insights} foundIssuesCount={foundIssuesCount} />
      )}
    </s.Container>
  );
};
