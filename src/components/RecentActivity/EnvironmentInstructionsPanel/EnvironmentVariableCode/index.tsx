import { HighlightedCode } from "../styles";
import { EnvironmentVariableCodeProps } from "./types";

export const EnvironmentVariableCode = ({
  isMicrometerProject,
  environmentId
}: EnvironmentVariableCodeProps) =>
  isMicrometerProject ? (
    <span>
      MANAGEMENT_OPENTELEMETRY_RESOURCE-ATTRIBUTES_digma_environment_id=
      <HighlightedCode>{environmentId}</HighlightedCode>
    </span>
  ) : (
    <span>
      OTEL_RESOURCE_ATTRIBUTES=digma.environment.id=
      <HighlightedCode>{environmentId}</HighlightedCode>
    </span>
  );
