import { Meta, StoryObj } from "@storybook/react";
import { Insights } from ".";
import { InsightType } from "../../types";
import { ComponentType, InsightCategory, InsightScope } from "./types";

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

export const NoData: Story = {};

export const WithData: Story = {
  args: {
    data: {
      insights: [
        {
          name: "Request Breakdown",
          type: InsightType.EndpointBreakdown,
          category: InsightCategory.Usage,
          specifity: 4,
          importance: 6,
          isRecalculateEnabled: true,
          components: [
            {
              type: ComponentType.Internal,
              fraction: 1
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
          actualStartTime: "2023-06-26T00:00:00.000Z"
        },
        {
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
          actualStartTime: "2023-06-26T13:53:53.645Z"
        },
        {
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
          actualStartTime: "2023-06-26T13:53:57.956Z"
        },
        {
          name: "Low Usage",
          type: InsightType.LowUsage,
          category: InsightCategory.Usage,
          specifity: 4,
          importance: 6,
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
          name: "Bottleneck Detected",
          type: InsightType.SlowestSpans,
          category: InsightCategory.Performance,
          specifity: 3,
          importance: 2,
          spans: [
            {
              spanInfo: {
                name: "Validating account funds",
                displayName: "Validating account funds",
                instrumentationLibrary: "MoneyTransferDomainService",
                spanCodeObjectId:
                  "span:MoneyTransferDomainService$_$Validating account funds",
                methodCodeObjectId: null,
                kind: "Internal",
                codeObjectId: null
              },
              probabilityOfBeingBottleneck: 0.2564102564102564,
              avgDurationWhenBeingBottleneck: {
                value: 2,
                unit: "sec",
                raw: 2003535300
              },
              p50: {
                fraction: 0,
                maxDuration: {
                  value: 0,
                  unit: "ns",
                  raw: 0
                }
              },
              p95: {
                fraction: 0,
                maxDuration: {
                  value: 0,
                  unit: "ns",
                  raw: 0
                }
              },
              p99: {
                fraction: 0,
                maxDuration: {
                  value: 0,
                  unit: "ns",
                  raw: 0
                }
              }
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
          isRecalculateEnabled: false,
          prefixedCodeObjectId:
            "method:Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
          customStartTime: null,
          actualStartTime: "2023-06-12T13:49:08.186Z"
        },
        {
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
          actualStartTime: "2023-06-12T13:49:03.486Z"
        },
        {
          name: "Performance Stats",
          type: InsightType.SpanDurations,
          category: InsightCategory.Performance,
          specifity: 4,
          isRecalculateEnabled: true,
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
          actualStartTime: "2023-06-13T00:00:00.000Z"
        },
        {
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
          actualStartTime: "2023-06-20T00:00:00.000Z"
        }
      ],
      methodInfo: {
        spans: [
          {
            spanCodeObjectId: "empty_span1_id",
            spanName: "empty_span1"
          },
          {
            spanCodeObjectId: "empty_span2_id",
            spanName: "empty_span2"
          }
        ],
        hasRelatedCodeObjectIds: true
      },
      assetId: "string",
      serviceName: "string",
      environment: "string"
    }
  }
};
