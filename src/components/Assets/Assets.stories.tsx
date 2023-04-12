import { Meta, StoryObj } from "@storybook/react";

import { Assets } from ".";
import { data } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Assets> = {
  title: "Assets/Assets",
  component: Assets,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithData: Story = { args: { data } };
