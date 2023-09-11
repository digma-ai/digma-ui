import { useTheme } from "styled-components";
import { getThemeKind } from "../../common/App/styles";
import { CodeSnippet } from "../../common/CodeSnippet";
import { DesktopIcon } from "../../common/icons/DesktopIcon";
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
      <s.Header>
        <DesktopIcon size={16} color={"currentColor"} />
        How to setup your local environment
      </s.Header>
      <s.ContentContainer>
        <s.Section>
          <s.SectionHeader>
            <s.SectionNumber>1</s.SectionNumber>
            <s.SectionTitle>Integrate Code</s.SectionTitle>
          </s.SectionHeader>
          <s.SectionContentContainer>
            <span>
              Set up the following environment variables when running your code
              to tag the observability data with this environment
            </span>
            <CodeSnippet
              text={`OTEL_RESOURCE_ATTRIBUTES=digma.environment=${props.environment.name}`}
            />
            <s.AddToConfigContainer>
              <s.Link onClick={handleAddToRunConfigLinkClick}>
                Add to the active run config
              </s.Link>
              {props.environment.additionToConfigResult === "success" && (
                <s.AddToConfigSuccessMessage>
                  Successfully added
                </s.AddToConfigSuccessMessage>
              )}
              {props.environment.additionToConfigResult === "failure" && (
                <s.AddToConfigFailureMessage>
                  Failed to add
                </s.AddToConfigFailureMessage>
              )}
            </s.AddToConfigContainer>
          </s.SectionContentContainer>
        </s.Section>
        <s.Section>
          <s.SectionHeader>
            <s.SectionNumber>2</s.SectionNumber>
            <s.SectionTitle>Run your Application</s.SectionTitle>
          </s.SectionHeader>
          <s.SectionContentContainer>
            <span>
              Running your app will integrate your environment and Digma can
              start showing you info!
            </span>
            <s.RunOrDebugIllustration
              src={`/images/runOrDebug_${themeKind}.gif`}
            />
          </s.SectionContentContainer>
        </s.Section>
      </s.ContentContainer>
    </s.Container>
  );
};
