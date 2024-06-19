import { Meta, StoryObj } from "@storybook/react";
import { CodeSnippet } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CodeSnippet> = {
  title: "common/CodeSnippet",
  component: CodeSnippet,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: `curl --create-dirs -O -L --output-dir ./otel https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/download/v1.29.0/opentelemetry-javaagent.jar

curl --create-dirs -O -L --output-dir ./otel https://github.com/digma-ai/otel-java-instrumentation/releases/latest/download/digma-otel-agent-extension.jar

export JAVA_TOOL_OPTIONS="-javaagent:/otel/javaagent.jar -Dotel.exporter.otlp.endpoint=http://localhost:5050 -Dotel.javaagent.extensions=/otel/digma-otel-agent-extension.jar"
export OTEL_SERVICE_NAME={--ENTER YOUR SERVICE NAME HERE--}
export OTEL_RESOURCE_ATTRIBUTES=digma.environment=LOCAL

    java app.jar`,
    language: "bash"
  }
};
