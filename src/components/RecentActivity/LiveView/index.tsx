import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import useDimensions from "react-cool-dimensions";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { ChartOffset } from "recharts/types/util/types";
import { DefaultTheme, useTheme } from "styled-components";
import { usePrevious } from "../../../hooks/usePrevious";
import { roundTo } from "../../../utils/roundTo";
import { CrossIcon } from "../../common/icons/CrossIcon";
import { DoubleCircleIcon } from "../../common/icons/DoubleCircleIcon";
import { EndpointIcon } from "../../common/icons/EndpointIcon";
import { MinusIcon } from "../../common/icons/MinusIcon";
import { PlusIcon } from "../../common/icons/PlusIcon";
import { TooltipContent } from "./TooltipContent";
import * as s from "./styles";
import {
  Coordinates,
  DotTooltipProps,
  ExtendedLiveDataRecord,
  LiveViewProps,
  PercentileInfo
} from "./types";

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

const convertTo = (nanoseconds: number, unit: string) => {
  const milliseconds = nanoseconds / 1000 / 1000;

  switch (unit) {
    case "ms":
      return milliseconds;
    case "sec":
      return milliseconds / 1000;
    case "min":
    default:
      return milliseconds / 1000 / 60;
  }
};

const getMaxDuration = (
  records: ExtendedLiveDataRecord[]
): ExtendedLiveDataRecord | undefined =>
  records.reduce(
    (max: ExtendedLiveDataRecord | undefined, curr) =>
      max && max.duration.raw > curr.duration.raw ? max : curr,
    undefined
  );

