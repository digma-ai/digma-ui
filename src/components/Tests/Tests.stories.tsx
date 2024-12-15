import type { Meta, StoryObj } from "@storybook/react";

import { Tests } from ".";
import { mockedTest } from "./TestCard/mockData";
import { actions } from "./actions";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Tests> = {
  title: "Tests/Tests",
  component: Tests,
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
        action: actions.SET_SPAN_LATEST_DATA,
        payload: {
          data: {
            paging: {
              pageNumber: 1,
              pageSize: 10,
              totalCount: 12
            },
            spanContexts: [
              {
                displayName: "spanDisplayName",
                spanCodeObjectId: "123",
                methodCodeObjectId: "methodCodeObjectId123"
              }
            ],
            entries: [
              { ...mockedTest, name: "Test 1", result: "fail" },
              { ...mockedTest, name: "Test 2" },
              { ...mockedTest, name: "Test 3" },
              { ...mockedTest, name: "Test 4" },
              { ...mockedTest, name: "Test 5" },
              { ...mockedTest, name: "Test 6" },
              { ...mockedTest, name: "Test 7" },
              { ...mockedTest, name: "Test 8" },
              { ...mockedTest, name: "Test 9" },
              { ...mockedTest, name: "Test 10" },
              { ...mockedTest, name: "Test 11" },
              { ...mockedTest, name: "Test 12" }
            ]
          },
          error: null
        }
      });
    }, 500);
  }
};

export const Empty: Story = {
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_SPAN_LATEST_DATA,
        payload: {
          data: {
            paging: {
              pageNumber: 1,
              pageSize: 10,
              totalCount: 0
            },
            spanContexts: [
              {
                displayName: "spanDisplayName",
                spanCodeObjectId: "123",
                methodCodeObjectId: "methodCodeObjectId123"
              }
            ],
            entries: []
          },
          error: null
        }
      });
    }, 500);
  }
};

export const Error: Story = {
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_SPAN_LATEST_DATA,
        payload: {
          data: null,
          error: {
            message: "Error message"
          }
        }
      });
    }, 500);
  }
};

export const Loading: Story = {};
