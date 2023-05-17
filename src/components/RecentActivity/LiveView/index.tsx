import { format } from "date-fns";
import { useState } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis
} from "recharts";
import { DefaultTheme, useTheme } from "styled-components";
import { isNumber } from "../../../typeGuards/isNumber";
import { CrossIcon } from "../../common/icons/CrossIcon";
import { DoubleCircleIcon } from "../../common/icons/DoubleCircleIcon";
import { EndpointIcon } from "../../common/icons/EndpointIcon";
import { MinusIcon } from "../../common/icons/MinusIcon";
import { PlusIcon } from "../../common/icons/PlusIcon";
import * as s from "./styles";
import { LiveDataEntry, LiveViewProps, PercentileInfo } from "./types";

const ZOOM_FACTOR = 1.2;
const DEFAULT_CHART_WIDTH = 388;

const PERCENTILES = [
  { label: "Median", percentile: 0.5 },
  { label: "Slowest 5%", percentile: 0.95 }
];

const getSpanIconColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#4d668a";
    case "dark":
    case "dark-jetbrains":
      return "#7891d0";
  }
};

const getLiveIconColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#426dda";
    case "dark":
    case "dark-jetbrains":
      return "#b9c2eb";
  }
};

const getCloseIconColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#6e6e6e";
    case "dark":
    case "dark-jetbrains":
      return "#afb1b3";
  }
};

const getLineColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#426dda";
    case "dark":
    case "dark-jetbrains":
      return "#b9c2eb";
  }
};

const getAxisColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#b9c0d4";
    case "dark":
    case "dark-jetbrains":
      return "#49494d";
  }
};

const getTickLabelColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#828797";
    case "dark":
    case "dark-jetbrains":
      return "#9b9b9b";
  }
};

const getAreaColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#7891d0";
    case "dark":
    case "dark-jetbrains":
      return "#5154ec";
  }
};

const getZoomButtonIconColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#7891d0";
    case "dark":
    case "dark-jetbrains":
      return "#e2e7ff";
  }
};

const formatDate = (datetime: string): string =>
  format(new Date(datetime), "HH:mm:ss.SSS");

export const LiveView = (props: LiveViewProps) => {
  const theme = useTheme();
  const lineColor = getLineColor(theme);
  const axisColor = getAxisColor(theme);
  const areaColor = getAreaColor(theme);
  const tickLabelColor = getTickLabelColor(theme);
  const zoomButtonIconColor = getZoomButtonIconColor(theme);
  const [chartWidth, setChartWidth] = useState(DEFAULT_CHART_WIDTH);

  const percentiles = PERCENTILES.map((percentile) => ({
    ...percentile,
    value: props.data.durationInsight.percentiles.find(
      (x) => x.percentile === percentile.percentile
    )?.currentDuration.raw
  })).filter((x) => isNumber(x.value)) as PercentileInfo[];

  const data: LiveDataEntry[] = [...props.data.liveDataRecords]
    .reverse()
    .map((x) => ({
      ...x,
      percentiles
    }));

  const handleCloseButtonClick = () => {
    props.onClose(props.data.durationInsight.codeObjectId);
  };

  const spanName = props.data.durationInsight.spanInfo?.displayName;

  const handleZoomOutButtonClick = () => {
    const newWidth = Math.round(chartWidth / ZOOM_FACTOR);
    if (newWidth >= DEFAULT_CHART_WIDTH) {
      setChartWidth(newWidth);
    }
  };

  const handleZoomInButtonClick = () => {
    const newWidth = Math.round(chartWidth * ZOOM_FACTOR);
    setChartWidth(newWidth);
  };

  return (
    <s.Container>
      <s.Header>
        {spanName && (
          <s.Title>
            <s.SpanIconContainer>
              <EndpointIcon color={getSpanIconColor(theme)} size={16} />
            </s.SpanIconContainer>
            <s.SpanName title={spanName}>{spanName}</s.SpanName>
          </s.Title>
        )}
        <s.LiveBadge>
          <DoubleCircleIcon color={getLiveIconColor(theme)} size={8} />
          Live
        </s.LiveBadge>
        <s.CloseButton onClick={handleCloseButtonClick}>
          <CrossIcon color={getCloseIconColor(theme)} size={16} />
        </s.CloseButton>
      </s.Header>
      <s.ZoomButtonsContainer>
        <s.ZoomButton onClick={handleZoomOutButtonClick}>
          <MinusIcon size={16} color={zoomButtonIconColor} />
        </s.ZoomButton>
        <s.ZoomButton onClick={handleZoomInButtonClick}>
          <PlusIcon size={16} color={zoomButtonIconColor} />
        </s.ZoomButton>
      </s.ZoomButtonsContainer>
      <s.ChartContainer>
        <ResponsiveContainer width={chartWidth} height={"100%"}>
          <ComposedChart
            data={data}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid
              strokeDasharray={"2 2"}
              stroke={axisColor}
              horizontal={false}
            />
            <Area
              dataKey={(x: LiveDataEntry) => [
                x.percentiles[0].value,
                x.percentiles[1].value
              ]}
              stroke={areaColor}
              fill={areaColor}
              fillOpacity={0.2}
            />
            <XAxis
              dataKey={"dateTime"}
              tickLine={false}
              tick={{
                fill: tickLabelColor,
                fontSize: 10
              }}
              stroke={axisColor}
              tickFormatter={formatDate}
            />
            <YAxis
              tickLine={false}
              ticks={percentiles.map((x) => x.value)}
              tickFormatter={(x, i) => percentiles[i].label}
              tick={{
                fill: tickLabelColor,
                fontSize: 10,
                width: 85
              }}
              stroke={axisColor}
              tickMargin={7}
            />
            <Line
              dataKey={(x: LiveDataEntry): number => x.duration.raw}
              stroke={lineColor}
              dot={{ stroke: lineColor, fill: lineColor, r: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </s.ChartContainer>
    </s.Container>
  );
};
