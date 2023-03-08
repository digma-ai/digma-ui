import { ComponentMeta, ComponentStory } from "@storybook/react";

import { AssetEntry } from ".";
import { AssetEntryProps } from "./types";

export default {
  title: "Assets/AssetEntry",
  component: AssetEntry,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
} as ComponentMeta<typeof AssetEntry>;

const Template: ComponentStory<typeof AssetEntry> = (args: AssetEntryProps) => (
  <AssetEntry {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: "HTTP GET /users/",
  services: ["PetClinicWithAgent", "PetClinicWithAgent", "PetClinicWithAgent"],
  performance: {
    value: 120,
    unit: "ms",
    raw: 120000000.0
  },
  lastSeenDateTime: "2022-03-20T13:24:27.484562Z",
  insights: [
    {
      type: "HotSpot",
      importance: 2,
      shortDisplayInfo: {
        title: "",
        targetDisplayName: "",
        subtitle: "",
        description: ""
      }
    },
    {
      type: "Errors",
      importance: 5,
      shortDisplayInfo: {
        title: "",
        targetDisplayName: "",
        subtitle: "",
        description: ""
      }
    },
    {
      type: "LowUsage",
      importance: 6,
      shortDisplayInfo: {
        title: "",
        targetDisplayName: "",
        subtitle: "",
        description: ""
      }
    }
  ]
};
