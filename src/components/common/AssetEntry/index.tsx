import { useTheme } from "styled-components";
import { timeAgo } from "../../../utils/timeAgo";
import { getInsightIcon, getInsightInfo } from "../../Assets/utils";
import { OpenTelemetryLogoIcon } from "../icons/OpenTelemetryLogoIcon";
import * as s from "./styles";
import { AssetEntryProps } from "./types";

export const AssetEntry = (props: AssetEntryProps) => {
  const theme = useTheme();

  const handleLinkClick = () => {
    props.onAssetLinkClick();
  };

  return (
    <s.Container>
      <s.Header>
        <s.OpenTelemetryIconContainer>
          <OpenTelemetryLogoIcon />
        </s.OpenTelemetryIconContainer>
        <s.Link onClick={() => handleLinkClick()} title={props.name}>
          {props.name}
        </s.Link>
        <s.InsightIconsContainer>
          {props.insights.map((insight) => (
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
            <s.ServiceName>{props.services[0]}</s.ServiceName>
            {props.services.length > 1 && (
              <span title={props.services.slice(1).join(", ")}>
                +{props.services.length - 1}
              </span>
            )}
          </s.ServicesContainer>
        </s.Stats>
        <s.Stats>
          <span>Performance</span>
          <s.ValueContainer>
            {props.performance ? props.performance.value : "N/A"}
            {props.performance && <s.Suffix>{props.performance.unit}</s.Suffix>}
          </s.ValueContainer>
        </s.Stats>
        <s.Stats>
          <span>Latest</span>
          <s.ValueContainer title={new Date(props.lastSeenDateTime).toString()}>
            {timeAgo(props.lastSeenDateTime)}
            <s.Suffix>ago</s.Suffix>
          </s.ValueContainer>
        </s.Stats>
      </s.StatsContainer>
    </s.Container>
  );
};
