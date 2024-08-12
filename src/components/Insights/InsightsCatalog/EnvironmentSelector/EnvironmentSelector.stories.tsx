import { Meta, StoryObj } from "@storybook/react";

import { EnvironmentSelector } from ".";
import { SelectorEnvironment } from "./types";

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

const mockedEnvironments: SelectorEnvironment[] = [
  {
    environment: {
      id: "1",
      name: "Development",
      type: "Private"
    },
    issueCounts: {
      highCriticality: 1,
      mediumCriticality: 2,
      lowCriticality: 3
    }
  },
  {
    environment: {
      id: "2",
      name: "Staging",
      type: "Private"
    },
    issueCounts: {
      highCriticality: 0,
      mediumCriticality: 2,
      lowCriticality: 3
    }
  },
  {
    environment: {
      id: "3",
      name: "Production",
      type: "Private"
    },
    issueCounts: {
      highCriticality: 0,
      mediumCriticality: 0,
      lowCriticality: 3
    }
  }
];

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    environments: mockedEnvironments
  }
};

export const WithCarousel: Story = {
  args: {
    environments: [
      ...mockedEnvironments,
      {
        environment: {
          id: "4",
          name: "Custom",
          type: "Private"
        },
        issueCounts: {
          highCriticality: 0,
          mediumCriticality: 0,
          lowCriticality: 1
        }
      },
      {
        environment: {
          id: "5",
          name: "Custom2",
          type: "Private"
        },
        issueCounts: {
          highCriticality: 0,
          mediumCriticality: 0,
          lowCriticality: 2
        }
      }
    ]
  }
};
