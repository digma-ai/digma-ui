import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { CodeButtonMenu } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CodeButtonMenu> = {
  title: "Navigation/CodeButtonMenu",
  component: CodeButtonMenu,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof CodeButtonMenu>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    codeContext: {
      spans: {
        assets: [
          {
            spanCodeObjectId: "spanCodeObjectId1",
            displayName: "displayName1"
          }
        ],
        errorData: null
      },
      isInstrumented: true,
      methodId: "method id",
      displayName: "code location display name",
      hasMissingDependency: false,
      canInstrumentMethod: false
    },
    isAutoFixing: false,
    isAnnotationAdding: false
  }
};

export const NotInstrumented: Story = {
  args: {
    codeContext: {
      spans: {
        assets: [
          {
            spanCodeObjectId: "spanCodeObjectId1",
            displayName: "displayName1"
          }
        ],
        errorData: null
      },
      isInstrumented: false,
      methodId: "method id",
      displayName: "code location display name",
      hasMissingDependency: false,
      canInstrumentMethod: true
    },
    isAutoFixing: false,
    isAnnotationAdding: false
  }
};

export const NotDataYet: Story = {
  args: {
    codeContext: {
      spans: {
        assets: [],
        errorData: null
      },
      isInstrumented: true,
      methodId: "method id",
      displayName: "code location display name",
      hasMissingDependency: false,
      canInstrumentMethod: true
    },
    isAutoFixing: false,
    isAnnotationAdding: false
  }
};

export const AddingTheAnnotation: Story = {
  args: {
    codeContext: {
      spans: {
        assets: [
          {
            spanCodeObjectId: "spanCodeObjectId1",
            displayName: "displayName1"
          }
        ],
        errorData: null
      },
      isInstrumented: false,
      methodId: "method id",
      displayName: "code location display name",
      hasMissingDependency: false,
      canInstrumentMethod: true
    },
    isAutoFixing: false,
    isAnnotationAdding: true
  }
};

export const HasMissingDependency: Story = {
  args: {
    codeContext: {
      spans: {
        assets: [
          {
            spanCodeObjectId: "spanCodeObjectId1",
            displayName: "displayName1"
          }
        ],
        errorData: null
      },
      isInstrumented: false,
      methodId: "method id",
      displayName: "code location display name",
      hasMissingDependency: true,
      canInstrumentMethod: false
    },
    isAutoFixing: false,
    isAnnotationAdding: false
  }
};

export const AutoFixingMissingDependency: Story = {
  args: {
    codeContext: {
      spans: {
        assets: [
          {
            spanCodeObjectId: "spanCodeObjectId1",
            displayName: "displayName1"
          }
        ],
        errorData: null
      },
      isInstrumented: false,
      methodId: "method id",
      displayName: "code location display name",
      hasMissingDependency: true,
      canInstrumentMethod: false
    },
    isAutoFixing: true,
    isAnnotationAdding: false
  }
};
