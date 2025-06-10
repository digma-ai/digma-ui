import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { CommitInfos } from ".";
import { mockedSpaNPlusOneInsight } from "../../../../InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/SpaNPlusOneInsightCard/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CommitInfos> = {
  title: "Insights/InsightTicketRenderer/insightTickets/common/CommitInfos",
  component: CommitInfos,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof CommitInfos>;

export const Default: Story = {
  args: {
    insight: mockedSpaNPlusOneInsight,
    commitInfos: {
      commitInfos: {
        [mockedSpaNPlusOneInsight.firstCommitId!]: {
          commit: mockedSpaNPlusOneInsight.firstCommitId!,
          url: mockedSpaNPlusOneInsight.firstCommitId!
        },
        [mockedSpaNPlusOneInsight.lastCommitId!]: {
          commit: mockedSpaNPlusOneInsight.lastCommitId!,
          url: mockedSpaNPlusOneInsight.firstCommitId!
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
