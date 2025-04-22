import type { Meta, StoryObj } from "@storybook/react";
import { GlobalErrorsList } from ".";
import { ViewMode } from "../../../store/errors/errorsSlice";
import { useStore } from "../../../store/useStore";
import { actions } from "../actions";
import { DefaultErrorList, DismissedErrorList } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof GlobalErrorsList> = {
  title: "Errors/GlobalErrorsList",
  component: GlobalErrorsList,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof GlobalErrorsList>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  play: () => {
    const { setEnvironment } = useStore.getState();
    setEnvironment({ id: "test-env-id", name: "test", type: "Public" });
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_GLOBAL_ERRORS_DATA,
        payload: DefaultErrorList
      });
    }, 100);
  }
};

export const Dismissed: Story = {
  play: () => {
    const { setEnvironment, setGlobalErrorsViewMode } = useStore.getState();
    setEnvironment({ id: "test-env-id", name: "test", type: "Public" });
    setGlobalErrorsViewMode(ViewMode.OnlyDismissed);

    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_GLOBAL_ERRORS_DATA,
        payload: DismissedErrorList
      });
    }, 100);
  }
};