const formatDate = (dateTime: number): string =>
  format(new Date(dateTime), "HH:mm MM/dd/yyyy");

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState<number>(width);
  const previousChartWidth = usePrevious(chartWidth);
  const [isZoomed, setIsZoomed] = useState(false);
  const [areaTooltip, setAreaTooltip] = useState<Coordinates>();
  const [dotToolTip, setDotTooltip] = useState<DotTooltipProps>();
  const [scrollPercentagePosition, setScrollPercentagePosition] = useState(1);

  useEffect(() => {
    observe(containerRef.current);
  }, [observe, containerRef.current]);

  useEffect(() => {
    if (previousWidth !== width) {
      setContainerInitialWidth(width);
      if (width > chartWidth) {
        setChartWidth(width);
      }
    }
  }, [width, previousWidth, chartWidth]);

  useEffect(() => {
    const containerEl = containerRef.current;
    if (containerEl && previousChartWidth !== chartWidth) {
      containerEl.scrollTo({
        left:
          scrollPercentagePosition * containerEl.scrollWidth -
          containerEl.clientWidth
      });
    }
  }, [previousChartWidth, chartWidth, scrollPercentagePosition]);

  const persistScrollPosition = () => {
    const el = containerRef.current;
    if (el) {
      if (el.clientWidth === el.scrollWidth) {
        setScrollPercentagePosition(1);
      } else {
        setScrollPercentagePosition(
          (el.scrollLeft + el.clientWidth) / el.scrollWidth
        );
      }
    }
  };

  const handleCloseButtonClick = () => {
    props.onClose(props.data.durationData.codeObjectId);
  };

  const handleZoomOutButtonClick = () => {
    persistScrollPosition();

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
    persistScrollPosition();

    const newWidth = Math.round(chartWidth * ZOOM_FACTOR);

    if (newWidth <= containerInitialWidth) {
      setChartWidth(containerInitialWidth);
      setIsZoomed(false);
    } else {
      setChartWidth(newWidth);
      setIsZoomed(true);
    }
  };

  const handleAreaMouseMove = (props: any, e: React.MouseEvent<SVGElement>) => {
    setAreaTooltip({ x: e.clientX, y: e.clientY });
  };

  const handleAreaMouseLeave = () => {
    setAreaTooltip(undefined);
  };

  const handleDotMouseOver = (
    props: any,
    e: React.MouseEvent<SVGCircleElement>
  ) => {
    setDotTooltip({
      coordinates: { x: e.clientX, y: e.clientY },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      data: props.payload as ExtendedLiveDataRecord
    });
  };

  const handleDotMouseLeave = () => {
    setDotTooltip(undefined);
  };

  const percentiles = PERCENTILES.map((percentile) => ({
    ...percentile,
    duration: props.data.durationData.percentiles.find(
      (x) => x.percentile === percentile.percentile
    )?.currentDuration
  })).filter(Boolean) as PercentileInfo[];

  const p50 = percentiles.find((p) => p.percentile === 0.5);
  const p95 = percentiles.find((p) => p.percentile === 0.95);

  const spanName = props.data.durationData.displayName;

  const data: ExtendedLiveDataRecord[] = [...props.data.liveDataRecords].map(
    (x) => ({
      ...x,
      dateTimeValue: new Date(x.dateTime).valueOf()
    })
  );

  const maxDuration = getMaxDuration(data)?.duration;

  const maxDurationUnit = maxDuration?.unit || "ms";

  return (
    <s.Container>
      <s.Header>
        <s.Title>
          <s.SpanIconContainer>
            <EndpointIcon color={getSpanIconColor(theme)} size={16} />
          </s.SpanIconContainer>
          <s.SpanName title={spanName}>{spanName}</s.SpanName>
        </s.Title>
        <s.LiveBadge>
          <DoubleCircleIcon color={getLiveIconColor(theme)} size={8} />
          Live
        </s.LiveBadge>
        <s.CloseButton onClick={handleCloseButtonClick}>
          <CrossIcon color={getCloseIconColor(theme)} size={16} />
        </s.CloseButton>
      </s.Header>
      <s.Subheader>
        <s.LegendContainer>
          <s.LegendRecord color={lineColor}>
            <MinusIcon size={16} color={lineColor} />
            Duration
          </s.LegendRecord>
          <s.LegendRecord color={areaColor}>
            <MinusIcon size={16} color={areaColor} />
            P50 ~ P95
          </s.LegendRecord>
        </s.LegendContainer>
        <s.ZoomButtonsContainer>
          <s.ZoomButton onClick={handleZoomOutButtonClick}>
            <MinusIcon size={16} color={zoomButtonIconColor} />
          </s.ZoomButton>
          <s.ZoomButton onClick={handleZoomInButtonClick}>
            <PlusIcon size={16} color={zoomButtonIconColor} />
          </s.ZoomButton>
        </s.ZoomButtonsContainer>
      </s.Subheader>
      <s.ChartsContainer>
        <s.ChartContainer ref={containerRef}>
          <ResponsiveContainer
            width={isZoomed ? chartWidth : "100%"}
            height={"100%"}
          >
            <ComposedChart
              data={data}
              margin={{
                left: 8,
                bottom: 4
              }}
            >
              <CartesianGrid
                strokeDasharray={"2 2"}
                stroke={axisColor}
                horizontal={false}
                verticalCoordinatesGenerator={(props: {
                  width: number | undefined;
                  offset: ChartOffset;
                }) => {
                  if (!props.width || !props.offset.left) {
                    return [];
                  }

                  let linesCount = 5;

                  const lines = [];
                  const interval = Math.floor(props.width / linesCount);
                  let left = props.offset.left;

                  while (linesCount) {
                    lines.push(left);
                    linesCount--;
                    left += interval;
                  }

                  return lines;
                }}
              />
              {data.length > 1 && (
                <Area
                  name={"P50 ~ P95"}
                  dataKey={() =>
                    p50 && p95 ? [p50.duration.raw, p95.duration.raw] : []
                  }
                  stroke={areaColor}
                  fill={areaColor}
                  fillOpacity={0.2}
                  isAnimationActive={false}
                  activeDot={false}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  onMouseMove={handleAreaMouseMove}
                  onMouseLeave={handleAreaMouseLeave}
                />
              )}
              <XAxis
                dataKey={"dateTimeValue"}
                tickLine={false}
                tick={{
                  fill: tickLabelColor,
                  fontSize: 10,
                  width: 60
                }}
                stroke={axisColor}
                tickFormatter={formatDate}
              />
              <Line
                name={"Duration"}
                dataKey={(x: ExtendedLiveDataRecord): number => x.duration.raw}
                stroke={lineColor}
                dot={{
                  stroke: lineColor,
                  fill: lineColor,
                  r: 2,
                  onMouseOver: handleDotMouseOver,
                  onMouseLeave: handleDotMouseLeave
                }}
                isAnimationActive={false}
                activeDot={false}
              />
              {areaTooltip && (
                <Tooltip
                  coordinate={areaTooltip}
                  content={
                    <TooltipContent>
                      {([p50, p95].filter(Boolean) as PercentileInfo[]).map(
                        (x) => (
                          <span key={x.percentile}>
                            {x.label}: {x.duration.value} {x.duration.unit}
                          </span>
                        )
                      )}
                    </TooltipContent>
                  }
                  cursor={false}
                  isAnimationActive={false}
                />
              )}
              {dotToolTip && (
                <Tooltip
                  coordinate={dotToolTip.coordinates}
                  content={
                    <TooltipContent>
                      <span>
                        {dotToolTip.data.duration.value}{" "}
                        {dotToolTip.data.duration.unit}
                      </span>
                      <span>
                        {format(
                          new Date(dotToolTip.data.dateTime),
                          "HH:mm:ss.SSS MM/dd/yyyy"
                        )}
                      </span>
                    </TooltipContent>
                  }
                  isAnimationActive={false}
                  cursor={false}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </s.ChartContainer>
        <s.AxisChartContainer>
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <ComposedChart
              data={data}
              margin={{
                right: 3,
                bottom: 34
              }}
            >
              <YAxis
                dataKey={(x: ExtendedLiveDataRecord) => x.duration.raw}
                tickLine={false}
                tickFormatter={(x: number) =>
                  String(roundTo(convertTo(x, maxDurationUnit), 0))
                }
                tick={{
                  fill: tickLabelColor,
                  fontSize: 10,
                  width: 85
                }}
                stroke={axisColor}
                tickMargin={7}
                orientation={"right"}
                label={{
                  value: `Duration, ${maxDurationUnit}`,
                  angle: 90,
                  position: "insideRight"
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </s.AxisChartContainer>
      </s.ChartsContainer>
    </s.Container>
  );
};
