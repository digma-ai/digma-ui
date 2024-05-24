import { Fragment, ReactNode, useContext } from "react";
import { getFeatureFlagValue } from "../../../../featureFlags";
import { isString } from "../../../../typeGuards/isString";
import { FeatureFlag } from "../../../../types";
import { intersperse } from "../../../../utils/intersperse";
import { ConfigContext } from "../../../common/App/ConfigContext";
import { HighlightedCode } from "../styles";
import { DigmaAttribute } from "./types";

const OTELAGENT_ATTRIBUTES_PREFIX = "OTEL_RESOURCE_ATTRIBUTES";
const MICROMETER_ATTRIBUTES_PREFIX =
  "MANAGEMENT_OPENTELEMETRY_RESOURCE-ATTRIBUTES";

const digmaAttributesKeyPrefix = "digma";

const OTELAGENT_DIGMA_ATTRIBUTES_KEY_PART_SEPARATOR = ".";
const MICROMETER_DIGMA_ATTRIBUTES_KEY_PART_SEPARATOR = "_";

const digmaAttributesKeyParts: Record<DigmaAttribute, string[]> = {
  environmentId: ["environment", "id"],
  environmentName: ["environment"],
  environmentType: ["environment", "type"],
  userId: ["user", "id"]
};

const renderJavaToolOptions = (javaToolOptions: string) => (
  <Fragment key={"javaToolOptions"}>
    JAVA_TOOL_OPTIONS=
    <HighlightedCode>{javaToolOptions}</HighlightedCode>
  </Fragment>
);
const renderEnvironmentVariables = (
  isMicrometerProject: boolean,
  digmaAttributes: [DigmaAttribute, string | undefined][],
  javaToolOptions: string | undefined | null
): JSX.Element => {
  const envVariables: ReactNode[] = [];

  if (javaToolOptions) {
    envVariables.push(renderJavaToolOptions(javaToolOptions));
  }

  const validAttributes = digmaAttributes.filter(([, value]) =>
    isString(value)
  );

  if (isMicrometerProject) {
    envVariables.push(
      ...validAttributes.map(([attribute, value]) => (
        <Fragment key={attribute}>
          {[
            MICROMETER_ATTRIBUTES_PREFIX,
            digmaAttributesKeyPrefix,
            ...digmaAttributesKeyParts[attribute]
          ].join(MICROMETER_DIGMA_ATTRIBUTES_KEY_PART_SEPARATOR)}
          =<HighlightedCode>{value}</HighlightedCode>
        </Fragment>
      ))
    );
  } else {
    const environmentVariableValue = validAttributes.map(
      ([attribute, value], i, arr) => (
        <Fragment key={attribute}>
          {[
            digmaAttributesKeyPrefix,
            ...digmaAttributesKeyParts[attribute]
          ].join(OTELAGENT_DIGMA_ATTRIBUTES_KEY_PART_SEPARATOR)}
          =<HighlightedCode>{value}</HighlightedCode>
          {i < arr.length - 1 ? "," : ""}
        </Fragment>
      )
    );

    envVariables.push(
      <Fragment key={OTELAGENT_ATTRIBUTES_PREFIX}>
        {OTELAGENT_ATTRIBUTES_PREFIX}={environmentVariableValue}
      </Fragment>
    );
  }

  return (
    <>
      {intersperse(envVariables, (i) => (
        <br key={`separator-${i}`} />
      ))}
    </>
  );
};

export const EnvironmentVariableCode = () => {
  const config = useContext(ConfigContext);

  if (!config.environment || !config.backendInfo) {
    return null;
  }

  const isCentralizedDeployment = config.backendInfo.centralize;
  const isMicrometerProject = config.isMicrometerProject;
  const userId = config.userInfo?.id;
  const environmentId = config.environment.id;
  const environmentName = config.environment.name;
  const environmentType = config.environment.type || undefined;
  const isRunConfigSupported = Boolean(
    config.runConfig?.isRunConfigurationSupported
  );
  const javaToolOptions = isRunConfigSupported
    ? undefined
    : config.runConfig?.javaToolOptions;

  const areNewInstrumentationAttributesEnabled = getFeatureFlagValue(
    config,
    FeatureFlag.ARE_NEW_INSTRUMENTATION_ATTRIBUTES_ENABLED
  );

  if (areNewInstrumentationAttributesEnabled) {
    if (isCentralizedDeployment) {
      return renderEnvironmentVariables(
        isMicrometerProject,
        [
          ["environmentName", environmentName],
          ["environmentType", environmentType],
          ["userId", userId]
        ],
        javaToolOptions
      );
    } else {
      return renderEnvironmentVariables(
        isMicrometerProject,
        [["environmentName", environmentName]],
        javaToolOptions
      );
    }
  }

  return renderEnvironmentVariables(
    isMicrometerProject,
    [["environmentId", environmentId]],
    javaToolOptions
  );
};
