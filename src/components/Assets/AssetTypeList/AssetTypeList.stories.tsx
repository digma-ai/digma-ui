import { Meta, StoryObj } from "@storybook/react";

import { AssetTypeList } from ".";
import { actions } from "../actions";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof AssetTypeList> = {
  title: "Assets/AssetTypeList",
  component: AssetTypeList,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    setRefresher: () => {
      return undefined;
    },
    searchQuery: ""
  },
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_CATEGORIES_DATA,
        payload: {
          assetCategories: [
            {
              name: "Other",
              count: 11
            },
            {
              name: "Endpoint",
              count: 20
            },
            {
              name: "EndpointClient",
              count: 20
            },
            {
              name: "DatabaseQueries",
              count: 7
            },
            {
              name: "CodeLocation",
              count: 13
            },
            {
              name: "Consumer",
              count: 0
            }
          ]
        }
      });
    }, 0);
  }
};

export const Empty: Story = {
  args: {
    searchQuery: "",
    setRefresher: () => {
      return undefined;
    }
  },
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_CATEGORIES_DATA,
        payload: {
          assetCategories: []
        }
      });
    }, 0);
  }
};

export const EmptyWithParents: Story = {
  args: {
    searchQuery: "",
    setRefresher: () => {
      return undefined;
    }
  },
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_CATEGORIES_DATA,
        payload: {
          assetCategories: [],
          parents: [
            {
              name: "http test",
              displayName: "http get one",
              instrumentationLibrary: "common",
              spanCodeObjectId: "some span"
            },
            {
              name: "http test 2",
              displayName: "http get two",
              instrumentationLibrary: "common",
              spanCodeObjectId: "some span 2"
            }
          ]
        }
      });
    }, 0);
  }
};
