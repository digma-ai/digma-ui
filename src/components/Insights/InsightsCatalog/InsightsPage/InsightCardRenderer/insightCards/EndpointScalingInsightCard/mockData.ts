import { InsightType } from "../../../../../../../types";
import {
  InsightCategory,
  InsightScope,
  InsightStatus,
  type EndpointScalingInsight
} from "../../../../../types";

export const mockedEndpointScalingInsight: EndpointScalingInsight = {
  name: "Scaling Issue Found",
  category: InsightCategory.Performance,
  specifity: 2,
  importance: 2,
  turningPointConcurrency: 0,
  maxConcurrency: 11,
  minDuration: {
    value: 8.02,
    unit: "ms",
    raw: 8021001.110043491
  },
  maxDuration: {
    value: 29.66,
    unit: "ms",
    raw: 29655127.250608273
  },
  flowHash: "",
  issueLocation: "Endpoint",
  histogram: {
    lineFunction: {
      A: 1375173.514291253,
      B: 2565254.915088458,
      $type: "linear"
    },
    points: [
      {
        x: 1,
        y: 14607677.879437726,
        occurrences: 148753,
        negligible: false
      },
      {
        x: 2,
        y: 11803958.18842775,
        occurrences: 66020,
        negligible: false
      },
      {
        x: 3,
        y: 8221377.6361382995,
        occurrences: 26358,
        negligible: false
      },
      {
        x: 4,
        y: 8021001.110043491,
        occurrences: 9887,
        negligible: false
      },
      {
        x: 5,
        y: 8586327.215457913,
        occurrences: 3778,
        negligible: false
      },
      {
        x: 6,
        y: 11890889.534617146,
        occurrences: 1454,
        negligible: false
      },
      {
        x: 7,
        y: 21276288.073394496,
        occurrences: 654,
        negligible: false
      },
      {
        x: 8,
        y: 25235655.799999997,
        occurrences: 375,
        negligible: false
      },
      {
        x: 9,
        y: 29655127.250608273,
        occurrences: 274,
        negligible: false
      },
      {
        x: 10,
        y: 32662940.0921659,
        occurrences: 217,
        negligible: true
      },
      {
        x: 11,
        y: 24430388.17807707,
        occurrences: 243,
        negligible: false
      },
      {
        x: 12,
        y: 24345829.976303317,
        occurrences: 211,
        negligible: true
      },
      {
        x: 13,
        y: 20567738.929313928,
        occurrences: 148,
        negligible: true
      },
      {
        x: 14,
        y: 17387076.659959756,
        occurrences: 142,
        negligible: true
      },
      {
        x: 15,
        y: 11173767.130124776,
        occurrences: 187,
        negligible: true
      },
      {
        x: 16,
        y: 12027726.270325202,
        occurrences: 123,
        negligible: true
      },
      {
        x: 17,
        y: 12397954.105998836,
        occurrences: 101,
        negligible: true
      },
      {
        x: 18,
        y: 21540104.824561402,
        occurrences: 76,
        negligible: true
      },
      {
        x: 19,
        y: 13579636.205899362,
        occurrences: 91,
        negligible: true
      },
      {
        x: 20,
        y: 13869119.375,
        occurrences: 56,
        negligible: true
      },
      {
        x: 21,
        y: 15929635.752078611,
        occurrences: 63,
        negligible: true
      },
      {
        x: 22,
        y: 13600998.671328671,
        occurrences: 65,
        negligible: true
      },
      {
        x: 23,
        y: 9900698.457223002,
        occurrences: 62,
        negligible: true
      },
      {
        x: 24,
        y: 12550286.11111111,
        occurrences: 57,
        negligible: true
      },
      {
        x: 25,
        y: 9515048.181818182,
        occurrences: 44,
        negligible: true
      },
      {
        x: 26,
        y: 8039182.859531772,
        occurrences: 46,
        negligible: true
      },
      {
        x: 27,
        y: 5753428.420256992,
        occurrences: 49,
        negligible: true
      },
      {
        x: 28,
        y: 8243403.291316527,
        occurrences: 51,
        negligible: true
      },
      {
        x: 29,
        y: 5517133.103448276,
        occurrences: 55,
        negligible: true
      },
      {
        x: 30,
        y: 4896342.307692308,
        occurrences: 52,
        negligible: true
      },
      {
        x: 31,
        y: 4257104.368279571,
        occurrences: 48,
        negligible: true
      },
      {
        x: 32,
        y: 3112727.6692708335,
        occurrences: 48,
        negligible: true
      },
      {
        x: 33,
        y: 6220973.93939394,
        occurrences: 30,
        negligible: true
      },
      {
        x: 34,
        y: 8630617.492260061,
        occurrences: 19,
        negligible: true
      },
      {
        x: 35,
        y: 4580231.8367346935,
        occurrences: 14,
        negligible: true
      },
      {
        x: 36,
        y: 4687220.7854406135,
        occurrences: 29,
        negligible: true
      },
      {
        x: 37,
        y: 5490797.635135136,
        occurrences: 16,
        negligible: true
      },
      {
        x: 38,
        y: 2500707.769423559,
        occurrences: 21,
        negligible: true
      },
      {
        x: 39,
        y: 1593112.564102564,
        occurrences: 30,
        negligible: true
      },
      {
        x: 40,
        y: 1994433.1521739129,
        occurrences: 23,
        negligible: true
      },
      {
        x: 41,
        y: 2922902.1680216803,
        occurrences: 27,
        negligible: true
      },
      {
        x: 42,
        y: 1115516.6666666667,
        occurrences: 34,
        negligible: true
      },
      {
        x: 43,
        y: 1195679.7342192691,
        occurrences: 14,
        negligible: true
      },
      {
        x: 44,
        y: 1119005.1136363638,
        occurrences: 8,
        negligible: true
      },
      {
        x: 45,
        y: 1092412.7777777778,
        occurrences: 4,
        negligible: true
      },
      {
        x: 46,
        y: 13479380.43478261,
        occurrences: 1,
        negligible: true
      },
      {
        x: 47,
        y: 1229638.2978723403,
        occurrences: 1,
        negligible: true
      },
      {
        x: 49,
        y: 2117240.8163265307,
        occurrences: 1,
        negligible: true
      },
      {
        x: 50,
        y: 9130085.000000002,
        occurrences: 2,
        negligible: true
      },
      {
        x: 54,
        y: 4611370.987654321,
        occurrences: 3,
        negligible: true
      },
      {
        x: 57,
        y: 4830350.8771929825,
        occurrences: 1,
        negligible: true
      },
      {
        x: 60,
        y: 3911891.666666667,
        occurrences: 1,
        negligible: true
      },
      {
        x: 67,
        y: 3778249.2537313434,
        occurrences: 1,
        negligible: true
      },
      {
        x: 74,
        y: 990583.7837837839,
        occurrences: 1,
        negligible: true
      }
    ]
  },
  scope: InsightScope.EntrySpan,
  route: "route",
  serviceName: "serviceName",
  spanInfo: {
    uid: "dc8ea81a-f81f-11ef-bd96-7215f134c660",
    name: "InsightNodeExecutionConsumer InvokeBatch",
    displayName: "InsightNodeExecutionConsumer InvokeBatch",
    instrumentationLibrary: "InsightNodeExecutionConsumer",
    spanCodeObjectId:
      "span:InsightNodeExecutionConsumer$_$InsightNodeExecutionConsumer InvokeBatch",
    methodCodeObjectId: null,
    kind: "Consumer"
  },
  codeObjectId:
    "span:InsightNodeExecutionConsumer$_$InsightNodeExecutionConsumer InvokeBatch",
  id: "67138e6a-148b-11f0-b6b8-3a87d9c352a4",
  shortDisplayInfo: {
    title: "Scaling Issue Found",
    targetDisplayName: "",
    subtitle: "",
    description: "Constant performance degradation by 2.57 ms per execution"
  },
  decorators: [
    {
      title: "Scaling badly",
      description:
        "This code experiences linearly grows in duration with the concurrent executions by 2.57 ms per execution"
    }
  ],
  environment: "ENV1#ID#3140161A-52C6-4994-AF81-51D2F4572E1A",
  severity: 0.9387848299576458,
  impact: 0,
  criticality: 0.9360378975471422,
  reopenCount: 0,
  ticketLink: null,
  isRecalculateEnabled: false,
  isDismissible: true,
  isReadable: true,
  isDismissed: false,
  customStartTime: null,
  actualStartTime: "2025-03-26T07:23:22.418146Z",
  firstCommitId: "",
  lastCommitId: "",
  deactivatedCommitId: null,
  sourceSpanCodeObjectInsight: "span:Npgsql$_$94E7B3FFF8FCB2D57C85140445C053",
  firstDetected: "2025-04-08T15:09:01.08002Z",
  lastDetected: "2025-04-09T07:23:36.378227Z",
  status: InsightStatus.Active,
  flags: [],
  isRead: false,
  firstFixed: null,
  lastReopen: null,
  lastDeactivated: null,
  ignoreCriticalityOnInsert: false,
  type: InsightType.EndpointScaling,
  sourceSpanInfo: {
    displayName: "sourceSpanInfo displayName",
    spanCodeObjectId:
      "span:InsightNodeExecutionConsumer$_$InsightNodeExecutionConsumer InvokeBatch",
    sampleTraceId: "3E41E4197B696CA9BF1157AEB254DFE0",
    instrumentationLibrary: "InsightNodeExecutionConsumer",
    methodCodeObjectId: null,
    kind: "Consumer",
    name: "name"
  }
};

