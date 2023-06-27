import { Meta, StoryObj } from "@storybook/react";

import { InsightCard } from ".";
import { Button } from "../../common/Button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof InsightCard> = {
  title: "Insights/InsightCard",
  component: InsightCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: {
      type: "EndpointSpaNPlusOne",
      importance: 3,
      shortDisplayInfo: {
        title: "",
        targetDisplayName: "",
        subtitle: "",
        description: ""
      }
    },
    stats: "Some stats",
    content: (
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quis
        iusto corrupti eum optio quibusdam odit laborum voluptatem excepturi. Et
        eveniet at ducimus facilis temporibus nisi accusamus velit, illum
        quisquam?
      </span>
    ),
    buttons: [
      <Button
        key={"button_label"}
        onClick={() => {
          return;
        }}
      >
        Button label
      </Button>
    ],
    menuItems: ["menu item 1", "menu item 2", "menu item 3"],
    isExpandable: true,
    expandableContent: (
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quis
        iusto corrupti eum optio quibusdam odit laborum voluptatem excepturi. Et
        eveniet at ducimus facilis temporibus nisi accusamus velit, illum
        quisquam?
      </span>
    )
  }
};
