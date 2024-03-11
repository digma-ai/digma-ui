import { Meta, StoryObj } from "@storybook/react";
import { Pagination } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Pagination> = {
  title: "common/v3/Pagination",
  component: Pagination,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    itemsCount: 100,
    page: 0,
    pageSize: 10
  }
};

export const SinglePage: Story = {
  args: {
    itemsCount: 9,
    page: 0,
    pageSize: 10
  }
};

export const Extended: Story = {
  args: {
    itemsCount: 9,
    page: 0,
    pageSize: 10,
    extendedNavigation: true
  }
};

export const WithDescription: Story = {
  args: {
    itemsCount: 100,
    page: 0,
    pageSize: 10,
    withDescription: true
  }
};
