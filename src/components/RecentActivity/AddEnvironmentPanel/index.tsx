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
          <span>Set up the following environment in your code</span>
          <CodeSnippet
            text={`OTEL_RESOURCE_ATTRIBUTES=digma.environment=${props.environmentName}`}
          />
          <Link onClick={handleAddToRunConfigLinkClick}>
            Add to the active run config
          </Link>
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
