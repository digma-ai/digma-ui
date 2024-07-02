import { Meta, StoryObj } from "@storybook/react";
import { FilterButton } from ".";
import { FilterButtonProps } from "./types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof FilterButton> = {
  title: "common/FilterButton",
  component: FilterButton,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

const props: FilterButtonProps = {
  selectedCount: 1,
  title: "Filters"
};

export const Default: Story = {
  args: props
};

export const Loading: Story = {
  args: {
    ...props,
    isLoading: true
  }
};

export const WithCount: Story = {
  args: {
    ...props,
    showCount: true
  }
};

export const LoadingWithCount: Story = {
  args: {
    ...props,
    isLoading: true,
    showCount: true
  }
};
