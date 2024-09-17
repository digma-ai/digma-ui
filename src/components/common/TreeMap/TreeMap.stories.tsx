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
    padding: 40,
    data: [
      {
        id: "payment",
        value: 1500,
        content: (
          <ServiceTile
            name={"Payment Service"}
            criticalIssuesCount={12}
            impactScore={1500}
            severity={"Critical"}
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
            impactScore={710}
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
            impactScore={530}
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
            impactScore={100}
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
            impactScore={100}
            severity={"Low"}
            viewMode={"baseline"}
          />
        )
      }
    ]
  }
};
