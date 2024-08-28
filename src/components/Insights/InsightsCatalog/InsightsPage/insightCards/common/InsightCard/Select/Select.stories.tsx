import { Meta, StoryObj } from "@storybook/react";

import { Select } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Select> = {
  title:
    "Insights/InsightsCatalog/InsightsPage/insightCards/common/InsightCard/Select",
  component: Select,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

const mockedData = {
  options: [
    {
      label: "Very long long long long long long long long long long long name",
      value: "item_1"
    },
    {
      label: "Item 2",
      value: "item_2"
    },
    {
      label: "Item 3",
      value: "item_3"
    },
    {
      label: "Item 4",
      value: "item_4"
    },
    {
      label: "Item 5",
      value: "item_5"
    },
    {
      label: "Item 6",
      value: "item_6"
    }
  ]
};

export const Default: Story = {
  args: {
    options: mockedData.options,
    value: mockedData.options[0].value
  }
};

export const Empty: Story = {
  args: {
    options: [],
    placeholder: "No items"
  }
};

export const ItemWithCustomContent: Story = {
  args: {
    options: [
      ...mockedData.options,
      {
        value: "item_with_custom_content",
        label: "Item with custom content",
        customContent: () => <a href={"#"}>Custom content</a>
      }
    ],
    value: "item_with_custom_content"
  }
};

export const Disabled: Story = {
  args: {
    options: mockedData.options,
    placeholder: "No items",
    isDisabled: true
  }
};
