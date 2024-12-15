import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";
import { Toggle } from ".";
import { PERCENTILES } from "../../../constants";
import type { ToggleValue } from "./types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Toggle> = {
  title: "common/Toggle",
  component: Toggle,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(PERCENTILES[0].percentile);
    const handleValueChange = (value: ToggleValue) => {
      setValue(value as number);
    };

    return <Toggle {...args} value={value} onValueChange={handleValueChange} />;
  },
  args: {
    options: PERCENTILES.map((percentile) => ({
      value: percentile.percentile,
      label: percentile.label
    }))
  }
};
