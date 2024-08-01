import { Meta, StoryObj } from "@storybook/react";
import { DiscoveredCard } from ".";

const meta: Meta<typeof DiscoveredCard> = {
  title: "Dashboard/Reports/Cards/DiscoveredCard",
  component: DiscoveredCard,
  parameters: {
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "TestCard",
    options: [
      [
        {
          title: "test",
          counter: 1
        }
      ],
      [
        {
          title: "test 2",
          counter: 2
        }
      ]
    ]
  }
};
