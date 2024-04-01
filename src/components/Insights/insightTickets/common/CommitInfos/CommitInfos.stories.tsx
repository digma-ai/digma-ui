import { Meta, StoryObj } from "@storybook/react";
import { CommitInfos } from ".";
import { mockedSpaNPlusOneInsight } from "../../../InsightsCatalog/InsightsPage/insightCards/SpaNPlusOneInsightCard/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CommitInfos> = {
  title: "Insights/insightTickets/common/CommitInfos",
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
    insight: mockedSpaNPlusOneInsight,
    commitInfos: {
      commitInfos: {
        [mockedSpaNPlusOneInsight.firstCommitId as string]: {
          commit: mockedSpaNPlusOneInsight.firstCommitId as string,
          url: mockedSpaNPlusOneInsight.firstCommitId as string
        },
        [mockedSpaNPlusOneInsight.lastCommitId as string]: {
          commit: mockedSpaNPlusOneInsight.lastCommitId as string,
          url: mockedSpaNPlusOneInsight.firstCommitId as string
        }
      }
    }
  }
};

export const WithoutInsight: Story = {};

export const WithoutCommits: Story = {
  args: {
    insight: {
      ...mockedSpaNPlusOneInsight,
      firstCommitId: null,
      lastCommitId: null
    }
  }
};

export const WithoutCommitsDates: Story = {
  args: {
    insight: {
      ...mockedSpaNPlusOneInsight,
      firstDetected: null,
      lastDetected: null
    }
  }
};

export const WithoutCommitsAndDates: Story = {
  args: {
    insight: {
      ...mockedSpaNPlusOneInsight,
      firstCommitId: null,
      lastCommitId: null,
      firstDetected: null,
      lastDetected: null
    }
  }
};

export const WithoutCommitInfos: Story = {
  args: {
    insight: mockedSpaNPlusOneInsight
  }
};

export const WithEmptyCommitInfos: Story = {
  args: {
    insight: mockedSpaNPlusOneInsight,
    commitInfos: {
      commitInfos: {}
    }
  }
};
