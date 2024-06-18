import { DefaultTheme, useTheme } from "styled-components";
import { isString } from "../../../../typeGuards/isString";
import { InsightType } from "../../../../types";
import { formatTimeDistance } from "../../../../utils/formatTimeDistance";
import { getInsightCriticalityColor } from "../../../../utils/getInsightCriticalityColor";
import { getInsightTypeInfo } from "../../../../utils/getInsightTypeInfo";
import { getInsightTypeOrderPriority } from "../../../../utils/getInsightTypeOrderPriority";
import { InsightImportance } from "../../../Insights/types";
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
    // TODO: fix types
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    .filter((x) => x.importance < InsightImportance.Info);

  const sortedInsights = [...filteredInsights].sort(
    (a, b) =>
      b.criticality - a.criticality ||
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
        <s.TitleRow>
          {assetTypeInfo?.icon && (
            <s.AssetTypeIconContainer>
              <assetTypeInfo.icon color={"#7891d0"} size={16} />
            </s.AssetTypeIconContainer>
          )}
          <Tooltip title={name}>
            <s.Link onClick={() => handleLinkClick()}>{name}</s.Link>
          </Tooltip>
          <s.StyledCopyButton text={name} />
          <s.IndicatorsContainer>
            {isNew && <Tag type={"success"} value={"New"} />}
            {sortedInsights.map((insight) => {
              const insightTypeInfo = getInsightTypeInfo(insight.type);
              const insightIconColor = getInsightCriticalityColor(
                insight.criticality,
                theme
              );

              return (
                insightTypeInfo && (
                  <Tooltip
                    key={insight.type}
                    title={insightTypeInfo?.label || insight.type}
                  >
                    <s.InsightIconContainer>
                      <insightTypeInfo.icon
                        color={insightIconColor}
                        size={20}
                      />
                    </s.InsightIconContainer>
                  </Tooltip>
                )
              );
            })}
          </s.IndicatorsContainer>
        </s.TitleRow>
        {props.entry.instrumentationLibrary && (
          <Tooltip title={props.entry.instrumentationLibrary}>
            <s.ScopeName>{props.entry.instrumentationLibrary}</s.ScopeName>
          </Tooltip>
        )}
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
        {!props.isImpactHidden && props.entry.impactScores && (
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
          </s.StatsColumn>
        )}
      </s.StatsContainer>
    </s.Container>
  );
};
