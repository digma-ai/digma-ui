import { trimEndpointScheme } from "../../../utils/trimEndpointScheme";
import { Button } from "../../common/Button";
import { ChartIcon } from "../../common/icons/ChartIcon";
import { CrosshairIcon } from "../../common/icons/CrosshairIcon";
import { InsightCard } from "../InsightCard";
import { Link } from "../styles";
import { Trace } from "../types";
import * as s from "./styles";
import { ScalingIssueInsightProps } from "./types";

export const ScalingIssueInsight = (props: ScalingIssueInsightProps) => {
  const handleLinkClick = (spanCodeObjectId: string) => {
    props.onAssetLinkClick(spanCodeObjectId);
  };

  const handleTraceButtonClick = (trace: Trace) => {
    props.onTraceButtonClick(trace);
  };

  const handleHistogramButtonClick = () => {
    props.insight.spanInfo &&
      props.onHistogramButtonClick(
        props.insight.spanInfo.instrumentationLibrary,
        props.insight.spanInfo.name,
        props.insight.type
      );
  };

  return (
    <InsightCard
      data={props.insight}
      content={
        <s.ContentContainer>
          <s.Description>
            {props.insight.shortDisplayInfo.description}
          </s.Description>
          <s.Stats>
            <s.Stat>
              <s.Description>Tested concurrency</s.Description>
              <span>{props.insight.maxConcurrency}</span>
            </s.Stat>
            <s.Stat>
              <s.Description>Duration</s.Description>
              <span>
                {props.insight.minDuration.value}{" "}
                {props.insight.minDuration.unit} -{" "}
                {props.insight.maxDuration.value}{" "}
                {props.insight.maxDuration.unit}
              </span>
            </s.Stat>
          </s.Stats>
          {props.insight.rootCauseSpans.length > 0 && (
            <s.List>
              <s.Description>Caused by:</s.Description>
              {props.insight.rootCauseSpans.map((span) => {
                const spanName = span.displayName;
                const traceId = span.sampleTraceId;
                const spanCodeObjectId = span.spanCodeObjectId;

                return (
                  <s.RootCause key={spanCodeObjectId}>
                    <span>
                      <Link onClick={() => handleLinkClick(spanCodeObjectId)}>
                        {spanName}
                      </Link>
                    </span>
                    {traceId && (
                      <s.Button
                        icon={{ component: CrosshairIcon, size: 16 }}
                        onClick={() =>
                          handleTraceButtonClick({
                            name: spanName,
                            id: traceId
                          })
                        }
                      >
                        Trace
                      </s.Button>
                    )}
                  </s.RootCause>
                );
              })}
            </s.List>
          )}
          {props.insight.affectedEndpoints.length > 0 && (
            <s.List>
              <s.Description>Affected endpoints:</s.Description>
              {props.insight.affectedEndpoints.map((endpoint) => {
                const endpointRoute = trimEndpointScheme(endpoint.route);

                return (
                  <span key={endpoint.route}>
                    <Link
                      onClick={() => handleLinkClick(endpoint.spanCodeObjectId)}
                    >
                      {endpointRoute}
                    </Link>
                  </span>
                );
              })}
            </s.List>
          )}
        </s.ContentContainer>
      }
      buttons={[
        ...(props.insight.spanInfo
          ? [
              <Button
                icon={{ component: ChartIcon }}
                key={"histogram"}
                onClick={handleHistogramButtonClick}
              >
                Histogram
              </Button>
            ]
          : [])
      ]}
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
    />
  );
};
