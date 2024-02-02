import { Meta, StoryObj } from "@storybook/react";
import { TestTicket } from ".";
import { mockedTest } from "../TestCard/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof TestTicket> = {
  title: "Tests/TestTicket",
  component: TestTicket,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    spanContexts: [
      {
        displayName: "spanDisplayName",
        spanCodeObjectId: "123",
        methodCodeObjectId: "methodCodeObjectId123"
      }
    ],
    test: mockedTest
  }
};
