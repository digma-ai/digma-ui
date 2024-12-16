import { getFeatureFlagValue } from "../../../../featureFlags";
import { useConfigSelector } from "../../../../store/config/useConfigSelector";
import { isNumber } from "../../../../typeGuards/isNumber";
import { isString } from "../../../../typeGuards/isString";
import { FeatureFlag, InsightType } from "../../../../types";
import { formatTimeDistance } from "../../../../utils/formatTimeDistance";
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
import type { AssetEntryProps } from "./types";

const IS_NEW_TIME_LIMIT = 1000 * 60 * 10; // in milliseconds

export const AssetEntry = ({
  onAssetLinkClick,
  entry,
  isImpactHidden,
  sortingCriterion
}: AssetEntryProps) => {
  const { backendInfo } = useConfigSelector();
  const isNewImpactScoreCalculationEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.IS_NEW_IMPACT_SCORE_CALCULATION_ENABLED
  );
  const impactScore = isNewImpactScoreCalculationEnabled
    ? entry.impactScore
    : entry.impactScores?.ScoreExp25;

  const handleLinkClick = () => {
    onAssetLinkClick(entry);
  };

  const name = entry.displayName;
  const otherServices = entry.services.slice(1);
  const performanceDuration = entry.p50;
  const slowestFivePercentDuration = entry.p95;
  const lastSeenDateTime = entry.latestSpanTimestamp;

  // Do not show unimplemented insights
  const filteredInsights = entry.insights
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

  const assetTypeInfo = getAssetTypeInfo(entry.assetType);

  const servicesTitle = entry.services.join(", ");

  const timeDistanceString = formatTimeDistance(lastSeenDateTime, {
    format: "short",
    withDescriptiveWords: false
  }).replace(" ", "");
  const timeDistanceTitle = new Date(lastSeenDateTime).toString();

  const isNew = isString(entry.firstDetected)
    ? Date.now() - new Date(entry.firstDetected).valueOf() < IS_NEW_TIME_LIMIT
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

              return (
                insightTypeInfo && (
                  <Tooltip
                    key={insight.type}
                    title={insightTypeInfo?.label || insight.type}
                  >
                    <s.InsightIconContainer $criticality={insight.criticality}>
                      <insightTypeInfo.icon color={"currentColor"} size={20} />
                    </s.InsightIconContainer>
                  </Tooltip>
                )
              );
            })}
          </s.IndicatorsContainer>
        </s.TitleRow>
        {entry.instrumentationLibrary && (
          <Tooltip title={entry.instrumentationLibrary}>
            <s.ScopeName>{entry.instrumentationLibrary}</s.ScopeName>
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
                  <GlobeIcon color={"currentColor"} size={14} />
                </s.IconContainer>
                <s.ServiceName>{entry.services[0]}</s.ServiceName>
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
              {performanceDuration?.value ? (
                <>
                  {performanceDuration.value}
                  <s.Suffix>{performanceDuration.unit}</s.Suffix>
                </>
              ) : (
                "N/A"
              )}
            </s.ValueContainer>
          </s.Stats>
          <s.Stats>
            <span>Slowest 5%</span>
            <s.ValueContainer>
              {slowestFivePercentDuration?.value ? (
                <>
                  {slowestFivePercentDuration.value}
                  <s.Suffix>{slowestFivePercentDuration.unit}</s.Suffix>
                </>
              ) : (
                "N/A"
              )}
            </s.ValueContainer>
          </s.Stats>
        </s.StatsColumn>
        {!isImpactHidden && isNumber(impactScore) && (
          <s.StatsColumn>
            <s.Stats>
              <span>Performance impact</span>
              <s.ValueContainer>
                <ImpactScore
                  score={impactScore}
                  showIndicator={
                    sortingCriterion === SORTING_CRITERION.PERFORMANCE_IMPACT
                  }
                />
              </s.ValueContainer>
            </s.Stats>
          </s.StatsColumn>
        )}
      </s.StatsContainer>
    </s.Container>
  );
};
