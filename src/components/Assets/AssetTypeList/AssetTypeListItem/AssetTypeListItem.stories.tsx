import type { Meta, StoryObj } from "@storybook/react";
import { AssetTypeListItem } from ".";
import { DatabaseIcon } from "../../../common/icons/DatabaseIcon";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof AssetTypeListItem> = {
  title: "Assets/AssetTypeListItem",
  component: AssetTypeListItem,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    id: "databaseQueries",
    icon: DatabaseIcon,
    label: "Database queries",
    entryCount: 10
  }
};
