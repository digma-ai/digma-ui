import { DefaultTheme, useTheme } from "styled-components";
import { InsightType } from "../../../../types";
import { formatTimeDistance } from "../../../../utils/formatTimeDistance";
import { getInsightImportanceColor } from "../../../../utils/getInsightImportanceColor";
import { getInsightTypeInfo } from "../../../../utils/getInsightTypeInfo";
import { getInsightTypeOrderPriority } from "../../../../utils/getInsightTypeOrderPriority";
import { Tooltip } from "../../../common/Tooltip";
import { GlobeIcon } from "../../../common/icons/GlobeIcon";
import { getAssetTypeInfo } from "../../utils";
import { SORTING_CRITERION } from "../types";
import * as s from "./styles";
import { AssetEntryProps } from "./types";

const getImpactScoreIndicator = (score: number) => {
  if (score < 0) {
    return null;
  }

  return (
    <s.ImpactScoreIndicatorContainer>
      <s.ImpactScoreIndicator $score={score} />
    </s.ImpactScoreIndicatorContainer>
  );
};

const getImpactScoreLabel = (score: number) => {
  if (score < 0) {
    return "No data";
  }

  if (score < 0.4) {
    return "Low";
  }

  if (score < 0.8) {
    return "Medium";
  }

  return "High";
};

const getServiceIconColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#4d668a";
    case "dark":
    case "dark-jetbrains":
      return "#dadada";
  }
};

export const AssetEntry = (props: AssetEntryProps) => {
  const theme = useTheme();
  const serviceIconColor = getServiceIconColor(theme);

  const handleLinkClick = () => {
    props.onAssetLinkClick(props.entry);
  };

  const name = props.entry.displayName;
  const otherServices = props.entry.services.slice(1);
  const performanceDuration = props.entry.p50;
  const slowestFivePercentDuration = props.entry.p95;
  const lastSeenDateTime = props.entry.latestSpanTimestamp;

  // Do not show unimplemented insights
  const filteredInsights = props.entry.insights.filter(
    (x) =>
      ![
        InsightType.SpanScalingWell,
        InsightType.SpanScalingInsufficientData
      ].includes(x.type as InsightType)
  );

  const sortedInsights = [...filteredInsights].sort(
    (a, b) =>
      a.importance - b.importance ||
      getInsightTypeOrderPriority(a.type) - getInsightTypeOrderPriority(b.type)
  );

  const assetTypeInfo = getAssetTypeInfo(props.entry.assetType);

  const servicesTitle = props.entry.services.join(", ");

  const timeDistanceString = formatTimeDistance(lastSeenDateTime, {
    format: "short",
    withDescriptiveWords: false
  }).replace(" ", "");
  const timeDistanceTitle = new Date(lastSeenDateTime).toString();

  return (
    <s.Container>
      <s.Header>
        {assetTypeInfo?.icon && (
          <s.AssetTypeIconContainer>
            <assetTypeInfo.icon color={"#7891d0"} size={16} />
          </s.AssetTypeIconContainer>
        )}
        <Tooltip title={name}>
          <s.Link onClick={() => handleLinkClick()}>{name}</s.Link>
        </Tooltip>
        <s.InsightIconsContainer>
          {sortedInsights.map((insight) => {
            const insightTypeInfo = getInsightTypeInfo(insight.type);
            const insightIconColor = getInsightImportanceColor(
              insight.importance,
              theme
            );

            return (
              insightTypeInfo && (
                <Tooltip
                  key={insight.type}
                  title={insightTypeInfo?.label || insight.type}
                >
                  <s.InsightIconContainer>
                    <insightTypeInfo.icon color={insightIconColor} size={20} />
                  </s.InsightIconContainer>
                </Tooltip>
              )
            );
          })}
        </s.InsightIconsContainer>
      </s.Header>
      <s.StatsContainer>
        <s.StatsColumn>
          <s.Stats>
            <span>Services</span>
            <Tooltip title={servicesTitle}>
              <s.ServicesContainer>
                <s.IconContainer>
                  <GlobeIcon color={serviceIconColor} size={14} />
                </s.IconContainer>
                <s.ServiceName>{props.entry.services[0]}</s.ServiceName>
                {otherServices.length > 0 && (
                  <span>+{otherServices.length}</span>
                )}
              </s.ServicesContainer>
            </Tooltip>
          </s.Stats>
          <s.Stats>
            <span>Last</span>
            <Tooltip title={timeDistanceTitle}>
              <s.ValueContainer>
                {timeDistanceString}
                <s.Suffix>ago</s.Suffix>
              </s.ValueContainer>
            </Tooltip>
          </s.Stats>
        </s.StatsColumn>
        <s.StatsColumn>
          <s.Stats>
            <span>Performance</span>
            <s.ValueContainer>
              {performanceDuration ? performanceDuration.value : "N/A"}
              {performanceDuration && (
                <s.Suffix>{performanceDuration.unit}</s.Suffix>
              )}
            </s.ValueContainer>
          </s.Stats>
          <s.Stats>
            <span>Slowest 5%</span>
            <s.ValueContainer>
              {slowestFivePercentDuration
                ? slowestFivePercentDuration.value
                : "N/A"}
              {slowestFivePercentDuration && (
                <s.Suffix>{slowestFivePercentDuration.unit}</s.Suffix>
              )}
            </s.ValueContainer>
          </s.Stats>
        </s.StatsColumn>
        {props.entry.impactScores && (
          <s.StatsColumn>
            <s.Stats>
              <span>Performance impact</span>
              <Tooltip title={props.entry.impactScores.ScoreExp25}>
                <s.ValueContainer>
                  {getImpactScoreLabel(props.entry.impactScores.ScoreExp25)}
                  {props.sortingCriterion ===
                    SORTING_CRITERION.PERFORMANCE_IMPACT &&
                    getImpactScoreIndicator(
                      props.entry.impactScores.ScoreExp25
                    )}
                </s.ValueContainer>
              </Tooltip>
            </s.Stats>
            <s.Stats>
              <span>Overall impact</span>
              <Tooltip title={props.entry.impactScores.ScoreExp1000}>
                <s.ValueContainer>
                  {getImpactScoreLabel(props.entry.impactScores.ScoreExp1000)}
                  {props.sortingCriterion ===
                    SORTING_CRITERION.OVERALL_IMPACT &&
                    getImpactScoreIndicator(
                      props.entry.impactScores.ScoreExp1000
                    )}
                </s.ValueContainer>
              </Tooltip>
            </s.Stats>
          </s.StatsColumn>
        )}
      </s.StatsContainer>
    </s.Container>
  );
};
