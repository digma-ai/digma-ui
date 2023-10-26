import { InsightType } from "../../../../types";
import { InfiniteLoopIcon } from "../../../common/icons/InfiniteLoopIcon";
import { EnvironmentTypeData } from "./types";

export const environmentTypesData: EnvironmentTypeData[] = [
  {
    id: "local-deployment",
    icon: <InfiniteLoopIcon height={24} />,
    name: "Local Deployment",
    description:
      "Download them to a relative path to the Docker Compose file you are running",
    status: "active",
    insights: [
      {
        type: InsightType.SpanEndpointBottleneck,
        count: 0
      },
      {
        type: InsightType.EndpointDurationSlowdown
      },
      {
        type: InsightType.SlowestSpans,
        count: 34
      }
    ]
  },
  {
    id: "testing-and-ci",
    icon: <InfiniteLoopIcon height={24} />,
    name: "Testing & CI",
    description:
      "Download them to a relative path to the Docker Compose file you are running",
    status: "waiting-for-data",
    insights: [
      {
        type: InsightType.SpanEndpointBottleneck,
        count: 0
      },
      {
        type: InsightType.EndpointDurationSlowdown,
        count: 34
      },
      {
        type: InsightType.SlowestSpans,
        count: 34
      }
    ]
  },
  {
    id: "production",
    icon: <InfiniteLoopIcon height={24} />,
    name: "Production",
    description:
      "Download them to a relative path to the Docker Compose file you are running",
    insights: [
      {
        type: InsightType.SpanEndpointBottleneck,
        isDisabled: true
      },
      {
        type: InsightType.EndpointDurationSlowdown,
        isDisabled: true
      },
      {
        type: InsightType.SlowestSpans,
        isDisabled: true
      }
    ]
  }
];
