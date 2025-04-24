import type { Meta, StoryObj } from "@storybook/react";
import { DiscoveredAssets } from ".";

const meta: Meta<typeof DiscoveredAssets> = {
  title: "Dashboard/Report/Cards/DiscoveredAssets",
  component: DiscoveredAssets,
  parameters: {
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof DiscoveredAssets>;

export const Default: Story = {
  args: {
    statistics: {
      totalCount: 238,
      data: [
        { name: "Cache", count: 55 },
        { name: "CodeLocation", count: 1 },
        { name: "Consumer", count: 2 },
        { name: "EndpointClient", count: 1 },
        { name: "DatabaseQueries", count: 10 },
        { name: "Endpoint", count: 164 },
        { name: "Other", count: 5 }
      ]
    }
  }
};
