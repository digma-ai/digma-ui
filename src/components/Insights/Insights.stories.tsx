import { Meta, StoryObj } from "@storybook/react";
import { Insights } from ".";
import { InsightType } from "../../types";
import { mockedBottleneckInsight } from "./BottleneckInsight/mockData";
import { mockedEndpointNPlusOneInsight } from "./EndpointNPlusOneInsight/mockData";
import { mockedHighNumberOfQueriesInsight } from "./HighNumberOfQueriesInsight/mockData";
import { mockedSpanNexusInsight } from "./SpanNexusInsight/mockData";
import {
  CodeObjectErrorsInsight,
  ComponentType,
  EndpointSlowestSpansInsight,
  InsightCategory,
  InsightScope,
  InsightsStatus,
  SpanNPlusOneInsight,
  ViewMode
} from "./types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Insights> = {
  title: "Insights/Insights",
  component: Insights,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: {
      totalCount: 100,
      // spans: [
      //   {
      //     spanCodeObjectId: "empty_span1_id",
      //     spanDisplayName: "empty_span1"
      //   },
      //   {
      //     spanCodeObjectId: "empty_span2_id",
      //     spanDisplayName: "empty_span2"
      //   }
      // ],
      // assetId: "string",
      // serviceName: "string",
      // environment: "string",
      viewMode: ViewMode.INSIGHTS,
      // hasMissingDependency: false,
      insightsStatus: InsightsStatus.DEFAULT,
      // methods: [],
      // canInstrumentMethod: false,
      // needsObservabilityFix: false,
      insights: [
        {
          sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
          id: "60b55792-8362-4c5d-9628-7cce7979ad6d",
          firstDetected: "2023-12-05T17:25:47.010Z",
          lastDetected: "2024-01-05T13:14:47.010Z",
          criticality: 0.8,
          firstCommitId: "b3f7b3f",
          lastCommitId: "a1b2c3d",
          deactivatedCommitId: null,
          reopenCount: 0,
          ticketLink: null,
          impact: 0,
          name: "N+1",
          type: InsightType.SpanNPlusOne,
          category: InsightCategory.Performance,
          specifity: 2,
          importance: 2,
          span: {
            name: "OwnerValidation.ValidateOwner",
            displayName: "OwnerValidation.ValidateOwner",
            instrumentationLibrary:
              "io.opentelemetry.opentelemetry-instrumentation-annotations-1.16",
            spanCodeObjectId:
              "span:io.opentelemetry.opentelemetry-instrumentation-annotations-1.16$_$OwnerValidation.ValidateOwner",
            methodCodeObjectId:
              "org.springframework.samples.petclinic.domain.OwnerValidation$_$ValidateOwner",
            kind: "Internal",
            codeObjectId:
              "org.springframework.samples.petclinic.domain.OwnerValidation$_$ValidateOwner"
          },
          occurrences: 100,
          traceId: "00D37A4E7208E0F6E89AA7E2E37446A6",
          clientSpanName: "select * from users where id = :id",
          clientSpanCodeObjectId:
            "span:OwnerController$_$1D138649EB4FFA92C0E3C8103404F2",
          duration: {
            value: 1.64,
            unit: "sec",
            raw: 1636050588.0
          },
          endpoints: [
            {
              endpointInfo: {
                route: "HTTP POST /owners/new",
                instrumentationLibrary: "OwnerController",
                spanCodeObjectId:
                  "span:OwnerController$_$1D138649EB4FFA92C0E3C8103404F2",
                entrySpanCodeObjectId:
                  "span:io.opentelemetry.tomcat-10.0$_$HTTP POST /owners/new",
                serviceName: "spring-petclinic"
              },
              occurrences: 100,
              criticality: 1,
              impact: 0,
              severity: 0
            },
            {
              endpointInfo: {
                route: "HTTP POST /owners/new2",
                instrumentationLibrary: "OwnerController",
                spanCodeObjectId:
                  "span:OwnerController$_$1D138649EB4FFA92C0E3C8103404F3",
                entrySpanCodeObjectId:
                  "span:io.opentelemetry.tomcat-10.0$_$HTTP POST /owners/new2",
                serviceName: "spring-petclinic"
              },
              occurrences: 100,
              criticality: 1,
              impact: 0,
              severity: 0
            }
          ],
          scope: InsightScope.Span,
          spanInfo: {
            name: "OwnerValidation.ValidateOwner",
            displayName: "OwnerValidation.ValidateOwner",
            instrumentationLibrary:
              "io.opentelemetry.opentelemetry-instrumentation-annotations-1.16",
            spanCodeObjectId:
              "span:io.opentelemetry.opentelemetry-instrumentation-annotations-1.16$_$OwnerValidation.ValidateOwner",
            methodCodeObjectId:
              "org.springframework.samples.petclinic.domain.OwnerValidation$_$ValidateOwner",
            kind: "Internal",
            codeObjectId:
              "org.springframework.samples.petclinic.domain.OwnerValidation$_$ValidateOwner"
          },
          shortDisplayInfo: {
            title: "",
            targetDisplayName: "",
            subtitle: "",
            description: ""
          },
          codeObjectId:
            "org.springframework.samples.petclinic.domain.OwnerValidation$_$ValidateOwner",
          decorators: [
            {
              title: "N+1",
              description: "Supected NPlus One"
            }
          ],
          environment: "BOB-LAPTOP[LOCAL]",
          severity: 0.0,
          isRecalculateEnabled: false,
          prefixedCodeObjectId:
            "method:org.springframework.samples.petclinic.domain.OwnerValidation$_$ValidateOwner",
          customStartTime: null,
          actualStartTime: "2023-07-27T08:23:56.500827Z"
        } as SpanNPlusOneInsight,
        {
          hasAsyncSpans: false,
          sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
          id: "62b55792-8262-4c5d-9628-7cce7979ad6d",
          firstDetected: "2023-12-05T17:25:47.010Z",
          lastDetected: "2024-01-05T13:14:47.010Z",
          criticality: 0,
          firstCommitId: "b3f7b3f",
          lastCommitId: "a1b2c3d",
          deactivatedCommitId: null,
          reopenCount: 0,
          ticketLink: null,
          impact: 0,
          name: "Request Breakdown",
          type: InsightType.EndpointBreakdown,
          category: InsightCategory.Usage,
          specifity: 4,
          importance: 6,
          isRecalculateEnabled: true,
          components: [
            {
              type: ComponentType.Internal,
              fraction: 1,
              duration: null
            }
          ],
          p50Components: [
            {
              type: ComponentType.Internal,
              fraction: 1,
              duration: null
            }
          ],
          p95Components: [
            {
              type: ComponentType.Internal,
              fraction: 1,
              duration: null
            }
          ],
          scope: InsightScope.EntrySpan,
          endpointSpan: "HTTP POST Transfer/TransferFunds",
          spanCodeObjectId:
            "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP POST Transfer/TransferFunds",
          route: "epHTTP:HTTP POST Transfer/TransferFunds",
          serviceName: "Sample.MoneyTransfer.API",
          spanInfo: {
            name: "HTTP POST Transfer/TransferFunds",
            displayName: "HTTP POST Transfer/TransferFunds",
            instrumentationLibrary: "OpenTelemetry.Instrumentation.AspNetCore",
            spanCodeObjectId:
              "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP POST Transfer/TransferFunds",
            methodCodeObjectId:
              "method:Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
            kind: "Server",
            codeObjectId:
              "Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)"
          },
          shortDisplayInfo: {
            title: "Request Breakdown",
            targetDisplayName: "",
            subtitle: "",
            description: ""
          },
          codeObjectId:
            "Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
          decorators: null,
          environment: "BOB-LAPTOP[LOCAL]",
          severity: 0,
          prefixedCodeObjectId:
            "method:Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
          customStartTime: null,
          actualStartTime: "2023-06-26T00:00:00.000Z",
          isDismissed: false,
          isDismissible: true
        },
        {
          sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
          id: "60b55792-3262-4c5d-9628-7cce7979ad6d",
          firstDetected: "2023-12-05T17:25:47.010Z",
          lastDetected: "2024-01-05T13:14:47.010Z",
          criticality: 0,
          firstCommitId: "b3f7b3f",
          lastCommitId: "a1b2c3d",
          deactivatedCommitId: null,
          reopenCount: 0,
          ticketLink: null,
          impact: 0,
          name: "Errors",
          type: InsightType.Errors,
          scope: InsightScope.Function,
          category: InsightCategory.Errors,
          specifity: 4,
          importance: 5,
          errorCount: 2,
          unhandledCount: 0,
          unexpectedCount: 0,
          topErrors: [
            {
              uid: "305f52ec-1428-11ee-a28c-0242ac170004",
              codeObjectId:
                "method:Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
              errorType: "System.NullReferenceException",
              sourceCodeObjectId:
                "method:Sample.MoneyTransfer.API.Domain.Services.MoneyTransferDomainService$_$ValidateAccountFunds(Account,Int32)"
            },
            {
              uid: "29dbdf80-1428-11ee-b389-0242ac170004",
              codeObjectId:
                "method:Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
              errorType: "System.Exception",
              sourceCodeObjectId:
                "method:Sample.MoneyTransfer.API.Domain.Services.MoneyTransferDomainService$_$TransferFunds(Int64,Int64,Int32)"
            }
          ],
          shortDisplayInfo: {
            title: "",
            targetDisplayName: "",
            subtitle: "",
            description: ""
          },
          codeObjectId:
            "Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
          decorators: null,
          environment: "BOB-LAPTOP[LOCAL]",
          severity: 0,
          isRecalculateEnabled: false,
          prefixedCodeObjectId:
            "method:Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
          customStartTime: null,
          actualStartTime: "2023-06-26T13:53:53.645Z",
          isDismissed: false,
          isDismissible: true
        },
        {
          sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
          id: "60b55792-4262-4c5d-9628-7cce7979ad6d",
          firstDetected: "2023-12-05T17:25:47.010Z",
          lastDetected: "2024-01-05T13:14:47.010Z",
          criticality: 0,
          firstCommitId: "b3f7b3f",
          lastCommitId: "a1b2c3d",
          deactivatedCommitId: null,
          reopenCount: 0,
          ticketLink: null,
          impact: 0,
          name: "Errors Hotspot",
          type: InsightType.HotSpot,
          scope: InsightScope.Function,
          category: InsightCategory.Errors,
          specifity: 3,
          importance: 2,
          score: 82,
          updatedAt: "2023-06-26T13:53:52.758Z",
          shortDisplayInfo: {
            title: "",
            targetDisplayName: "",
            subtitle: "",
            description: ""
          },
          codeObjectId:
            "Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
          decorators: [
            {
              title: "Error Hotspot",
              description: "Error hotspot detected"
            }
          ],
          environment: "BOB-LAPTOP[LOCAL]",
          severity: 0,
          isRecalculateEnabled: false,
          prefixedCodeObjectId:
            "method:Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
          customStartTime: null,
          actualStartTime: "2023-06-26T13:53:57.956Z",
          isDismissed: false,
          isDismissible: true
        },
        {
          sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
          id: "60b55792-8252-4c5d-9628-7cce7979ad6d",
          firstDetected: "2023-12-05T17:25:47.010Z",
          lastDetected: "2024-01-05T13:14:47.010Z",
          criticality: 0,
          firstCommitId: "b3f7b3f",
          lastCommitId: "a1b2c3d",
          deactivatedCommitId: null,
          reopenCount: 0,
          ticketLink: null,
          impact: 0,
          name: "Low Usage",
          type: InsightType.LowUsage,
          category: InsightCategory.Usage,
          specifity: 4,
          importance: 6,
          isDismissed: false,
          isDismissible: true,
          decorators: [
            {
              title: "Low Usage",
              description: "Low level of usage for this endpoint"
            }
          ],
          maxCallsIn1Min: 39,
          scope: InsightScope.EntrySpan,
          endpointSpan: "HTTP POST Transfer/TransferFunds",
          spanCodeObjectId:
            "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP POST Transfer/TransferFunds",
          route: "epHTTP:HTTP POST Transfer/TransferFunds",
          serviceName: "Sample.MoneyTransfer.API",
          spanInfo: {
            name: "HTTP POST Transfer/TransferFunds",
            displayName: "HTTP POST Transfer/TransferFunds",
            instrumentationLibrary: "OpenTelemetry.Instrumentation.AspNetCore",
            spanCodeObjectId:
              "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP POST Transfer/TransferFunds",
            methodCodeObjectId:
              "method:Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
            kind: "Server",
            codeObjectId:
              "Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)"
          },
          shortDisplayInfo: {
            title: "",
            targetDisplayName: "",
            subtitle: "",
            description: ""
          },
          codeObjectId:
            "Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
          environment: "BOB-LAPTOP[LOCAL]",
          severity: 0,
          isRecalculateEnabled: false,
          prefixedCodeObjectId:
            "method:Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
          customStartTime: null,
          actualStartTime: "2023-06-12T13:48:59.404Z"
        },
        {
          sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
          id: "60b55792-8262-4c5d-5628-7cce7979ad6d",
          firstDetected: "2023-12-05T17:25:47.010Z",
          lastDetected: "2024-01-05T13:14:47.010Z",
          criticality: 0,
          firstCommitId: "b3f7b3f",
          lastCommitId: "a1b2c3d",
          deactivatedCommitId: null,
          reopenCount: 0,
          ticketLink: null,
          impact: 0,
          name: "Bottleneck Detected",
          type: InsightType.SlowestSpans,
          category: InsightCategory.Performance,
          specifity: 3,
          importance: 2,
          // spans: [
          //   {
          //     spanInfo: {
          //       name: "Validating account funds",
          //       displayName: "Validating account funds",
          //       instrumentationLibrary: "MoneyTransferDomainService",
          //       spanCodeObjectId:
          //         "span:MoneyTransferDomainService$_$Validating account funds",
          //       methodCodeObjectId: null,
          //       kind: "Internal",
          //       codeObjectId: null
          //     },
          //     probabilityOfBeingBottleneck: 0.2564102564102564,
          //     avgDurationWhenBeingBottleneck: {
          //       value: 2,
          //       unit: "sec",
          //       raw: 2003535300
          //     },
          //     criticality: 0,
          //     p50: {
          //       fraction: 0,
          //       maxDuration: {
          //         value: 0,
          //         unit: "ns",
          //         raw: 0
          //       }
          //     },
          //     p95: {
          //       fraction: 0,
          //       maxDuration: {
          //         value: 0,
          //         unit: "ns",
          //         raw: 0
          //       }
          //     },
          //     p99: {
          //       fraction: 0,
          //       maxDuration: {
          //         value: 0,
          //         unit: "ns",
          //         raw: 0
          //       }
          //     }
          //   }
          // ],
          scope: InsightScope.EntrySpan,
          // endpointSpan: "HTTP POST Transfer/TransferFunds",
          // spanCodeObjectId:
          //   "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP POST Transfer/TransferFunds",
          // route: "epHTTP:HTTP POST Transfer/TransferFunds",
          // serviceName: "Sample.MoneyTransfer.API",
          spanInfo: {
            name: "HTTP POST Transfer/TransferFunds",
            displayName: "HTTP POST Transfer/TransferFunds",
            instrumentationLibrary: "OpenTelemetry.Instrumentation.AspNetCore",
            spanCodeObjectId:
              "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP POST Transfer/TransferFunds",
            methodCodeObjectId:
              "method:Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
            kind: "Server",
            codeObjectId:
              "Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)"
          },
          shortDisplayInfo: {
            title: "",
            targetDisplayName: "HTTP POST Transfer/TransferFunds",
            subtitle: "1 spans",
            description: "Validating account funds 2 sec"
          },
          codeObjectId:
            "Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
          decorators: null,
          environment: "BOB-LAPTOP[LOCAL]",
          severity: 0,
          isRecalculateEnabled: true,
          prefixedCodeObjectId:
            "method:Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
          customStartTime: null,
          actualStartTime: "2023-06-12T13:49:08.186Z"
        } as EndpointSlowestSpansInsight,
        {
          sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
          id: "60b55792-8262-4c5d-9628-6cce7979ad6d",
          firstDetected: "2023-12-05T17:25:47.010Z",
          lastDetected: "2024-01-05T13:14:47.010Z",
          criticality: 0,
          firstCommitId: "b3f7b3f",
          lastCommitId: "a1b2c3d",
          deactivatedCommitId: null,
          reopenCount: 0,
          ticketLink: null,
          impact: 0,
          name: "Span Duration Breakdown",
          type: InsightType.SpanDurationBreakdown,
          category: InsightCategory.Performance,
          specifity: 4,
          isRecalculateEnabled: true,
          importance: 6,
          spanName: "HTTP POST Transfer/TransferFunds",
          spanCodeObjectId:
            "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP POST Transfer/TransferFunds",
          breakdownEntries: [
            {
              spanName: "Process transfer",
              spanDisplayName: "Process transfer",
              spanInstrumentationLibrary: "TransferController",
              spanCodeObjectId: "span:TransferController$_$Process transfer",
              percentiles: [
                {
                  percentile: 0.5,
                  duration: {
                    value: 1.38,
                    unit: "ms",
                    raw: 1377500
                  }
                },
                {
                  percentile: 0.95,
                  duration: {
                    value: 2.03,
                    unit: "sec",
                    raw: 2025478200
                  }
                }
              ],
              codeObjectId: null
            }
          ],
          scope: InsightScope.Span,
          spanInfo: {
            name: "HTTP POST Transfer/TransferFunds",
            displayName: "HTTP POST Transfer/TransferFunds",
            instrumentationLibrary: "OpenTelemetry.Instrumentation.AspNetCore",
            spanCodeObjectId:
              "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP POST Transfer/TransferFunds",
            methodCodeObjectId:
              "method:Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
            kind: "Server",
            codeObjectId:
              "Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)"
          },
          shortDisplayInfo: {
            title: "",
            targetDisplayName: "",
            subtitle: "",
            description: ""
          },
          codeObjectId:
            "Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
          decorators: null,
          environment: "BOB-LAPTOP[LOCAL]",
          severity: 0,
          prefixedCodeObjectId:
            "method:Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
          customStartTime: null,
          actualStartTime: "2023-06-12T13:49:03.486Z",
          isDismissed: false,
          isDismissible: true
        },
        {
          sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
          id: "60b55792-8262-4c5d-9628-7cce8979ad6d",
          firstDetected: "2023-12-05T17:25:47.010Z",
          lastDetected: "2024-01-05T13:14:47.010Z",
          criticality: 0,
          firstCommitId: "b3f7b3f",
          lastCommitId: "a1b2c3d",
          deactivatedCommitId: null,
          reopenCount: 0,
          ticketLink: null,
          impact: 0,
          name: "Performance Stats",
          type: InsightType.SpanDurations,
          category: InsightCategory.Performance,
          specifity: 4,
          isRecalculateEnabled: true,
          isDismissed: false,
          isDismissible: true,
          spanCodeObjectId:
            "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP POST Transfer/TransferFunds",
          span: {
            name: "HTTP POST Transfer/TransferFunds",
            displayName: "HTTP POST Transfer/TransferFunds",
            instrumentationLibrary: "OpenTelemetry.Instrumentation.AspNetCore",
            spanCodeObjectId:
              "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP POST Transfer/TransferFunds",
            methodCodeObjectId:
              "method:Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
            kind: "Server",
            codeObjectId:
              "Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)"
          },
          percentiles: [
            {
              percentile: 0.5,
              currentDuration: {
                value: 3.62,
                unit: "ms",
                raw: 3621000
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["CDA40BEAD59BB7F6B7FCB45418CF85B7"]
            },
            {
              percentile: 0.95,
              currentDuration: {
                value: 2.03,
                unit: "sec",
                raw: 2028139000
              },
              previousDuration: null,
              changeTime: null,
              changeVerified: null,
              traceIds: ["D5B065E9806001DD507A8526A0E945E0"]
            }
          ],
          lastSpanInstanceInfo: {
            traceId: "8176E7EBC4214E07D659DA66ED775087",
            spanId: "C13CC104120A2C43",
            startTime: "2023-06-26T13:48:53.351Z",
            duration: {
              value: 2.97,
              unit: "ms",
              raw: 2970000
            }
          },
          scope: InsightScope.Span,
          spanInfo: {
            name: "HTTP POST Transfer/TransferFunds",
            displayName: "HTTP POST Transfer/TransferFunds",
            instrumentationLibrary: "OpenTelemetry.Instrumentation.AspNetCore",
            spanCodeObjectId:
              "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP POST Transfer/TransferFunds",
            methodCodeObjectId:
              "method:Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
            kind: "Server",
            codeObjectId:
              "Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)"
          },
          shortDisplayInfo: {
            title: "",
            targetDisplayName: "",
            subtitle: "",
            description: ""
          },
          codeObjectId:
            "Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
          decorators: [],
          environment: "BOB-LAPTOP[LOCAL]",
          importance: 5,
          severity: 0,
          prefixedCodeObjectId:
            "method:Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
          customStartTime: null,
          actualStartTime: "2023-06-13T00:00:00.000Z",
          isAsync: false
        },
        {
          sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
          id: "60b55792-8262-4c5d-9628-7cce9979ad6d",
          firstDetected: "2023-12-05T17:25:47.010Z",
          lastDetected: "2024-01-05T13:14:47.010Z",
          criticality: 0,
          firstCommitId: "b3f7b3f",
          lastCommitId: "a1b2c3d",
          deactivatedCommitId: null,
          reopenCount: 0,
          ticketLink: null,
          impact: 0,
          name: "Scaling Insufficient Data",
          type: InsightType.SpanScalingInsufficientData,
          category: InsightCategory.Performance,
          specifity: 4,
          importance: 5,
          concurrencies: [
            {
              calls: 1,
              meanDuration: {
                value: 2.01,
                unit: "sec",
                raw: 2008880500
              }
            },
            {
              calls: 29,
              meanDuration: {
                value: 3.55,
                unit: "ms",
                raw: 3548000
              }
            }
          ],
          scope: InsightScope.Span,
          spanInfo: {
            name: "HTTP POST Transfer/TransferFunds",
            displayName: "HTTP POST Transfer/TransferFunds",
            instrumentationLibrary: "OpenTelemetry.Instrumentation.AspNetCore",
            spanCodeObjectId:
              "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP POST Transfer/TransferFunds",
            methodCodeObjectId:
              "method:Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
            kind: "Server",
            codeObjectId:
              "Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)"
          },
          shortDisplayInfo: {
            title: "Scaling Data",
            targetDisplayName: "",
            subtitle: "",
            description: "Partial scale data is available"
          },
          codeObjectId:
            "Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
          decorators: null,
          environment: "BOB-LAPTOP[LOCAL]",
          severity: 0,
          isRecalculateEnabled: false,
          prefixedCodeObjectId:
            "method:Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
          customStartTime: null,
          actualStartTime: "2023-06-20T00:00:00.000Z",
          isDismissed: false,
          isDismissible: true
        },
        mockedEndpointNPlusOneInsight,
        mockedBottleneckInsight,
        mockedHighNumberOfQueriesInsight,
        mockedSpanNexusInsight
      ]
    }
  }
};

