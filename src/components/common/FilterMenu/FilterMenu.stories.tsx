import { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";
import { FilterMenu } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof FilterMenu> = {
  title: "Common/FilterMenu",
  component: FilterMenu,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleItemClick = (value: string) => {
      const itemIndex = selectedItems.findIndex((x) => x === value);

      if (itemIndex < 0) {
        setSelectedItems([...selectedItems, value]);
      } else {
        setSelectedItems([
          ...selectedItems.slice(0, itemIndex),
          ...selectedItems.slice(itemIndex + 1)
        ]);
      }
    };

    const items = args.items.map((x) => ({
      ...x,
      selected: selectedItems.includes(x.value)
    }));

    return <FilterMenu {...args} items={items} onItemClick={handleItemClick} />;
  },
  args: {
    title: "Filter by services",
    items: [
      {
        label: "very_long_long_long_long_name",
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
      },
      {
        label: "Item 7",
        value: "item_7"
      },
      {
        label: "Item 8",
        value: "item_8"
      },
      {
        label: "Item 9",
        value: "item_9"
      }
    ]
  }
};

export const NoItems: Story = {
  args: {
    title: "Filter by services",
    items: []
  }
};
