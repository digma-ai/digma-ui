import { Meta, StoryObj } from "@storybook/react";
import { TreeMap } from ".";
import { ServiceTile } from "../../Dashboard/NewReport/Chart/ServiceTile";

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
    data: [
      {
        id: "payment",
        value: 1500,
        content: (
          <ServiceTile
            name={"Payment Service"}
            criticalIssuesCount={12}
            score={1500}
            scoreCriterion={"criticality"}
            severity={"Top"}
            viewMode={"baseline"}
          />
        )
      },
      {
        id: "transaction",
        value: 710,
        content: (
          <ServiceTile
            name={"Transaction Service"}
            criticalIssuesCount={15}
            score={710}
            scoreCriterion={"criticality"}
            severity={"High"}
            viewMode={"baseline"}
          />
        )
      },
      {
        id: "share",
        value: 530,
        content: (
          <ServiceTile
            name={"Share Service"}
            criticalIssuesCount={5}
            score={530}
            scoreCriterion={"criticality"}
            severity={"Medium"}
            viewMode={"baseline"}
          />
        )
      },
      {
        id: "metadata",
        value: 100,
        content: (
          <ServiceTile
            name={"Metadata Service"}
            criticalIssuesCount={2}
            score={100}
            scoreCriterion={"criticality"}
            severity={"Low"}
            viewMode={"baseline"}
          />
        )
      },
      {
        id: "monitoring",
        value: 3,
        content: (
          <ServiceTile
            name={"Monitoring Service"}
            criticalIssuesCount={2}
            score={100}
            scoreCriterion={"criticality"}
            severity={"Low"}
            viewMode={"baseline"}
          />
        )
      }
    ]
  }
};
