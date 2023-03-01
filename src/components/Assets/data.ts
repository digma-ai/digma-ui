import { CodeMarkerPinIcon } from "../common/icons/CodeMarkerPinIcon";
import { DatabaseIcon } from "../common/icons/DatabaseIcon";
import { EndpointIcon } from "../common/icons/EndpointIcon";
import { UserIcon } from "../common/icons/UserIcon";
import { INSIGHT_TYPES } from "./types";

export const data = {
  categories: [
    {
      id: "endpoints",
      label: "Endpoints",
      icon: EndpointIcon,
      items: [
        {
          id: "item1",
          label: "HTTP GET /Users/",
          insights: [
            INSIGHT_TYPES.HotSpot,
            INSIGHT_TYPES.SlowEndpoint,
            INSIGHT_TYPES.SpanScaling
          ]
        },
        {
          id: "item2",
          label: "GRPC /Tests/",
          insights: [INSIGHT_TYPES.SlowEndpoint]
        },
        {
          id: "item3",
          label: "HTTP POST /Table/",
          insights: [INSIGHT_TYPES.HotSpot, INSIGHT_TYPES.SlowEndpoint]
        }
      ]
    },
    {
      id: "consumers",
      label: "Consumers",
      icon: UserIcon,
      items: [
        {
          id: "item1",
          label: "HTTP GET /Users/",
          insights: [
            INSIGHT_TYPES.HotSpot,
            INSIGHT_TYPES.SlowEndpoint,
            INSIGHT_TYPES.SpanScaling
          ]
        },
        {
          id: "item2",
          label: "GRPC /Tests/",
          insights: [INSIGHT_TYPES.SlowEndpoint]
        },
        {
          id: "item3",
          label: "HTTP POST /Table/",
          insights: [INSIGHT_TYPES.HotSpot, INSIGHT_TYPES.SlowEndpoint]
        }
      ]
    },
    {
      id: "databaseQueries",
      label: "Database queries",
      icon: DatabaseIcon,
      items: []
    },
    {
      id: "codeLocations",
      label: "Code locations",
      icon: CodeMarkerPinIcon,
      items: [
        {
          id: "item1",
          label: "HTTP GET /Users/",
          insights: [
            INSIGHT_TYPES.HotSpot,
            INSIGHT_TYPES.SlowEndpoint,
            INSIGHT_TYPES.SpanScaling
          ]
        },
        {
          id: "item2",
          label: "GRPC /Tests/",
          insights: [INSIGHT_TYPES.SlowEndpoint]
        },
        {
          id: "item3",
          label: "HTTP POST /Table/",
          insights: [INSIGHT_TYPES.HotSpot, INSIGHT_TYPES.SlowEndpoint]
        }
      ]
    }
  ]
};
