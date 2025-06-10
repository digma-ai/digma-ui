import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { TestCard } from ".";
import { mockedTest } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof TestCard> = {
  title: "Tests/TestCard",
  component: TestCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof TestCard>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Passed: Story = {
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

export const Failed: Story = {
  args: {
    spanContexts: [
      {
        displayName: "spanDisplayName",
        spanCodeObjectId: "123",
        methodCodeObjectId: "methodCodeObjectId123"
      }
    ],
    test: {
      ...mockedTest,
      result: "fail",
      errorOrFailMessage: "Assertion error message"
    }
  }
};