export const NoInsights: Story = {
  args: {
    data: {
      // spans: [],
      // assetId: "string",
      // serviceName: "string",
      // environment: "string",
      // canInstrumentMethod: false,
      // needsObservabilityFix: false,
      // hasMissingDependency: false,
      // methods: [],

      viewMode: ViewMode.INSIGHTS,
      insightsStatus: InsightsStatus.NO_INSIGHTS,
      insights: [],
      totalCount: 0
    }
  }
};

export const NoDataYet: Story = {
  args: {
    data: {
      // spans: [],
      // assetId: "string",
      // serviceName: "string",
      // environment: "string",
      // canInstrumentMethod: false,
      // needsObservabilityFix: false,
      // hasMissingDependency: false,
      // methods: [],

      viewMode: ViewMode.INSIGHTS,
      insightsStatus: InsightsStatus.NO_SPANS_DATA,
      insights: [],
      totalCount: 0
    }
  }
};

export const ProcessingInsights: Story = {
  args: {
    data: {
      // spans: [],
      // assetId: "string",
      // serviceName: "string",
      // environment: "string",
      // hasMissingDependency: false,
      // methods: [],
      // canInstrumentMethod: false,
      // needsObservabilityFix: false,

      viewMode: ViewMode.INSIGHTS,
      insightsStatus: InsightsStatus.INSIGHT_PENDING,
      insights: [],
      totalCount: 0
    }
  }
};

