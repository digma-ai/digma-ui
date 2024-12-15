import { CodeSnippet } from "../../../common/CodeSnippet";
import { GetEnvironmentIdInstruction } from "./GetEnvironmentIdInstruction.tsx";
import type { PageContent } from "./Page/types";

export const runDigmaWithDocker: PageContent = {
  title: "How to use Digma if your application is running via Docker Compose",
  description: (
    <span>
      These are simple steps to help you collect observability data from your
      application running via Docker compose without changing the original{" "}
      <code>docker-compose.yml</code> file.
    </span>
  ),
  sections: [
    {
      title: "Download the agent and extension",
      number: 1,
      description: (
        <span>
          Download them to a relative path to the Docker Compose file you are
          running
        </span>
      ),
      content: (
        <CodeSnippet
          text={`curl --create-dirs -O -L --output-dir ./otel https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/download/v2.1.0/opentelemetry-javaagent.jar

curl --create-dirs -O -L --output-dir ./otel https://github.com/digma-ai/otel-java-instrumentation/releases/latest/download/digma-otel-agent-extension.jar`}
          language={"bash"}
        />
      )
    },
    {
      title: "Add a docker-compose override file",
      number: 2,
      description: (
        <>
          <span>
            Create a file <code>docker-composer.override.otel.yml</code> which
            we&apos;ll use to extend the original compose file. We&apos;ll add
            volumes and the env. variables for configuring the agent.
          </span>
          <span>
            Add the following code, and replace <code>[your-service]</code> with
            the service you wish to instrument:
          </span>
        </>
      ),
      content: (
        <CodeSnippet
          text={`#docker-compose.override.otel.yml
  version: '3'
  
  services:
  #[your-service]:
    volumes:
      - "./otel/opentelemetry-javaagent.jar:/otel/opentelemetry-javaagent.jar"
      - "./otel/digma-otel-agent-extension.jar:/otel/digma-otel-agent-extension.jar"
    environment:
      - JAVA_TOOL_OPTIONS=-javaagent:/otel/opentelemetry-javaagent.jar -Dotel.exporter.otlp.endpoint=http://host.docker.internal:5050 -Dotel.javaagent.extensions=/otel/digma-otel-agent-extension.jar -Dotel.metrics.exporter=none -Dotel.logs.exporter=none -Dotel.exporter.otlp.protocol=grpc
      - OTEL_SERVICE_NAME=#[your-service]
      - OTEL_RESOURCE_ATTRIBUTES=digma.environment.id=[ENVIRONMENT_ID]
      - OTEL_METRICS_EXPORTER=none
    extra_hosts:
        - "host.docker.internal:host-gateway"`}
          language={"yaml"}
        />
      )
    },
    {
      title:
        "Run the original docker-compose file along with the extended file we just created",
      number: 3,
      description: <span>For example:</span>,
      content: (
        <CodeSnippet
          text={
            "docker compose -f docker-compose.yml -f docker-compose.override.otel.yml up -d"
          }
          language={"bash"}
        />
      )
    },
    {
      content: <GetEnvironmentIdInstruction />
    }
  ]
};
