import type { Meta, StoryObj } from "@storybook/react";
import { InsightCard } from ".";
import { Button } from "../../../../common/Button";
import { mockedErrorsInsight } from "../insightCards/ErrorsInsight/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof InsightCard> = {
  title: "Insights/deprecated/InsightList/InsightCard",
  component: InsightCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof InsightCard>;

export const Default: Story = {
  args: {
    data: mockedErrorsInsight,
    stats: "Some stats",
    isAsync: true,
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
          return undefined;
        }}
      >
        Button label
      </Button>
    ],
    menuItems: ["menu item 1", "menu item 2", "menu item 3"],
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
