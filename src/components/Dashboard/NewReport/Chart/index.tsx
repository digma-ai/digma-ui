import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import addHeatmap from "highcharts/modules/heatmap";
import addTreemapModule from "highcharts/modules/treemap";
import * as s from "./styles";
import { ChartProps } from "./types";
addTreemapModule(Highcharts);
addHeatmap(Highcharts);

const baseOptions = (
  type: "squarified" | "stripes" | "strip" | "sliceAndDice"
) => ({
  colorAxis: {
    maxColor: "#B92B2B",
    minColor: "#2BA0B9"
  },
  legend: {
    enabled: false
  },
  series: [
    {
      type: "treemap",
      layoutStartingDirection: "horizontal",
      layoutAlgorithm: type ?? "sliceAndDice",
      alternateStartingDirection: true,
      borderRadius: 12,
      clip: false,
      levels: [
        {
          level: 1,
          borderWidth: 12,
          borderColor: "#1A1B1E", // todo color depends on theme
          dataLabels: {
            enabled: true,
            align: "center",
            verticalAlign: "middle",
            padding: 24,

            style: {
              fontSize: 32,
              color: "#FFFFFF",
              fontWeight: "400"
            }
          }
        }
      ],
      data: [
        {
          name: "Payment Service </br> 12 / 1500",
          value: 6,
          colorValue: 6
        },
        {
          name: "Transaction Service </br> 15 / 710",
          value: 5,
          colorValue: 5
        },
        {
          name: "Share Service </br> 5 / 530",
          value: 3,
          colorValue: 3
        },
        {
          name: "Metadata Service </br> 2 / 100",
          value: 1,
          colorValue: 1
        }
      ]
    }
  ],
  chart: {
    backgroundColor: "transparent",
    height: "100%", // 16:9 ratio,Transaction Service
    margin: 0
  }
});

export const Chart = ({ type }: ChartProps) => {
  return (
    <s.Container>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          ...baseOptions(type),
          title: "test"
        }}
      />
    </s.Container>
  );
};
