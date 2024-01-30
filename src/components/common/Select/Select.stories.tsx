import { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";
import { Select } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Select> = {
  title: "Common/Select",
  component: Select,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Multiselect: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleChange = (value: string | string[]) => {
      setSelectedItems(Array.isArray(value) ? value : [value]);
    };

    const items = args.items.map((x, i) => ({
      ...x,
      enabled: i !== 0,
      selected: selectedItems.includes(x.value)
    }));

    return (
      <Select
        {...args}
        items={items}
        placeholder={"Items"}
        onChange={handleChange}
        multiselect={true}
      />
    );
  },
  args: {
    counts: {
      filtered: 6,
      total: 10
    },
    items: [
      {
        label:
          "Very long long long long long long long long long long long name",
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
  }
};
