import { format } from "date-fns";
import { useEffect, useState } from "react";
import useDimensions from "react-cool-dimensions";
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
import { usePrevious } from "../../../hooks/usePrevious";
import { isNumber } from "../../../typeGuards/isNumber";
import { CrossIcon } from "../../common/icons/CrossIcon";
import { DoubleCircleIcon } from "../../common/icons/DoubleCircleIcon";
import { EndpointIcon } from "../../common/icons/EndpointIcon";
import { MinusIcon } from "../../common/icons/MinusIcon";
import { PlusIcon } from "../../common/icons/PlusIcon";
import * as s from "./styles";
import { ExtendedLiveDataRecord, LiveViewProps, PercentileInfo } from "./types";

const ZOOM_FACTOR = 1.2;

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
  format(new Date(datetime), "HH:mm:ss.SSS MM/dd/yyyy");

export const LiveView = (props: LiveViewProps) => {
  const theme = useTheme();
  const lineColor = getLineColor(theme);
  const axisColor = getAxisColor(theme);
  const areaColor = getAreaColor(theme);
  const tickLabelColor = getTickLabelColor(theme);
  const zoomButtonIconColor = getZoomButtonIconColor(theme);
  const { observe, width } = useDimensions();
  const previousWidth = usePrevious(width);
  const [containerInitialWidth, setContainerInitialWidth] =
    useState<number>(width);
  const [chartWidth, setChartWidth] = useState<number>(containerInitialWidth);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (previousWidth !== width) {
      setContainerInitialWidth(width);
      if (width > chartWidth) {
        setChartWidth(width);
      }
    }
  }, [width, previousWidth, chartWidth]);

  const percentiles = PERCENTILES.map((percentile) => ({
    ...percentile,
    value: props.data.durationInsight.percentiles.find(
      (x) => x.percentile === percentile.percentile
    )?.currentDuration.raw
  })).filter((x) => isNumber(x.value)) as PercentileInfo[];

  const data: ExtendedLiveDataRecord[] = [...props.data.liveDataRecords].map(
    (x) => ({
      ...x,
      percentiles
    })
  );

  const handleCloseButtonClick = () => {
    props.onClose(props.data.durationInsight.codeObjectId);
  };

  const spanName = props.data.durationInsight.spanInfo?.displayName;

  const handleZoomOutButtonClick = () => {
    if (chartWidth > containerInitialWidth) {
      const newWidth = Math.round(chartWidth / ZOOM_FACTOR);

      if (newWidth > containerInitialWidth) {
        setChartWidth(newWidth);
        setIsZoomed(true);
      } else {
        setChartWidth(containerInitialWidth);
        setIsZoomed(false);
      }
    }
  };

  const handleZoomInButtonClick = () => {
    const newWidth = Math.round(chartWidth * ZOOM_FACTOR);

    if (newWidth <= containerInitialWidth) {
      setChartWidth(containerInitialWidth);
      setIsZoomed(false);
    } else {
      setChartWidth(newWidth);
      setIsZoomed(true);
    }
  };

  const YAxisTicks = [...new Set(percentiles.map((x) => x.value))];

  const getYAxisTickLabel = (value: number): string => {
    const labels: string[] = [];
    percentiles.forEach((percentile) => {
      if (percentile.value === value) {
        labels.push(percentile.label);
      }
    });

    return labels.join(" / ");
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
      <s.ChartContainer ref={observe}>
        <ResponsiveContainer
          width={isZoomed ? chartWidth : "100%"}
          height={"100%"}
        >
          <ComposedChart
            data={data}
            margin={{
              left: 8,
              right: 0,
              bottom: 4
            }}
          >
            <CartesianGrid
              strokeDasharray={"2 2"}
              stroke={axisColor}
              horizontal={false}
            />
            {data.length > 1 && (
              <Area
                dataKey={(x: ExtendedLiveDataRecord) => {
                  const p50 = x.percentiles.find((p) => p.percentile === 0.5);
                  const p95 = x.percentiles.find((p) => p.percentile === 0.95);

                  return p50 && p95 ? [p50.value, p95.value] : [];
                }}
                stroke={areaColor}
                fill={areaColor}
                fillOpacity={0.2}
              />
            )}
            <XAxis
              dataKey={"dateTime"}
              tickLine={false}
              tick={{
                fill: tickLabelColor,
                fontSize: 10,
                width: 60
              }}
              stroke={axisColor}
              tickFormatter={formatDate}
            />
            <YAxis
              tickLine={false}
              ticks={YAxisTicks}
              tickFormatter={getYAxisTickLabel}
              tick={{
                fill: tickLabelColor,
                fontSize: 10,
                width: 85
              }}
              stroke={axisColor}
              tickMargin={7}
            />
            <Line
              dataKey={(x: ExtendedLiveDataRecord): number => x.duration.raw}
              stroke={lineColor}
              dot={{ stroke: lineColor, fill: lineColor, r: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </s.ChartContainer>
    </s.Container>
  );
};