export const NoObservability: Story = {
  args: {
    data: {
      // spans: [],
      // assetId: "string",
      // serviceName: "string",
      // environment: "string",
      // hasMissingDependency: false,
      // methods: [],
      // canInstrumentMethod: true,
      // needsObservabilityFix: true

      viewMode: ViewMode.INSIGHTS,
      insightsStatus: InsightsStatus.NO_OBSERVABILITY,
      insights: [],
      totalCount: 0
    }
  }
};

const errorsInsight: CodeObjectErrorsInsight = {
  sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
  id: "60b55792-8262-4c5d-9628-7cce7979ad1d",
  firstDetected: "2023-12-05T17:25:47.010Z",
  lastDetected: "2024-01-05T13:14:47.010Z",
  criticality: 0,
  firstCommitId: "b3f7b3f",
  lastCommitId: "a1b2c3d",
  deactivatedCommitId: null,
  reopenCount: 0,
  ticketLink: null,
  impact: 0,
  name: "Errors",
  type: InsightType.Errors,
  scope: InsightScope.Function,
  category: InsightCategory.Errors,
  specifity: 4,
  importance: 5,
  errorCount: 2,
  unhandledCount: 0,
  unexpectedCount: 0,
  topErrors: [
    {
      uid: "305f52ec-1428-11ee-a28c-0242ac170004",
      codeObjectId:
        "method:Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
      errorType: "System.NullReferenceException",
      sourceCodeObjectId:
        "method:Sample.MoneyTransfer.API.Domain.Services.MoneyTransferDomainService$_$ValidateAccountFunds(Account,Int32)"
    },
    {
      uid: "29dbdf80-1428-11ee-b389-0242ac170004",
      codeObjectId:
        "method:Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
      errorType: "System.Exception",
      sourceCodeObjectId:
        "method:Sample.MoneyTransfer.API.Domain.Services.MoneyTransferDomainService$_$TransferFunds(Int64,Int64,Int32)"
    }
  ],
  shortDisplayInfo: {
    title: "",
    targetDisplayName: "",
    subtitle: "",
    description: ""
  },
  codeObjectId:
    "Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
  decorators: null,
  environment: "BOB-LAPTOP[LOCAL]",
  severity: 0,
  isRecalculateEnabled: false,
  prefixedCodeObjectId:
    "method:Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
  customStartTime: null,
  actualStartTime: "2023-06-26T13:53:53.645Z",
  isDismissed: false,
  isDismissible: true
};

