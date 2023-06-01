import { format } from "date-fns";
import { UIEvent, useEffect, useRef, useState } from "react";
import useDimensions from "react-cool-dimensions";
import useScrollbarSize from "react-scrollbar-size";

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
import { isNumber } from "../../../typeGuards/isNumber";
import { roundTo } from "../../../utils/roundTo";
import { getThemeKind } from "../../common/App/styles";
import { ArrowSmallIcon } from "../../common/icons/ArrowSmallIcon";
import { ChartIcon } from "../../common/icons/ChartIcon";
import { CrossIcon } from "../../common/icons/CrossIcon";
import { DoubleCircleIcon } from "../../common/icons/DoubleCircleIcon";
import { EndpointIcon } from "../../common/icons/EndpointIcon";
import { MinusIcon } from "../../common/icons/MinusIcon";
import { PlusIcon } from "../../common/icons/PlusIcon";
import { Direction } from "../../common/icons/types";
import { AreaTooltipContent } from "./AreaTooltipContent";
import { ChangeStatus } from "./ChangeStatus";
import { DotTooltipContent } from "./DotTooltipContent";
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

const getLatestDataButtonIconColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#3538cd";
    case "dark":
    case "dark-jetbrains":
      return "#b9c2eb";
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

const formatXAxisDate = (dateTime: number): string =>
  format(new Date(dateTime), "HH:mm MM/dd/yyyy");

