import { Meta, StoryObj } from "@storybook/react";
import { InsightCard } from ".";
import { InsightType } from "../../../types";
import { Button } from "../../common/Button";
import { InsightCategory, InsightScope } from "../types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof InsightCard> = {
  title: "Insights/InsightCard",
  component: InsightCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "asdasdasd",
    data: {
      firstDetected: "2023-12-05T17:25:47.010Z",
      lastDetected: "2024-01-05T13:14:47.010Z",
      criticality: 0,
      firstCommitId: "b3f7b3f",
      lastCommitId: "a1b2c3d",
      deactivatedCommitId: null,
      reopenCount: 0,
      ticketLink: "https://digma.ai",
      impact: 0,
      name: "Suspected N+1 Query",
      type: InsightType.EndpointSpanNPlusOne,
      category: InsightCategory.Performance,
      specifity: 2,
      importance: 3,
      spans: [
        {
          occurrences: 200,
          internalSpan: null,
          clientSpan: {
            name: "1D138649EB4FFA92C0E3C8103404F2",
            displayName: "select * from users where id = :id",
            instrumentationLibrary: "SampleInsightsController",
            spanCodeObjectId:
              "span:SampleInsightsController$_$1D138649EB4FFA92C0E3C8103404F2",
            methodCodeObjectId: null,
            kind: "Client",
            codeObjectId: null
          },
          traceId: "9C510BC1E1CD59DD7E820BC3E8DFD4C4",
          duration: {
            value: 70.08,
            unit: "μs",
            raw: 70081
          },
          fraction: 0.08985711281727758
        }
      ],
      scope: InsightScope.EntrySpan,
      endpointSpan: "HTTP GET /SampleInsights/NPlusOneWithoutInternalSpan",
      spanCodeObjectId:
        "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /SampleInsights/NPlusOneWithoutInternalSpan",
      route: "epHTTP:HTTP GET /SampleInsights/NPlusOneWithoutInternalSpan",
      serviceName: "PetClinic",
      spanInfo: {
        name: "HTTP GET /SampleInsights/NPlusOneWithoutInternalSpan",
        displayName: "HTTP GET /SampleInsights/NPlusOneWithoutInternalSpan",
        instrumentationLibrary: "io.opentelemetry.tomcat-10.0",
        spanCodeObjectId:
          "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /SampleInsights/NPlusOneWithoutInternalSpan",
        methodCodeObjectId:
          "method:org.springframework.samples.petclinic.sample.SampleInsightsController$_$genNPlusOneWithoutInternalSpan",
        kind: "Server",
        codeObjectId:
          "org.springframework.samples.petclinic.sample.SampleInsightsController$_$genNPlusOneWithoutInternalSpan"
      },
      shortDisplayInfo: {
        title: "",
        targetDisplayName: "",
        subtitle: "",
        description: ""
      },
      codeObjectId:
        "org.springframework.samples.petclinic.sample.SampleInsightsController$_$genNPlusOneWithoutInternalSpan",
      decorators: [
        {
          title: "N+1 Suspected",
          description: "Supected NPlus One"
        }
      ],
      environment: "SAMPLE_ENV",
      severity: 0,
      isRecalculateEnabled: false,
      prefixedCodeObjectId:
        "method:org.springframework.samples.petclinic.sample.SampleInsightsController$_$genNPlusOneWithoutInternalSpan",
      customStartTime: null,
      actualStartTime: "2023-06-16T10:30:33.027Z"
    },
    stats: "Some stats",
    isAsync: true,
    content: (
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quis
        iusto corrupti eum optio quibusdam odit laborum voluptatem excepturi. Et
        eveniet at ducimus facilis temporibus nisi accusamus velit, illum
        quisquam?
      </span>
    ),
    buttons: [
      <Button
        key={"button_label"}
        onClick={() => {
          return undefined;
        }}
      >
        Button label
      </Button>
    ],
    menuItems: ["menu item 1", "menu item 2", "menu item 3"],
    expandableContent: (
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quis
        iusto corrupti eum optio quibusdam odit laborum voluptatem excepturi. Et
        eveniet at ducimus facilis temporibus nisi accusamus velit, illum
        quisquam?
      </span>
    )
  }
};
