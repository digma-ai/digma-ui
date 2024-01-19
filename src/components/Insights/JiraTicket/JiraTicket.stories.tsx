import { Meta, StoryObj } from "@storybook/react";
import { JiraTicket } from ".";
import { InsightType } from "../../../types";
import { InsightCategory, InsightScope } from "../types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof JiraTicket> = {
  title: "Insights/JiraTicket",
  component: JiraTicket,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

const insight = {
  firstDetected: "2023-12-05T17:25:47.010Z",
  lastDetected: "2024-01-05T13:14:47.010Z",
  criticality: 0,
  firstCommitId: "b3f7b3f",
  lastCommitId: "a1b2c3d",
  deactivatedCommitId: null,
  reopenCount: 0,
  impact: 0,
  name: "Top Usage",
  type: InsightType.SpanUsages,
  category: InsightCategory.Usage,
  specifity: 4,
  isRecalculateEnabled: true,
  importance: 5,
  span: "DelayAsync",
  sampleTrace: null,
  flows: [],
  scope: InsightScope.Span,
  spanInfo: {
    name: "DelayAsync",
    displayName: "DelayAsync",
    instrumentationLibrary: "SampleInsightsController",
    spanCodeObjectId: "span:SampleInsightsController$_$DelayAsync",
    methodCodeObjectId: null,
    kind: "Internal",
    codeObjectId: null
  },
  shortDisplayInfo: {
    title: "",
    targetDisplayName: "",
    subtitle: "",
    description: ""
  },
  codeObjectId: "SampleInsightsController$_$DelayAsync",
  decorators: null,
  environment: "BOB-LAPTOP[LOCAL]",
  severity: 0,
  prefixedCodeObjectId: "span:SampleInsightsController$_$DelayAsync",
  customStartTime: null,
  actualStartTime: "2023-06-17T00:00:00.000Z"
};

export const Linked: Story = {
  args: {
    summary: "Summary text",
    description: { content: "Multiline\ndescription text", isLoading: false },
    attachment: { url: "https://www.example.com", fileName: "attachment.ext" },
    insight: { ticketLink: "https://digma.ai/ticket/1", ...insight }
  }
};

export const Unlinked: Story = {
  args: {
    summary: "",
    description: { content: "Multiline\ndescription text", isLoading: false },
    attachment: { url: "https://www.example.com", fileName: "attachment.ext" },
    insight: { ticketLink: null, ...insight }
  }
};
