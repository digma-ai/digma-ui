import type { Meta, StoryObj } from "@storybook/react";
import { Card } from ".";
import { NewButton } from "../v3/NewButton";
import type { CardProps } from "./types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Card> = {
  title: "common/Card",
  component: Card,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const props: CardProps = {
  title: "Title",
  header: "Header content",
  content: "Content",
  buttons: [<NewButton key={"button"} label={"Click me"} />]
};

export const Default: Story = {
  args: props
};

export const WithTitle: Story = {
  args: {
    ...props,
    showTitle: true
  }
};