export const ofEndpoint = {
  codeObjectId: "SampleInsightsController$_$GetUsers",
  spanInfo: {
    name: "GetUsers",
    displayName: "GetUsers",
    instrumentationLibrary: "SampleInsightsController",
    spanCodeObjectId: "span:SampleInsightsController$_$GetUsers",
    methodCodeObjectId: null,
    kind: "Server",
    codeObjectId: null
  }
};

export const ofDbSpan = {
  codeObjectId: "UsersStorageService$_$QueryUsers",
  spanInfo: {
    name: "QueryUsers",
    displayName: "QueryUsers",
    instrumentationLibrary: "UsersStorageService",
    spanCodeObjectId: "span:UsersStorageService$_$QueryUsers",
    methodCodeObjectId: null,
    kind: "Internal",
    codeObjectId: null
  }
};

export const withAffectedEndpoints = {
  affectedEndpoints: [
    {
      route: "epHTTP:HTTP GET SampleInsights/lock/{milisec}1",
      serviceName: "Sample.MoneyTransfer.API",
      sampleTraceId: "3E41E4197B696CA9BF1157AEB254DFE0",
      flowHash: "2C8EE08C75056058690249E52382F5",
      name: "HTTP GET SampleInsights/lock/{milisec}1",
      displayName: "HTTP GET SampleInsights/lock/{milisec}1",
      instrumentationLibrary: "OpenTelemetry.Instrumentation.AspNetCore",
      spanCodeObjectId:
        "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP GET SampleInsights/lock/{milisec}",
      methodCodeObjectId:
        "Sample.MoneyTransfer.API.Controllers.SampleInsightsController$_$Lock(Double)",
      kind: "Server",
      codeObjectId:
        "Sample.MoneyTransfer.API.Controllers.SampleInsightsController$_$Lock(Double)"
    },
    {
      route: "epHTTP:HTTP GET SampleInsights/lock/{milisec}2",
      serviceName: "Sample.MoneyTransfer.API",
      sampleTraceId: "3E41E4197B696CA9BF1157AEB254DFEd0dd",
      flowHash: "2C8EE08C75056058690249E52382F5",
      name: "HTTP GET SampleInsights/lock/{milisec}2",
      displayName: "HTTP GET SampleInsights/lock/{milisec}2",
      instrumentationLibrary: "OpenTelemetry.Instrumentation.AspNetCore",
      spanCodeObjectId:
        "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP GET SampleInsights/lock/{milisec}2",
      methodCodeObjectId:
        "Sample.MoneyTransfer.API.Controllers.SampleInsightsController$_$Lock(Double)",
      kind: "Server",
      codeObjectId:
        "Sample.MoneyTransfer.API.Controllers.SampleInsightsController$_$Lock(Double)"
    },
    {
      route: "epHTTP:HTTP GET SampleInsights/lock/{milisec}3",
      serviceName: "Sample.MoneyTransfer.API",
      sampleTraceId: "3E41E4197B696CA9BF1157AEB254DFE02",
      flowHash: "2C8EE08C75056058690249E52382F5",
      name: "HTTP GET SampleInsights/lock/{milisec}3",
      displayName: "HTTP GET SampleInsights/lock/{milisec}3",
      instrumentationLibrary: "OpenTelemetry.Instrumentation.AspNetCore",
      spanCodeObjectId:
        "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP GET SampleInsights/lock/{milisec}3",
      methodCodeObjectId:
        "Sample.MoneyTransfer.API.Controllers.SampleInsightsController$_$Lock(Double)",
      kind: "Server",
      codeObjectId:
        "Sample.MoneyTransfer.API.Controllers.SampleInsightsController$_$Lock(Double)"
    },
    {
      route: "epHTTP:HTTP GET SampleInsights/lock/{milisec}4",
      serviceName: "Sample.MoneyTransfer.API",
      sampleTraceId: "3E41E4197B696CA9BF1157AEB254DFE0",
      flowHash: "2C8EE08C75056058690249E52382F5",
      name: "HTTP GET SampleInsights/lock/{milisec}",
      displayName: "HTTP GET SampleInsights/lock/{milisec}",
      instrumentationLibrary: "OpenTelemetry.Instrumentation.AspNetCore",
      spanCodeObjectId:
        "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP GET SampleInsights/lock/{milisec}4",
      methodCodeObjectId:
        "Sample.MoneyTransfer.API.Controllers.SampleInsightsController$_$Lock(Double)",
      kind: "Server",
      codeObjectId:
        "Sample.MoneyTransfer.API.Controllers.SampleInsightsController$_$Lock(Double)"
    }
  ]
};

export const withRootCause = {
  rootCauseSpans: [
    {
      instrumentationLibrary: "io.opentelemetry.somedb-10.0",
      name: "fc3425f345f4",
      displayName: "SELECT * FROM users",
      sampleTraceId: "3E41E4197B696CA9BF1157AEB254DFE0",
      spanCodeObjectId: "span:io.opentelemetry.somedb-10.0$_$fc3425f345f4",
      kind: "Client",
      methodCodeObjectId: null,
      flowHash: "2C8EE08C75056058690249E52382F5",
      codeObjectId: null
    }
  ]
};
