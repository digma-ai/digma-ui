import { CodeSnippet } from "../../../common/CodeSnippet";
import { PageContent } from "./Page/types";

export const runDigmaWithCommandLine: PageContent = {
  title:
    "How to use Digma if you're running your application from the command line",
  sections: [
    { title: "Changing your configuration files:" },
    {
      title: "Spring Boot + Maven",
      content: (
        <>
          <span>
            Add the following XML to your <code>Pom.xml</code> under the{" "}
            <code>&lt;Profiles&gt;</code> element (add this element if it
            doesn&apos;t exist)
          </span>
          <CodeSnippet
            text={`<profile>
  <id>digma</id>
  <build>
    <plugins>
      <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
        <configuration>
          <jvmArguments>-javaagent:\${env.TMPDIR}/temp-digma-otel-jars/opentelemetry-javaagent.jar</jvmArguments>
          <systemPropertyVariables>
            <otel.exporter.otlp.traces.endpoint>http://localhost:5050</otel.exporter.otlp.traces.endpoint>
            <otel.traces.exporter>otlp</otel.traces.exporter>
            <otel.metrics.exporter>none</otel.metrics.exporter>
            <otel.logs.exporter>none</otel.logs.exporter>
            <otel.service.name>\${pom.artifactId}</otel.service.name>
            <otel.exporter.otlp.protocol>grpc</otel.exporter.otlp.protocol>
            <otel.javaagent.extensions>\${env.TMPDIR}/temp-digma-otel-jars/digma-otel-agent-extension.jar</otel.javaagent.extensions>
          </systemPropertyVariables>
        </configuration>
      </plugin>
    </plugins>
  </build>
</profile>`}
            language={"xml"}
          ></CodeSnippet>
          <span>
            To collect data with Digma when you run your application from
            command line you should now run:
          </span>
          <CodeSnippet
            text={"mvn spring-boot:run -P digma"}
            language={"bash"}
          />
        </>
      )
    },
    {
      title: "Spring Boot + Gradle",
      content: (
        <>
          <span>
            Add the following to your <code>build.gradle</code> file
          </span>
          <CodeSnippet
            text={`tasks.named("bootRun") {
  if (project.hasProperty('digma')) {
    def tempDir = System.getProperty("java.io.tmpdir")
    environment["JAVA_TOOL_OPTIONS"] = "-javaagent:\${tempDir}/temp-digma-otel-jars/opentelemetry-javaagent.jar"
    systemProperty 'otel.exporter.otlp.traces.endpoint', 'http://localhost:5050'
    systemProperty 'otel.traces.exporter', 'otlp'
    systemProperty 'otel.metrics.exporter', 'none'
    systemProperty 'otel.logs.exporter', 'none'
    systemProperty 'otel.exporter.otlp.protocol', 'grpc'
    systemProperty 'otel.service.name', "\${project.name}"
    systemProperty 'otel.javaagent.extensions', "\${tempDir}/temp-digma-otel-jars/digma-otel-agent-extension.jar"
  }
}`}
            language={"groovy"}
          />
          <span>
            if you&apos;re using <code>build.gradle.kts</code> you can use the
            following:
          </span>
          <CodeSnippet
            text={`tasks.named<BootRun>("bootRun") {
  if (project.hasProperty("digma")) {
    val tempDir = System.getProperty("java.io.tmpdir")
    environment["JAVA_TOOL_OPTIONS"] = "-javaagent:\${tempDir}/temp-digma-otel-jars/opentelemetry-javaagent.jar"
    systemProperty("otel.exporter.otlp.traces.endpoint", "http://localhost:5050")
    systemProperty("otel.traces.exporter", "otlp")
    systemProperty("otel.metrics.exporter", "none")
    systemProperty("otel.logs.exporter", "none")
    systemProperty("otel.exporter.otlp.protocol", "grpc")
    systemProperty("otel.service.name", project.name)
    systemProperty("otel.javaagent.extensions", "\${tempDir}/temp-digma-otel-jars/digma-otel-agent-extension.jar")
  }
}`}
            language={"kotlin"}
          />
        </>
      )
    },
    {
      title:
        "Alternatively, you can simply download the agent and send these as arguments to your Java process",
      content: (
        <>
          <span>
            Make sure to substitute <code>OTEL_SERVICE_NAME</code> with your
            application name:
          </span>
          <CodeSnippet
            text={`curl --create-dirs -O -L --output-dir ./otel https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/download/v2.1.0/opentelemetry-javaagent.jar

curl --create-dirs -O -L --output-dir ./otel https://github.com/digma-ai/otel-java-instrumentation/releases/latest/download/digma-otel-agent-extension.jar

export JAVA_TOOL_OPTIONS="-javaagent:/otel/opentelemetry-javaagent.jar -Dotel.exporter.otlp.endpoint=http://localhost:5050 -Dotel.javaagent.extensions=/otel/digma-otel-agent-extension.jar -Dotel.metrics.exporter=none -Dotel.logs.exporter=none -Dotel.exporter.otlp.protocol=grpc"
export OTEL_SERVICE_NAME={--ENTER YOUR SERVICE NAME HERE--}
export OTEL_RESOURCE_ATTRIBUTES=digma.environment=LOCAL

java app.jar`}
            language={"bash"}
          />
        </>
      )
    }
  ]
};
