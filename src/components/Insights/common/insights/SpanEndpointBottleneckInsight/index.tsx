import { useState } from "react";
import { getDurationString } from "../../../../../utils/getDurationString";
import { roundTo } from "../../../../../utils/roundTo";
import { trimEndpointScheme } from "../../../../../utils/trimEndpointScheme";
import { Info } from "../../Info";
import { InsightCard } from "../../InsightCard";
import { ColumnsContainer } from "../../InsightCard/ColumnsContainer";
import { KeyValue } from "../../InsightCard/KeyValue";
import { ListItem } from "../../InsightCard/ListItem";
import { Select } from "../../InsightCard/Select";
import { ContentContainer, Description, Details } from "../styles";
import * as s from "./styles";
import { SpanEndpointBottleneckEndpointsProps } from "./types";

export const SpanBottleneckEndpoints = (
  props: SpanEndpointBottleneckEndpointsProps
) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState(
    props.insight?.slowEndpoints.length ? props.insight.slowEndpoints[0] : null
  );

  const handleSpanLinkClick = (spanCodeObjectId?: string) => {
    spanCodeObjectId &&
      props.onAssetLinkClick(spanCodeObjectId, props?.insight.type);
  };

  const endpoints = props.insight.slowEndpoints;

  if (endpoints.length === 0) {
    return null;
  }

  return (
    <InsightCard
      insight={props.insight}
      content={
        <ContentContainer>
          <Details>
            <Description>Affected Endpoints ({endpoints.length})</Description>
            <Select
              value={selectedEndpoint?.endpointInfo.spanCodeObjectId}
              onChange={(selectedOption) => {
                const selected =
                  endpoints.find(
                    (x) => x.endpointInfo.spanCodeObjectId === selectedOption
                  ) || null;

                setSelectedEndpoint(selected);
              }}
              options={props.insight.slowEndpoints.map((x) => {
                const spanCodeObjectId = x.endpointInfo.spanCodeObjectId;
                const route = trimEndpointScheme(x.endpointInfo.route);
                return {
                  label: route,
                  customContent: (
                    <s.SelectedItem>
                      {x.endpointInfo.serviceName}
                      <ListItem
                        name={route}
                        onClick={() => handleSpanLinkClick(spanCodeObjectId)}
                      />
                    </s.SelectedItem>
                  ),
                  value: spanCodeObjectId
                };
              })}
            />
          </Details>
          {selectedEndpoint && (
            <ColumnsContainer>
              <KeyValue label={"% of Duration"}>
                {roundTo(
                  selectedEndpoint.probabilityOfBeingBottleneck * 100,
                  2
                )}
                %
              </KeyValue>
              <KeyValue
                label={
                  <Info
                    text="The amount of requests affected by this issue."
                    name="Requests"
                  />
                }
              >
                {selectedEndpoint.requestPercentage}%
              </KeyValue>
              <KeyValue label={"Duration"}>
                {getDurationString(
                  selectedEndpoint.avgDurationWhenBeingBottleneck
                )}
              </KeyValue>
            </ColumnsContainer>
          )}
        </ContentContainer>
      }
    />
  );
};
