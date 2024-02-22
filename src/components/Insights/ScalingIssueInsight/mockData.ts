import { InsightType, SpanInfo } from "../../../types";
import { Duration } from "../../../globals";
import {
  SpanScalingBadlyInsight,
  InsightCategory,
  InsightScope,
  CodeObjectDecorator,
  InsightImportance,
  RootCauseSpanInfo,
  InsightSpecificity,
  AffectedEndpoint
} from "../types";

export class MockedSpanScalingBadlyInsight implements SpanScalingBadlyInsight {
  actualStartTime: string | null;
  affectedEndpoints: AffectedEndpoint[];
  category: InsightCategory.Performance;
  codeObjectId: string;
  criticality: number;
  customStartTime: string | null;
  deactivatedCommitId: string | null;
  decorators: CodeObjectDecorator[] | null;
  environment: string;
  firstCommitId: string | null;
  firstDetected: string | null;
  flowHash: string | null;
  impact: number;
  importance: InsightImportance.Critical;
  isRecalculateEnabled: boolean;
  lastCommitId: string | null;
  lastDetected: string | null;
  maxConcurrency: number;
  maxDuration: Duration;
  minDuration: Duration;
  name: "Scaling Issue Found";
  prefixedCodeObjectId: string | null;
  reopenCount: number;
  rootCauseSpans: RootCauseSpanInfo[];
  scope: InsightScope;
  severity: number;
  shortDisplayInfo: {
    title: string;
    targetDisplayName: string;
    subtitle: string;
    description: string;
  };
  spanInfo: SpanInfo | null;
  spanInstrumentationLibrary: string;
  spanName: string;
  specifity: InsightSpecificity.OwnInsight;
  ticketLink: string | null;
  turningPointConcurrency: number;
  type: InsightType.SpanScalingBadly;

  constructor() {
    this.firstDetected = "2023-12-05T17:25:47.010Z";
    this.lastDetected = "2024-01-05T13:14:47.010Z";
    this.criticality = 0;
    this.firstCommitId = "b3f7b3f";
    this.lastCommitId = "a1b2c3d";
    this.deactivatedCommitId = null;
    this.reopenCount = 0;
    this.ticketLink = null;
    this.impact = 0;
    this.name = "Scaling Issue Found";
    this.type = InsightType.SpanScalingBadly;
    this.category = InsightCategory.Performance;
    this.specifity = 4;
    this.importance = 2;
    this.spanName = "WaitForLock";
    this.spanInstrumentationLibrary = "SampleInsightsController";
    this.turningPointConcurrency = 17;
    this.maxConcurrency = 24;
    this.minDuration = {
      value: 100.67,
      unit: "ms",
      raw: 100671312
    };
    this.maxDuration = {
      value: 7.22,
      unit: "sec",
      raw: 722204462
    };
    this.spanInfo = {
      name: "GetUsers",
      displayName: "GetUsers",
      instrumentationLibrary: "SampleInsightsController",
      spanCodeObjectId: "span:SampleInsightsController$_$GetUsers",
      methodCodeObjectId: null,
      kind: "Server",
      codeObjectId: null
    };
    this.rootCauseSpans = [];
    this.affectedEndpoints = [];
    this.scope = InsightScope.Span;
    this.shortDisplayInfo = {
      title: "Scaling Issue Found",
      targetDisplayName: "",
      subtitle: "",
      description: "Significant performance degradation at 17 executions/second"
    };
    this.codeObjectId = "SampleInsightsController$_$WaitForLock";
    this.decorators = [
      {
        title: "Scaling badly",
        description:
          "This code experiences exponential grows in duration after 17 concurrent executions"
      }
    ];
    this.environment = "BOB-LAPTOP[LOCAL]";
    this.severity = 0;
    this.isRecalculateEnabled = false;
    this.prefixedCodeObjectId = "span:SampleInsightsController$_$WaitForLock";
    this.customStartTime = null;
    this.actualStartTime = "2023-06-24T00:00:00.000Z";
    this.flowHash = null;
  }

  ofEndpoint(): MockedSpanScalingBadlyInsight {
    this.codeObjectId = "SampleInsightsController$_$GetUsers";
    this.spanInfo = {
      name: "GetUsers",
      displayName: "GetUsers",
      instrumentationLibrary: "SampleInsightsController",
      spanCodeObjectId: "span:SampleInsightsController$_$GetUsers",
      methodCodeObjectId: null,
      kind: "Server",
      codeObjectId: null
    };
    return this;
  }

  ofDbSpan(): MockedSpanScalingBadlyInsight {
    this.codeObjectId = "UsersStorageService$_$QueryUsers";
    this.spanInfo = {
      name: "QueryUsers",
      displayName: "QueryUsers",
      instrumentationLibrary: "UsersStorageService",
      spanCodeObjectId: "span:UsersStorageService$_$QueryUsers",
      methodCodeObjectId: null,
      kind: "Internal",
      codeObjectId: null
    };
    return this;
  }

  withAffectedEndpoints(): MockedSpanScalingBadlyInsight {
    this.affectedEndpoints = [
      {
        route: "epHTTP:HTTP GET SampleInsights/lock/{milisec}",
        serviceName: "Sample.MoneyTransfer.API",
        sampleTraceId: "3E41E4197B696CA9BF1157AEB254DFE0",
        flowHash: "2C8EE08C75056058690249E52382F5",
        name: "HTTP GET SampleInsights/lock/{milisec}",
        displayName: "HTTP GET SampleInsights/lock/{milisec}",
        instrumentationLibrary: "OpenTelemetry.Instrumentation.AspNetCore",
        spanCodeObjectId:
          "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP GET SampleInsights/lock/{milisec}",
        methodCodeObjectId:
          "Sample.MoneyTransfer.API.Controllers.SampleInsightsController$_$Lock(Double)",
        kind: "Server",
        codeObjectId:
          "Sample.MoneyTransfer.API.Controllers.SampleInsightsController$_$Lock(Double)"
      }
    ];
    return this;
  }

  withRootCause(): MockedSpanScalingBadlyInsight {
    this.rootCauseSpans = [
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
    ];
    return this;
  }
}
