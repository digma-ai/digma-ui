import { Meta, StoryObj } from "@storybook/react";
import { EnvironmentSelector } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EnvironmentSelector> = {
  title: "Insights/InsightsCatalog/EnvironmentSelector",
  component: EnvironmentSelector,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    environments: [
      {
        environment: {
          id: "1",
          name: "Production",
          type: "Public"
        },
        issueCounts: {
          highCriticality: 5,
          mediumCriticality: 3,
          lowCriticality: 1
        }
      },
      {
        environment: {
          id: "2",
          name: "Staging",
          type: "Public"
        },
        issueCounts: {
          highCriticality: 2,
          mediumCriticality: 4,
          lowCriticality: 0
        }
      },
      {
        environment: {
          id: "3",
          name: "Development",
          type: "Public"
        },
        issueCounts: {
          highCriticality: 0,
          mediumCriticality: 1,
          lowCriticality: 2
        }
      },
      {
        environment: {
          id: "4",
          name: "Without Issues",
          type: "Public"
        },
        issueCounts: {
          highCriticality: 0,
          mediumCriticality: 0,
          lowCriticality: 0
        }
      }
    ]
  }
};
