import type { Meta, StoryObj } from "@storybook/react";
import { TreeMap } from ".";
import { ReportTile } from "../IssuesReport/Chart/ReportTile";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof TreeMap> = {
  title: "common/TreeMap",
  component: TreeMap,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 800,
    height: 800,
    padding: 40,
    minTileDimensions: {
      width: 100,
      height: 100
    },
    data: [
      {
        id: "payment",
        value: 1500,
        content: (
          <ReportTile
            name={"Payment Service"}
            criticalIssuesCount={12}
            score={1500}
            scoreCriterion={"criticality"}
            severity={"Top"}
            timeMode={"baseline"}
            viewLevel={"services"}
          />
        )
      },
      {
        id: "transaction",
        value: 710,
        content: (
          <ReportTile
            name={"Transaction Service"}
            criticalIssuesCount={15}
            score={710}
            scoreCriterion={"criticality"}
            severity={"High"}
            timeMode={"baseline"}
            viewLevel={"services"}
          />
        )
      },
      {
        id: "share",
        value: 530,
        content: (
          <ReportTile
            name={"Share Service"}
            criticalIssuesCount={5}
            score={530}
            scoreCriterion={"criticality"}
            severity={"Medium"}
            timeMode={"baseline"}
            viewLevel={"services"}
          />
        )
      },
      {
        id: "metadata",
        value: 100,
        content: (
          <ReportTile
            name={"Metadata Service"}
            criticalIssuesCount={2}
            score={100}
            scoreCriterion={"criticality"}
            severity={"Low"}
            timeMode={"baseline"}
            viewLevel={"services"}
          />
        )
      },
      {
        id: "monitoring",
        value: 3,
        content: (
          <ReportTile
            name={"Monitoring Service"}
            criticalIssuesCount={2}
            score={100}
            scoreCriterion={"criticality"}
            severity={"Low"}
            timeMode={"baseline"}
            viewLevel={"services"}
          />
        )
      }
    ]
  }
};
