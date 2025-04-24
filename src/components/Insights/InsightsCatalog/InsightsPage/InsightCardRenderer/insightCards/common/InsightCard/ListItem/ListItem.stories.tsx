import type { Meta, StoryObj } from "@storybook/react";
import { ListItem } from ".";
import { Button } from "../../../../../../../../common/Button";
import { JiraLogoIcon } from "../../../../../../../../common/icons/12px/JiraLogoIcon";
import { TargetIcon } from "../../../../../../../../common/icons/12px/TargetIcon";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ListItem> = {
  title:
    "Insights/InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/common/InsightCard/ListItem",
  component: ListItem,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof ListItem>;

export const Default: Story = {
  args: {
    name: "Very very very very very very very very long text"
  }
};

export const WithButtons: Story = {
  args: {
    name: "Very very very very very very very very long text",
    endContent: (
      <>
        <Button key={"jira"} icon={{ component: TargetIcon }} />
        <Button key={"target"} icon={{ component: JiraLogoIcon }} />
      </>
    )
  }
};