export const NoObservabilityWithInsights: Story = {
  args: {
    data: {
      viewMode: ViewMode.INSIGHTS,
      insightsStatus: InsightsStatus.DEFAULT,
      insights: [errorsInsight],
      totalCount: 0

      // spans: [],
      // assetId: "string",
      // serviceName: "string",
      // environment: "string",
      // hasMissingDependency: false,
      // methods: [],
      // canInstrumentMethod: true,
      // needsObservabilityFix: true
    }
  }
};

export const HasMissingDependency: Story = {
  args: {
    data: {
      // spans: [],
      // assetId: "string",
      // serviceName: "string",
      // environment: "string",
      // hasMissingDependency: true,
      // methods: [],
      // canInstrumentMethod: true,
      // needsObservabilityFix: true
      viewMode: ViewMode.INSIGHTS,
      totalCount: 0,
      insightsStatus: InsightsStatus.NO_OBSERVABILITY,
      insights: []
    }
  }
};

export const HasMissingDependencyWithInsights: Story = {
  args: {
    data: {
      // spans: [],
      // assetId: "string",
      // serviceName: "string",
      // environment: "string",
      // hasMissingDependency: true,
      // methods: [],
      // canInstrumentMethod: true,
      // needsObservabilityFix: true,

      viewMode: ViewMode.INSIGHTS,
      insightsStatus: InsightsStatus.DEFAULT,
      insights: [errorsInsight],
      totalCount: 0
    }
  }
};

export const Startup: Story = {
  args: {
    data: {
      viewMode: ViewMode.INSIGHTS,
      insights: [],
      insightsStatus: InsightsStatus.STARTUP,
      totalCount: 0
      // spans: [],
      // serviceName: "string",
      // environment: "string",
      // methods: [],
      // canInstrumentMethod: false,
      // needsObservabilityFix: false
      // hasMissingDependency: false,
    }
  }
};

export const Preview: Story = {
  args: {
    data: {
      viewMode: ViewMode.PREVIEW,
      totalCount: 0,
      insightsStatus: InsightsStatus.DEFAULT,
      // spans: [],
      // serviceName: "string",
      // environment: "string",
      // hasMissingDependency: false,
      // canInstrumentMethod: false,
      // methods: [
      //   {
      //     id: "method1",
      //     name: "method1"
      //   },
      //   {
      //     id: "method2",
      //     name: "method2"
      //   },
      //   {
      //     id: "method3",
      //     name: "method3"
      //   }
      // ],
      insights: []
      // needsObservabilityFix: false
    }
  }
};
