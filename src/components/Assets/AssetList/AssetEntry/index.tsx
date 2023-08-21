import { DefaultTheme, useTheme } from "styled-components";
import { InsightType } from "../../../../types";
import { getInsightImportanceColor } from "../../../../utils/getInsightImportanceColor";
import { getInsightTypeInfo } from "../../../../utils/getInsightTypeInfo";
import { getInsightTypeOrderPriority } from "../../../../utils/getInsightTypeOrderPriority";
import { timeAgo } from "../../../../utils/timeAgo";
import { Tooltip } from "../../../common/Tooltip";
import { GlobeIcon } from "../../../common/icons/GlobeIcon";
import { getAssetTypeInfo } from "../../utils";
import * as s from "./styles";
import { AssetEntryProps } from "./types";

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

  const name = props.entry.span.displayName;
  const otherServices = props.entry.relatedServices.filter(
    (service) => service !== props.entry.serviceName
  );
  const performanceDuration = props.entry.durationPercentiles.find(
    (duration) => duration.percentile === 0.5
  )?.currentDuration;

  const slowestFivePercentDuration = props.entry.durationPercentiles.find(
    (duration) => duration.percentile === 0.95
  )?.currentDuration;

  const lastSeenDateTime = props.entry.lastSpanInstanceInfo.startTime;

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

  return (
    <s.Container>
      <s.Header>
        {assetTypeInfo?.icon && (
          <s.AssetTypeIconContainer>
            <assetTypeInfo.icon color={"#7891d0"} />
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
            <s.ServicesContainer>
              <GlobeIcon color={serviceIconColor} />
              <Tooltip title={props.entry.serviceName}>
                <s.ServiceName>{props.entry.serviceName}</s.ServiceName>
              </Tooltip>
              {otherServices.length > 0 && (
                <Tooltip title={otherServices.join(", ")}>
                  <span>+{otherServices.length}</span>
                </Tooltip>
              )}
            </s.ServicesContainer>
          </s.Stats>
          <s.Stats>
            <span>Last</span>
            <Tooltip title={new Date(lastSeenDateTime).toString()}>
              <s.ValueContainer>
                {timeAgo(lastSeenDateTime)}
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
              <s.ValueContainer>
                {getImpactScoreLabel(props.entry.impactScores.ScoreExp25)}
              </s.ValueContainer>
            </s.Stats>
            <s.Stats>
              <span>Overall impact</span>
              <s.ValueContainer>
                {getImpactScoreLabel(props.entry.impactScores.ScoreExp1000)}
              </s.ValueContainer>
            </s.Stats>
          </s.StatsColumn>
        )}
      </s.StatsContainer>
    </s.Container>
  );
};
