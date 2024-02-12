import { Meta, StoryObj } from "@storybook/react";

import { AssetsViewConfiguration } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof AssetsViewConfiguration> = {
  title: "Assets/AssetsViewConfiguration",
  component: AssetsViewConfiguration,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    scope: {
      name: "OwnerValidation.ValidateOwner",
      displayName: "OwnerValidation.ValidateOwner",
      instrumentationLibrary:
        "io.opentelemetry.opentelemetry-instrumentation-annotations-1.16",
      spanCodeObjectId:
        "span:io.opentelemetry.opentelemetry-instrumentation-annotations-1.16$_$OwnerValidation.ValidateOwner",
      methodCodeObjectId:
        "org.springframework.samples.petclinic.domain.OwnerValidation$_$ValidateOwner",
      kind: "Internal",
      codeObjectId:
        "org.springframework.samples.petclinic.domain.OwnerValidation$_$ValidateOwner"
    }
  }
};
