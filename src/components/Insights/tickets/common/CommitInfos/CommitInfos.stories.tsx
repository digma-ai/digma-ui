import { Meta, StoryObj } from "@storybook/react";
import { CommitInfos } from ".";
import { mockedNPlusOneInsight } from "../../../NPlusOneInsight/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CommitInfos> = {
  title: "Insights/tickets/common/CommitInfos",
  component: CommitInfos,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    insight: mockedNPlusOneInsight,
    commitInfos: {
      commitInfos: {
        [mockedNPlusOneInsight.firstCommitId as string]: {
          commit: mockedNPlusOneInsight.firstCommitId as string,
          url: mockedNPlusOneInsight.firstCommitId as string
        },
        [mockedNPlusOneInsight.lastCommitId as string]: {
          commit: mockedNPlusOneInsight.lastCommitId as string,
          url: mockedNPlusOneInsight.firstCommitId as string
        }
      }
    }
  }
};

export const WithoutInsight: Story = {};

export const WithoutCommits: Story = {
  args: {
    insight: {
      ...mockedNPlusOneInsight,
      firstCommitId: null,
      lastCommitId: null
    }
  }
};

export const WithoutCommitsDates: Story = {
  args: {
    insight: {
      ...mockedNPlusOneInsight,
      firstDetected: null,
      lastDetected: null
    }
  }
};

export const WithoutCommitsAndDates: Story = {
  args: {
    insight: {
      ...mockedNPlusOneInsight,
      firstCommitId: null,
      lastCommitId: null,
      firstDetected: null,
      lastDetected: null
    }
  }
};

export const WithoutCommitInfos: Story = {
  args: {
    insight: mockedNPlusOneInsight
  }
};

export const WithEmptyCommitInfos: Story = {
  args: {
    insight: mockedNPlusOneInsight,
    commitInfos: {
      commitInfos: {}
    }
  }
};
