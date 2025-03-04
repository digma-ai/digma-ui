import type { GetPerformanceHighlightsResponse } from "../../../redux/services/types";

export const mockedPerformanceData: GetPerformanceHighlightsResponse = {
  performance: [
    {
      environment: {
        name: "LOCAL-TESTS",
        id: "#DIGMA#TESTS#CODELENSTESTS-SHOW_RUNTIMEDATA_WHENMETHODINSIGHTSWITHOUTDECORATORS-2024/03/04-14:52:41[LOCAL-TESTS]",
        type: "Public"
      },
      p50: {
        duration: {
          value: 20.0,
          unit: "ms",
          raw: 20000000.0
        },
        isCritical: true
      },
      p95: {
        duration: {
          value: 20.0,
          unit: "ms",
          raw: 20000000.0
        },
        isCritical: false
      },
      lastCallTimeStamp: null
    },
    {
      environment: {
        name: "LOCAL-TESTS",
        id: "#DIGMA#TESTS#SPANDURATIONINSIGHTTESTS-SANITY-2024/03/26-16:45:40[LOCAL-TESTS]",
        type: "Public"
      },
      p50: {
        duration: {
          value: 7.94,
          unit: "ms",
          raw: 7944704.0
        }
      },
      p95: {
        duration: {
          value: 19.88,
          unit: "ms",
          raw: 19880704.0
        }
      },
      lastCallTimeStamp: "2024-03-26T14:41:30.481486Z"
    },
    {
      environment: {
        name: "LOCAL-TESTS",
        id: "#DIGMA#TESTS#CODELENSTESTS-SHOW_RUNTIMEDATA_WHENMETHODINSIGHTSWITHOUTDECORATORS-2024/03/14-13:54:22[LOCAL-TESTS]",
        type: "Public"
      },
      p50: {
        duration: {
          value: 20.0,
          unit: "ms",
          raw: 20000000.0
        }
      },
      p95: {
        duration: {
          value: 20.0,
          unit: "ms",
          raw: 20000000.0
        }
      },
      lastCallTimeStamp: "2024-03-14T11:53:22.708519Z"
    },
    {
      environment: {
        name: "LOCAL-TESTS",
        id: "#DIGMA#TESTS#SPANDURATIONINSIGHTTESTS-SANITY-2024/03/14-13:44:43[LOCAL-TESTS]",
        type: "Public"
      },
      p50: {
        duration: {
          value: 7.94,
          unit: "ms",
          raw: 7935744.0
        }
      },
      p95: {
        duration: {
          value: 8.71,
          unit: "ms",
          raw: 8711488.0
        }
      },
      lastCallTimeStamp: "2024-03-14T11:40:33.160219Z"
    },
    {
      environment: {
        name: "LOCAL-TESTS",
        id: "#DIGMA#TESTS#DEACTIVATEINSIGHTSJOBTESTS-SANITY-2024/03/14-13:41:38[LOCAL-TESTS]",
        type: "Public"
      },
      p50: {
        duration: {
          value: 97.66,
          unit: "ms",
          raw: 97664512.0
        }
      },
      p95: {
        duration: {
          value: 107.43,
          unit: "ms",
          raw: 107425280.0
        }
      },
      lastCallTimeStamp: "2024-03-14T11:41:40.11119Z"
    },
    {
      environment: {
        name: "LOCAL-TESTS",
        id: "#DIGMA#TESTS#LIVEDATATESTS-CHECKLIVEDATA-2024/03/14-13:54:33[LOCAL-TESTS]",
        type: "Public"
      },
      p50: {
        duration: {
          value: 20.05,
          unit: "ms",
          raw: 20054272.0
        }
      },
      p95: {
        duration: {
          value: 21.73,
          unit: "ms",
          raw: 21732864.0
        }
      },
      lastCallTimeStamp: "2024-03-14T09:54:43.097589Z"
    }
  ]
};
