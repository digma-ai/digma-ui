import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";
import { EnvironmentFilter } from ".";
import type { MenuItem } from "../../common/FilterMenu/types";

const mockedItems: MenuItem[] = [
  {
    label: "Development",
    value: "development",
    selected: false
  },
  {
    label: "Staging",
    value: "staging",
    selected: false
  },
  {
    label: "Production",
    value: "production",
    selected: false
  }
];

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EnvironmentFilter> = {
  title: "Tests/EnvironmentFilter",
  component: EnvironmentFilter,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  },
  render: (args) => {
    const [items, setItems] = useState<MenuItem[]>(args.items);

    const handleMenuItemClick = (value: string) => {
      const newItems = items.map((item) => {
        if (item.value === value) {
          return {
            ...item,
            selected: !item.selected
          };
        }

        return item;
      });

      setItems(newItems);
    };

    return (
      <EnvironmentFilter
        {...args}
        items={items}
        onMenuItemClick={handleMenuItemClick}
      />
    );
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
  args: {
    items: mockedItems
  }
};

export const Empty: Story = {
  args: {
    items: [],
    isLoading: false
  }
};

export const Loading: Story = {
  args: {
    items: [],
    isLoading: true
  }
};
