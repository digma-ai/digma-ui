import { useTheme } from "styled-components";
import { getThemeKind } from "../../common/App/styles";
import { CodeSnippet } from "../../common/CodeSnippet";
import { Link } from "../../common/Link";
import * as s from "./styles";
import { AddEnvironmentPanelProps } from "./types";

export const AddEnvironmentPanel = (props: AddEnvironmentPanelProps) => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);

  const handleAddToRunConfigLinkClick = () => {
    props.onAddEnvironmentToRunConfig();
  };

  return (
    <s.Container>
      <s.Title>Setting up your environment</s.Title>
      <s.ContentContainer>
        <s.Column>
          <span>
            Set up the following environment variables when running your code to
            tag the observability data with this environment
          </span>
          <CodeSnippet
            text={`OTEL_RESOURCE_ATTRIBUTES=digma.environment=${props.environment.name}`}
          />
          <Link onClick={handleAddToRunConfigLinkClick}>
            Add to the active run config
          </Link>
          {props.environment.additionToConfigResult === "success" && (
            <span>Successfully added</span>
          )}
          {props.environment.additionToConfigResult === "failure" && (
            <span>Failed to add the environment</span>
          )}
        </s.Column>
        <s.Column>
          Run your app
          <s.RunOrDebugIllustration
            src={`/images/runOrDebug_${themeKind}.gif`}
          />
        </s.Column>
      </s.ContentContainer>
    </s.Container>
  );
};
