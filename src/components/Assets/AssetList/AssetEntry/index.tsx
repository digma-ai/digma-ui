import { useContext } from "react";
import { DefaultTheme, useTheme } from "styled-components";
import { getFeatureFlagValue } from "../../../../featureFlags";
import { isString } from "../../../../typeGuards/isString";
import { FeatureFlag, InsightType } from "../../../../types";
import { formatTimeDistance } from "../../../../utils/formatTimeDistance";
import { getInsightImportanceColor } from "../../../../utils/getInsightImportanceColor";
import { getInsightTypeInfo } from "../../../../utils/getInsightTypeInfo";
import { getInsightTypeOrderPriority } from "../../../../utils/getInsightTypeOrderPriority";
import { ConfigContext } from "../../../common/App/ConfigContext";
import { ImpactScore } from "../../../common/ImpactScore";
import { Tag } from "../../../common/Tag";
import { Tooltip } from "../../../common/Tooltip";
import { GlobeIcon } from "../../../common/icons/GlobeIcon";
import { getAssetTypeInfo } from "../../utils";
import { SORTING_CRITERION } from "../types";
import * as s from "./styles";
import { AssetEntryProps } from "./types";

const IS_NEW_TIME_LIMIT = 1000 * 60 * 10; // in milliseconds

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
  const config = useContext(ConfigContext);
  const isOverallImpactHidden = getFeatureFlagValue(
    config,
    FeatureFlag.IS_ASSETS_OVERALL_IMPACT_HIDDEN
  );

  const handleLinkClick = () => {
    props.onAssetLinkClick(props.entry);
  };

  const name = props.entry.displayName;
  const otherServices = props.entry.services.slice(1);
  const performanceDuration = props.entry.p50;
  const slowestFivePercentDuration = props.entry.p95;
  const lastSeenDateTime = props.entry.latestSpanTimestamp;

  // Do not show unimplemented insights
  const filteredInsights = props.entry.insights
    .filter(
      (x) =>
        ![
          InsightType.SpanScalingWell,
          InsightType.SpanScalingInsufficientData
        ].includes(x.type as InsightType)
    )
    .filter((x) => x.importance < 6); // show icon that has importance grater that Info

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

  const isNew = isString(props.entry.firstDetected)
    ? Date.now() - new Date(props.entry.firstDetected).valueOf() <
      IS_NEW_TIME_LIMIT
    : false;

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
        <s.IndicatorsContainer>
          {isNew && <Tag type={"success"} value={"New"} />}
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
        </s.IndicatorsContainer>
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
                  <ImpactScore
                    score={props.entry.impactScores.ScoreExp25}
                    showIndicator={
                      props.sortingCriterion ===
                      SORTING_CRITERION.PERFORMANCE_IMPACT
                    }
                  />
                </s.ValueContainer>
              </Tooltip>
            </s.Stats>
            {!isOverallImpactHidden && (
              <s.Stats>
                <span>Overall impact</span>
                <Tooltip title={props.entry.impactScores.ScoreExp1000}>
                  <s.ValueContainer>
                    <ImpactScore
                      score={props.entry.impactScores.ScoreExp1000}
                      showIndicator={
                        props.sortingCriterion ===
                        SORTING_CRITERION.OVERALL_IMPACT
                      }
                    />
                  </s.ValueContainer>
                </Tooltip>
              </s.Stats>
            )}
          </s.StatsColumn>
        )}
        {props.entry.instrumentationLibrary && (
          <s.StatsColumn>
            <s.Stats>
              <span>Scope</span>
              <Tooltip title={props.entry.instrumentationLibrary}>
                <s.ValueContainer>
                  <s.ScopeName>
                    {props.entry.instrumentationLibrary}
                  </s.ScopeName>
                </s.ValueContainer>
              </Tooltip>
            </s.Stats>
          </s.StatsColumn>
        )}
      </s.StatsContainer>
    </s.Container>
  );
};
