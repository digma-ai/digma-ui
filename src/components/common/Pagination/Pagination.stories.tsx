import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useState } from "react";
import { Pagination } from ".";
import type { PaginationProps } from "./types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Pagination> = {
  title: "common/Pagination",
  component: Pagination,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  },
  render: (args) => {
    const [page, setPage] = useState(0);

    const handlePageChange = (page: number) => {
      setPage(page);
    };

    return <Pagination {...args} page={page} onPageChange={handlePageChange} />;
  }
};

export default meta;

type Story = StoryObj<typeof Pagination>;

const props: PaginationProps = {
  itemsCount: 10,
  page: 1,
  pageSize: 3,
  onPageChange: fn()
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: props
};

export const Empty: Story = {
  args: {
    ...props,
    itemsCount: 0
  }
};

export const WithExtendedNavigation: Story = {
  args: {
    ...props,
    extendedNavigation: true
  }
};