export const LiveView = (props: LiveViewProps) => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);
  const lineColor = getLineColor(theme);
  const axisColor = getAxisColor(theme);
  const areaColor = getAreaColor(theme);
  const tickLabelColor = getTickLabelColor(theme);
  const zoomButtonIconColor = getZoomButtonIconColor(theme);
  const latestDataButtonIconColor = getLatestDataButtonIconColor(theme);
  const { observe, width } = useDimensions();
  const previousWidth = usePrevious(width);
  const [containerInitialWidth, setContainerInitialWidth] =
    useState<number>(width);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState<number>(width);
  const previousChartWidth = usePrevious(chartWidth);
  const [isZoomed, setIsZoomed] = useState(false);
  const [areaTooltip, setAreaTooltip] = useState<Coordinates>();
  const [dotToolTip, setDotTooltip] = useState<DotTooltipProps>();
  const [scrollPercentagePosition, setScrollPercentagePosition] = useState(1);
  const scrollbar = useScrollbarSize();

  useEffect(() => {
    observe(chartContainerRef.current);
  }, [observe, chartContainerRef.current]);

  useEffect(() => {
    if (previousWidth !== width) {
      setContainerInitialWidth(width);
      if (width > chartWidth) {
        setChartWidth(width);
      }
    }
  }, [width, previousWidth, chartWidth]);

  useEffect(() => {
    const el = chartContainerRef.current;
    if (el && previousChartWidth !== chartWidth) {
      el.scrollTo({
        left: scrollPercentagePosition * el.scrollWidth - el.clientWidth
      });
    }
  }, [previousChartWidth, chartWidth, scrollPercentagePosition]);

  const persistScrollPosition = () => {
    const el = chartContainerRef.current;
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

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    setScrollPercentagePosition(
      (e.currentTarget.scrollLeft + e.currentTarget.clientWidth) /
        e.currentTarget.scrollWidth
    );
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

  const handleLatestDataButtonClick = () => {
    setScrollPercentagePosition(1);

    const el = chartContainerRef.current;
    if (el) {
      el.scrollTo({
        left: el.scrollWidth - el.clientWidth
      });
    }
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
  const maxDurationDigitCount = maxDuration
    ? String(Math.ceil(maxDuration.value)).length
    : 0;
  const YAxisTickMargin = Math.round(maxDurationDigitCount * 5.5);
  const YAxisWidth = Math.round(12 + maxDurationDigitCount * 7.5);

  const scrollbarOffset =
    chartContainerRef.current &&
    chartContainerRef.current.scrollWidth >
      chartContainerRef.current.clientWidth
      ? scrollbar.width
      : 0;

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
      {data.length > 0 ? (
        <>
          <s.ZoomButtonsContainer>
            <s.ZoomButton onClick={handleZoomOutButtonClick}>
              <MinusIcon size={16} color={zoomButtonIconColor} />
            </s.ZoomButton>
            <s.ZoomButton onClick={handleZoomInButtonClick}>
              <PlusIcon size={16} color={zoomButtonIconColor} />
            </s.ZoomButton>
          </s.ZoomButtonsContainer>
          <s.ChangeStatusContainer>
            <ChangeStatus percentiles={props.data.durationData.percentiles} />
          </s.ChangeStatusContainer>
          <s.ChartsContainer>
            <s.AxisChartContainer
              scrollbarOffset={scrollbarOffset}
              width={YAxisWidth}
            >
              <ResponsiveContainer width={"100%"} height={"100%"}>
                <ComposedChart
                  data={data}
                  margin={{
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
                      textAnchor: "start"
                    }}
                    stroke={axisColor}
                    tickMargin={YAxisTickMargin}
                    width={YAxisWidth}
                    label={{
                      value: maxDurationUnit,
                      position: "bottom",
                      fill: tickLabelColor,
                      fontSize: 10,
                      offset: 16
                    }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </s.AxisChartContainer>
            <s.ChartContainer ref={chartContainerRef} onScroll={handleScroll}>
              <ResponsiveContainer
                width={isZoomed ? chartWidth : "100%"}
                height={"100%"}
              >
                <ComposedChart
                  data={data}
                  margin={{
                    bottom: 4
                  }}
                >
                  <CartesianGrid
                    strokeDasharray={"2"}
                    stroke={axisColor}
                    horizontal={false}
                    verticalCoordinatesGenerator={(props: {
                      width: number | undefined;
                      offset: ChartOffset;
                    }) => {
                      if (!props.width || !isNumber(props.offset.left)) {
                        return [];
                      }

                      let linesCount = 5;

                      const lines = [];
                      const interval = Math.floor(props.width / linesCount);
                      let left = props.offset.left + interval;

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
                    tickFormatter={formatXAxisDate}
                  />
                  <Line
                    dataKey={(x: ExtendedLiveDataRecord): number =>
                      x.duration.raw
                    }
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
                  {areaTooltip && p50 && p95 && (
                    <Tooltip
                      coordinate={areaTooltip}
                      content={<AreaTooltipContent p50={p50} p95={p95} />}
                      cursor={false}
                      isAnimationActive={false}
                    />
                  )}
                  {dotToolTip && (
                    <Tooltip
                      coordinate={dotToolTip.coordinates}
                      content={<DotTooltipContent data={dotToolTip.data} />}
                      isAnimationActive={false}
                      cursor={{
                        stroke: "#dadada",
                        strokeDasharray: "3"
                      }}
                    />
                  )}
                </ComposedChart>
              </ResponsiveContainer>
            </s.ChartContainer>
          </s.ChartsContainer>
          <s.Footer>
            <s.LegendContainer>
              <s.AreaLegendIllustration color={areaColor} />
              Slowest 5% - Median
            </s.LegendContainer>
            {scrollPercentagePosition < 1 && (
              <s.LatestDataButton onClick={handleLatestDataButtonClick}>
                Latest Data
                <ArrowSmallIcon
                  direction={Direction.RIGHT}
                  color={latestDataButtonIconColor}
                />
              </s.LatestDataButton>
            )}
          </s.Footer>
        </>
      ) : (
        <s.NoDataContainer>
          <ChartIcon size={72} themeKind={themeKind} />
          <s.NoDataTitle>No data yet</s.NoDataTitle>
          <s.NoDataText>
            Trigger some actions to follow the performance.
          </s.NoDataText>
        </s.NoDataContainer>
      )}
    </s.Container>
  );
};
