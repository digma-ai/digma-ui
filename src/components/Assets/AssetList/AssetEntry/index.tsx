import { useTheme } from "styled-components";
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
import { GlobeIcon } from "../../../common/icons/16px/GlobeIcon";
import { getAssetTypeInfo } from "../../utils";
import { SORTING_CRITERION } from "../types";
import * as s from "./styles";
import { AssetEntryProps } from "./types";

const IS_NEW_TIME_LIMIT = 1000 * 60 * 10; // in milliseconds

export const AssetEntry = (props: AssetEntryProps) => {
  const theme = useTheme();

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
              <assetTypeInfo.icon color={"currentColor"} size={16} />
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
                        size={16}
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
          <s.Stat>
            <s.StatLabel>Services</s.StatLabel>
            <Tooltip title={servicesTitle}>
              <s.ServicesContainer>
                <s.IconContainer>
                  <GlobeIcon color={"currentColor"} size={16} />
                </s.IconContainer>
                <s.ServiceName>{props.entry.services[0]}</s.ServiceName>
                {otherServices.length > 0 && (
                  <span>+{otherServices.length}</span>
                )}
              </s.ServicesContainer>
            </Tooltip>
          </s.Stat>
          <s.Stat>
            <s.StatLabel>Last</s.StatLabel>
            <Tooltip title={timeDistanceTitle}>
              <s.StatValue>
                {timeDistanceString}
                <s.Suffix>ago</s.Suffix>
              </s.StatValue>
            </Tooltip>
          </s.Stat>
        </s.StatsColumn>
        <s.StatsColumn>
          <s.Stat>
            <s.StatLabel>Performance</s.StatLabel>
            <s.StatValue>
              {performanceDuration ? performanceDuration.value : "N/A"}
              {performanceDuration && (
                <s.Suffix>{performanceDuration.unit}</s.Suffix>
              )}
            </s.StatValue>
          </s.Stat>
          <s.Stat>
            <s.StatLabel>Slowest 5%</s.StatLabel>
            <s.StatValue>
              {slowestFivePercentDuration
                ? slowestFivePercentDuration.value
                : "N/A"}
              {slowestFivePercentDuration && (
                <s.Suffix>{slowestFivePercentDuration.unit}</s.Suffix>
              )}
            </s.StatValue>
          </s.Stat>
        </s.StatsColumn>
        {!props.isImpactHidden && props.entry.impactScores && (
          <s.StatsColumn>
            <s.Stat>
              <s.StatLabel>Performance impact</s.StatLabel>
              <Tooltip title={props.entry.impactScores.ScoreExp25}>
                <s.StatValue>
                  <ImpactScore
                    score={props.entry.impactScores.ScoreExp25}
                    showIndicator={
                      props.sortingCriterion ===
                      SORTING_CRITERION.PERFORMANCE_IMPACT
                    }
                  />
                </s.StatValue>
              </Tooltip>
            </s.Stat>
          </s.StatsColumn>
        )}
      </s.StatsContainer>
    </s.Container>
  );
};
