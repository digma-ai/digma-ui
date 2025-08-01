import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { ScopeBar } from ".";
import type { Scope } from "../../common/App/types";
import type { CodeContext } from "../types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ScopeBar> = {
  title: "Navigation/ScopeBar",
  component: ScopeBar,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof ScopeBar>;

const mockedScope: Scope = {
  span: {
    spanCodeObjectId:
      "span:io.opentelemetry.opentelemetry-instrumentation-annotations-1.16$_$OwnerValidation.AuthServiceValidateUser",
    displayName: "OwnerValidation.AuthServiceValidateUser",
    serviceName: null,
    role: "Internal",
    methodId:
      "method:org.springframework.samples.petclinic.domain.OwnerValidation$_$AuthServiceValidateUser"
  },
  code: {
    codeDetailsList: [
      {
        displayName: "OwnerValidation.AuthServiceValidateUser",
        codeObjectId:
          "span:io.opentelemetry.opentelemetry-instrumentation-annotations-1.16$_$OwnerValidation.AuthServiceValidateUser"
      }
    ],
    relatedCodeDetailsList: []
  },
  hasErrors: false,
  issuesInsightsCount: 0,
  analyticsInsightsCount: 0,
  unreadInsightsCount: 0
};

const mockedCodeContext: CodeContext = {
  isInstrumented: true,
  hasMissingDependency: null,
  canInstrumentMethod: null,
  displayName: "OwnerValidation.AuthServiceValidateUser",
  spans: {
    assets: [
      {
        spanCodeObjectId:
          "span:io.opentelemetry.opentelemetry-instrumentation-annotations-1.16$_$OwnerValidation.AuthServiceValidateUser",
        displayName: "OwnerValidation.AuthServiceValidateUser"
      }
    ],
    errorData: null
  },
  methodId:
    "org.springframework.samples.petclinic.domain.OwnerValidation$_$AuthServiceValidateUser"
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
  args: {
    scope: mockedScope,
    codeContext: mockedCodeContext,
    linkedEndpoints: [
      {
        spanCodeObjectId:
          "span:codeObjectasdasdasdsadasdassadasdasdasdsadasdasdasdasdasdasdasdsadsadasdasd",
        displayName: "testMethodCall",
        environment: "TEST"
      },
      {
        spanCodeObjectId: "span:codeObject2",
        displayName: "restMethodCall",
        environment: "local"
      }
    ]
  }
};

export const HasMultipleCodeLocations: Story = {
  args: {
    scope: {
      ...mockedScope,
      code: {
        ...mockedScope.code,
        codeDetailsList: [
          ...mockedScope.code.codeDetailsList,
          {
            displayName: `${mockedScope.code.codeDetailsList[0].displayName}1`,
            codeObjectId: `${mockedScope.code.codeDetailsList[0].codeObjectId}1`
          }
        ],
        relatedCodeDetailsList: [
          ...mockedScope.code.codeDetailsList,
          {
            displayName: `${mockedScope.code.codeDetailsList[0].displayName}1`,
            codeObjectId: `${mockedScope.code.codeDetailsList[0].codeObjectId}1`
          }
        ]
      }
    },
    codeContext: mockedCodeContext,
    linkedEndpoints: [
      {
        spanCodeObjectId: "span:codeObject",
        displayName: "testMethodCallasdasdasdasdadasdsadasdsadsadasdasdsads",
        environment: "TEST"
      },
      {
        spanCodeObjectId: "span:codeObject2",
        displayName: "restMethodCall",
        environment: "local"
      }
    ]
  }
};

export const AlreadyAtCode: Story = {
  args: {
    scope: mockedScope,
    codeContext: {
      ...mockedCodeContext,
      methodId: mockedScope.span?.methodId ?? null
    },
    linkedEndpoints: []
  }
};
