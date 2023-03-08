import { useTheme } from "styled-components";
import { timeAgo } from "../../../utils/timeAgo";
import { getInsightIcon, getInsightInfo } from "../../Assets/utils";
import { OpenTelemetryLogoIcon } from "../icons/OpenTelemetryLogoIcon";
import * as s from "./styles";
import { AssetEntryProps } from "./types";

export const AssetEntry = (props: AssetEntryProps) => {
  const theme = useTheme();

  const handleLinkClick = () => {
    props.onAssetLinkClick(props.entry);
  };

  const name = props.entry.span.displayName;
  const otherServices = props.relatedServices.filter(
    (service) => service !== props.entry.serviceName
  );
  const performanceDuration = props.entry.durationPercentiles.find(
    (duration) => duration.percentile === 0.5
  )?.currentDuration;
  const lastSeenDateTime = props.entry.lastSpanInstanceInfo.startTime;

  return (
    <s.Container>
      <s.Header>
        <s.OpenTelemetryIconContainer>
          <OpenTelemetryLogoIcon />
        </s.OpenTelemetryIconContainer>
        <s.Link onClick={() => handleLinkClick()} title={name}>
          {name}
        </s.Link>
        <s.InsightIconsContainer>
          {props.entry.insights.map((insight) => (
            <s.InsightIconContainer
              key={insight.type}
              title={getInsightInfo(insight.type)?.label || insight.type}
            >
              {getInsightIcon(insight, theme, 20)}
            </s.InsightIconContainer>
          ))}
        </s.InsightIconsContainer>
      </s.Header>
      <s.StatsContainer>
        <s.Stats>
          <span>Services</span>
          <s.ServicesContainer>
            <s.ServiceName>{props.entry.serviceName}</s.ServiceName>
            {otherServices.length > 0 && (
              <span title={otherServices.join(", ")}>
                +{otherServices.length}
              </span>
            )}
          </s.ServicesContainer>
        </s.Stats>
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
          <span>Latest</span>
          <s.ValueContainer title={new Date(lastSeenDateTime).toString()}>
            {timeAgo(lastSeenDateTime)}
            <s.Suffix>ago</s.Suffix>
          </s.ValueContainer>
        </s.Stats>
      </s.StatsContainer>
    </s.Container>
  );
};
