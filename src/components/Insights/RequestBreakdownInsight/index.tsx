import { Cell, Pie, PieChart } from "recharts";
import { roundTo } from "../../../utils/roundTo";
import { InsightCard } from "../InsightCard";
import { ComponentType } from "../types";
import * as s from "./styles";
import { RequestBreakdownInsightProps } from "./types";

const PIE_CHART_RADIUS = 42;
const PIE_CHART_ARC_WIDTH = 4;

const componentTypeColors = {
  [ComponentType.Internal]: "#53aeb4",
  [ComponentType.DbQueries]: "#b180d7",
  [ComponentType.HttpClients]: "#75beff",
  [ComponentType.Rendering]: "#f55385"
};

export const RequestBreakdownInsight = (
  props: RequestBreakdownInsightProps
) => {
  const data = [...props.insight.components].sort(
    (a, b) => b.fraction - a.fraction
  );

  return (
    <InsightCard
      data={props.insight}
      content={
        <s.ContentContainer>
          <s.PieChartContainer>
            <PieChart width={PIE_CHART_RADIUS} height={PIE_CHART_RADIUS}>
              <Pie
                data={data}
                innerRadius={(PIE_CHART_RADIUS - PIE_CHART_ARC_WIDTH) / 2}
                outerRadius={PIE_CHART_RADIUS / 2}
                cornerRadius={PIE_CHART_ARC_WIDTH / 2}
                paddingAngle={1}
                dataKey={"fraction"}
                isAnimationActive={false}
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.type}
                    fill={componentTypeColors[entry.type]}
                    stroke={"none"}
                  />
                ))}
              </Pie>
            </PieChart>
          </s.PieChartContainer>
          <s.Legend>
            {data.map((x) => (
              <s.LegendItem key={x.type}>
                <s.LegendItemDataColor color={componentTypeColors[x.type]} />
                <s.LegendItemDataLabel>{x.type}</s.LegendItemDataLabel>
                <s.LegendItemDataValue>
                  {roundTo(x.fraction * 100, 2)}%
                </s.LegendItemDataValue>
              </s.LegendItem>
            ))}
          </s.Legend>
        </s.ContentContainer>
      }
    />
  );
};
