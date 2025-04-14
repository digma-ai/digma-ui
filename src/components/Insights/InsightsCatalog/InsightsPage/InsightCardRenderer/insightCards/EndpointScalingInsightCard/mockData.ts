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
  turningPointConcurrency: 5,
  maxConcurrency: 9,
  minDuration: {
    value: 9.1,
    unit: "ms",
    raw: 9098884.61833865
  },
  maxDuration: {
    value: 34.28,
    unit: "ms",
    raw: 34278875.03671072
  },
  flowHash: "",
  issueLocation: "Span",
  histogram: {
    lineFunction: {
      A: 1556615.0413785747,
      B: 0.29089712035014054,
      C: 9098883.61833865,
      KneeX: 5.743450145936153,
      $type: "exponent"
    },
    points: [
      {
        x: 1,
        y: 15968366.170570357,
        occurrences: 139825,
        negligible: false
      },
      {
        x: 2,
        y: 12940692.905096898,
        occurrences: 59134,
        negligible: false
      },
      {
        x: 3,
        y: 9151696.144007443,
        occurrences: 22934,
        negligible: false
      },
      {
        x: 4,
        y: 9098884.61833865,
        occurrences: 8463,
        negligible: false
      },
      {
        x: 5,
        y: 10240765.271654764,
        occurrences: 3221,
        negligible: false
      },
      {
        x: 6,
        y: 13616007.83293301,
        occurrences: 1249,
        negligible: false
      },
      {
        x: 7,
        y: 25946974.649618886,
        occurrences: 581,
        negligible: false
      },
      {
        x: 8,
        y: 30054854.44606414,
        occurrences: 343,
        negligible: false
      },
      {
        x: 9,
        y: 34278875.03671072,
        occurrences: 227,
        negligible: false
      },
      {
        x: 10,
        y: 34937979.086021505,
        occurrences: 186,
        negligible: true
      },
      {
        x: 11,
        y: 29936882.636363633,
        occurrences: 200,
        negligible: true
      },
      {
        x: 12,
        y: 28419015.78726968,
        occurrences: 199,
        negligible: true
      },
      {
        x: 13,
        y: 23508810.331274565,
        occurrences: 137,
        negligible: true
      },
      {
        x: 14,
        y: 20265642.228571426,
        occurrences: 125,
        negligible: true
      },
      {
        x: 15,
        y: 13226994.824561406,
        occurrences: 152,
        negligible: true
      },
      {
        x: 16,
        y: 13032020.495495494,
        occurrences: 111,
        negligible: true
      },
      {
        x: 17,
        y: 13696774.660633486,
        occurrences: 91,
        negligible: true
      },
      {
        x: 18,
        y: 24421427.30829421,
        occurrences: 71,
        negligible: true
      },
      {
        x: 19,
        y: 15494992.174515236,
        occurrences: 76,
        negligible: true
      },
      {
        x: 20,
        y: 14215335.51020408,
        occurrences: 49,
        negligible: true
      },
      {
        x: 21,
        y: 15688993.130366901,
        occurrences: 61,
        negligible: true
      },
      {
        x: 22,
        y: 15562939.108061751,
        occurrences: 53,
        negligible: true
      },
      {
        x: 23,
        y: 10903889.829192549,
        occurrences: 56,
        negligible: true
      },
      {
        x: 24,
        y: 13321730.053191489,
        occurrences: 47,
        negligible: true
      },
      {
        x: 25,
        y: 11680250.27027027,
        occurrences: 37,
        negligible: true
      },
      {
        x: 26,
        y: 10011658.653846154,
        occurrences: 36,
        negligible: true
      },
      {
        x: 27,
        y: 6934111.030595815,
        occurrences: 46,
        negligible: true
      },
      {
        x: 28,
        y: 8205554.336734696,
        occurrences: 42,
        negligible: true
      },
      {
        x: 29,
        y: 5742216.632860041,
        occurrences: 51,
        negligible: true
      },
      {
        x: 30,
        y: 4502219.294871796,
        occurrences: 52,
        negligible: true
      },
      {
        x: 31,
        y: 4079368.4210526315,
        occurrences: 38,
        negligible: true
      },
      {
        x: 32,
        y: 3001028.3203125,
        occurrences: 48,
        negligible: true
      },
      {
        x: 33,
        y: 7576430.303030304,
        occurrences: 23,
        negligible: true
      },
      {
        x: 34,
        y: 8593071.671826623,
        occurrences: 19,
        negligible: true
      },
      {
        x: 35,
        y: 4232771.948051948,
        occurrences: 11,
        negligible: true
      },
      {
        x: 36,
        y: 4337564.087301587,
        occurrences: 28,
        negligible: true
      },
      {
        x: 37,
        y: 5692613.153153154,
        occurrences: 15,
        negligible: true
      },
      {
        x: 38,
        y: 2489640.7268170426,
        occurrences: 21,
        negligible: true
      },
      {
        x: 39,
        y: 1562211.2489660878,
        occurrences: 31,
        negligible: true
      },
      {
        x: 40,
        y: 2299987.0312499995,
        occurrences: 16,
        negligible: true
      },
      {
        x: 41,
        y: 2999119.7936210134,
        occurrences: 26,
        negligible: true
      },
      {
        x: 42,
        y: 1072403.8515406162,
        occurrences: 34,
        negligible: true
      },
      {
        x: 43,
        y: 1160312.0639534884,
        occurrences: 16,
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
        x: 50,
        y: 14254112,
        occurrences: 1,
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
  extraHistograms: [],
  sourceSpanInfo: null,
  scope: InsightScope.EntrySpan,
  route: "epSpan:Execute ServicePipelineExecutionMessage",
  serviceName: "Digma.Pipeline.Worker",
  spanInfo: {
    uid: "04bf283c-f820-11ef-b7b8-7215f134c660",
    name: "Execute ServicePipelineExecutionMessage",
    displayName: "Execute ServicePipelineExecutionMessage",
    instrumentationLibrary: "PipelineConnector",
    spanCodeObjectId:
      "span:PipelineConnector$_$Execute ServicePipelineExecutionMessage",
    methodCodeObjectId: null,
    kind: "Internal"
  },
  codeObjectId:
    "span:PipelineConnector$_$Execute ServicePipelineExecutionMessage",
  id: "64687cde-148b-11f0-b94a-3a87d9c352a4",
  shortDisplayInfo: {
    title: "Scaling Issue Found",
    targetDisplayName: "",
    subtitle: "",
    description: "Significant performance degradation at 5 executions/second"
  },
  decorators: [
    {
      title: "Scaling badly",
      description:
        "This code experiences exponential grows in duration after 5 concurrent executions"
    }
  ],
  environment: "ENV1#ID#3140161A-52C6-4994-AF81-51D2F4572E1A",
  severity: 0.9364017241514355,
  impact: 0,
  criticality: 0.9192292131858377,
  reopenCount: 0,
  ticketLink: null,
  isRecalculateEnabled: false,
  isDismissible: true,
  isReadable: true,
  isDismissed: false,
  customStartTime: null,
  actualStartTime: "0001-01-01T00:00:00",
  firstCommitId: "",
  lastCommitId: null,
  deactivatedCommitId: null,
  sourceSpanCodeObjectInsight: "span:Npgsql$_$94E7B3FFF8FCB2D57C85140445C053",
  firstDetected: "2025-04-08T15:08:56.605051Z",
  lastDetected: "2025-04-14T13:10:47.127954Z",
  status: InsightStatus.Active,
  flags: [],
  isRead: false,
  firstFixed: null,
  lastReopen: null,
  lastDeactivated: null,
  ignoreCriticalityOnInsert: false,
  type: InsightType.EndpointScaling
};

export const mockedEndpointScalingWithSpanInsight: EndpointScalingInsight = {
  ...mockedEndpointScalingInsight,
  issueLocation: "Span",
  sourceSpanInfo: {
    sampleTraceId: "02C0295F83E81BAC2048125275936F74",
    spanCodeObjectId: "span:Npgsql$_$94E7B3FFF8FCB2D57C85140445C053",
    uid: "e02b14d6-f81f-11ef-909d-7215f134c660",
    name: "94E7B3FFF8FCB2D57C85140445C053",
    displayName:
      "INSERT INTO code_object_insight_related_services (id, code_object_insight_uid, service)\nVALUES (gen_random_uuid(), @InsightUid, @Service_0), (gen_random_uuid(), @InsightUid, @Service_1), (gen_random_uuid(), @InsightUid, @Service_2), (gen_random_uuid(), @InsightUid, @Service_3), (gen_random_uuid(), @InsightUid, @Service_4), (gen_random_uuid(), @InsightUid, @Service_5), (gen_random_uuid(), @InsightUid, @Service_6), (gen_random_uuid(), @InsightUid, @Service_7)\nON CONFLICT (code_object_insight_uid, service) DO NOTHING",
    instrumentationLibrary: "Npgsql",
    methodCodeObjectId: null,
    kind: "Client"
  }
};

export const mockedEndpointScalingWithRootCauseInsight: EndpointScalingInsight =
  {
    ...mockedEndpointScalingWithSpanInsight,
    issueLocation: "SpanRootCause"
  };
