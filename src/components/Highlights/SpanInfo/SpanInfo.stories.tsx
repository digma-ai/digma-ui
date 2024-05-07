import { Meta, StoryObj } from "@storybook/react";

import { SpanInfo } from ".";
import { actions as mainActions } from "../../Main/actions";
import { mockedSpanInfoData } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction

const meta: Meta<typeof SpanInfo> = {
  title: "Highlights/SpanInfo",
  component: SpanInfo,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: mainActions.SET_HIGHLIGHTS_SPAN_INFO_DATA,
        payload: mockedSpanInfoData
      });
    }, 1000);
  }
};
