import { useContext, useState } from "react";
import { useTheme } from "styled-components";
import { actions as globalActions } from "../../../actions";
import { INSTRUMENTATION_DOCUMENTATION_URL } from "../../../constants";
import { openURLInDefaultBrowser } from "../../../utils/actions/openURLInDefaultBrowser";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { ConfigContext } from "../../common/App/ConfigContext";
import { getThemeKind } from "../../common/App/styles";
import { EnvironmentType } from "../../common/App/types";
import { CodeSnippet } from "../../common/CodeSnippet";
import { Link } from "../../common/Link";
import { DesktopIcon } from "../../common/icons/DesktopIcon";
import { InfinityIcon } from "../../common/icons/InfinityIcon";
import { PlayButtonWithCursorIcon } from "../../common/icons/PlayButtonWithCursorIcon";
import { SetupOrgDigmaPanel } from "../SetupOrgDigmaPanel";
import { Overlay } from "../common/Overlay";
import { trackingEvents } from "../tracking";
import { EnvironmentVariableCode } from "./EnvironmentVariableCode";
import * as s from "./styles";
import {
  AddToRunConfigState,
  EnvironmentInstructionsPanelContent,
  EnvironmentInstructionsPanelProps
} from "./types";
import { useAddToRunConfig } from "./useAddToRunConfig";

export const EnvironmentInstructionsPanel = (
  props: EnvironmentInstructionsPanelProps
) => {
  const [isOrgDigmaSetupGuideVisible, setIsOrgDigmaSetupGuideVisible] =
    useState(false);
  const theme = useTheme();
  const themeKind = getThemeKind(theme);
  const config = useContext(ConfigContext);

  const { addToRunConfig, state } = useAddToRunConfig(props.environment.id);

  const handleDocumentationLinkClick = () => {
    openURLInDefaultBrowser(INSTRUMENTATION_DOCUMENTATION_URL);
  };

  const handleAddToRunConfigLinkClick = () => {
    sendUserActionTrackingEvent(trackingEvents.ADD_TO_RUN_CONFIG_CLICKED);
    addToRunConfig();
  };

  const handleTroubleshootLinkClick = () => {
    globalActions.OPEN_TROUBLESHOOTING_GUIDE;
    window.sendMessageToDigma({
      action: globalActions.OPEN_TROUBLESHOOTING_GUIDE
    });
  };

  const handleOrgDigmaSetupClose = () => {
    setIsOrgDigmaSetupGuideVisible(false);
  };

  const handleCloseButtonClick = () => {
    if (props.onClose) {
      props.onClose();
    }
  };

  if (isOrgDigmaSetupGuideVisible) {
    return (
      <Overlay>
        <SetupOrgDigmaPanel
          environment={props.environment}
          onFinish={handleOrgDigmaSetupClose}
          onCancel={handleOrgDigmaSetupClose}
        />
      </Overlay>
    );
  }

  const environmentTypesContent: Record<
    EnvironmentType,
    EnvironmentInstructionsPanelContent
  > = {
    Private: {
      icon: DesktopIcon,
      title: "How to setup your Digma Environment",
      instrumentation: {
        title: "Instrument your code",
        content: (
          <>
            <span>
              Set up the following environment variables when running your code
              to tag the observability data with this run config:
            </span>
            <s.EnvironmentVariableCodeSnippet
              text={
                <EnvironmentVariableCode
                  isMicrometerProject={config.isMicrometerProject}
                  environmentId={props.environment.id}
                />
              }
            />
            <s.ActionContainer>
              <s.AddToConfigContainer>
                <s.Link onClick={handleAddToRunConfigLinkClick}>
                  Add to the active run config
                </s.Link>
                {state === AddToRunConfigState.success && (
                  <s.AddToConfigSuccessMessage>
                    Successfully added
                  </s.AddToConfigSuccessMessage>
                )}
                {state === AddToRunConfigState.failure && (
                  <s.AddToConfigFailureMessage>
                    Failed to add
                  </s.AddToConfigFailureMessage>
                )}
              </s.AddToConfigContainer>
              <s.Link onClick={handleTroubleshootLinkClick}>
                Troubleshoot
              </s.Link>
            </s.ActionContainer>
          </>
        )
      },
      run: {
        title: "Run your Application",
        content: (
          <>
            <span>
              Running your app will integrate your environment and Digma can
              start showing you info!
            </span>
            <s.IllustrationContainer>
              <s.RunOrDebugIllustration
                src={`/images/runOrDebug_${themeKind}.gif`}
              />
            </s.IllustrationContainer>
          </>
        )
      }
    },
    Public: {
      icon: InfinityIcon,
      title: "Connecting your CI/Prod Environment",
      instrumentation: {
        title: "Instrument your application",
        content: (
          <>
            <span>
              Please see our{" "}
              <Link onClick={handleDocumentationLinkClick}>
                Digma Developer Guide
              </Link>{" "}
              for the best way to instrument your application and send data to
              Digma. Use the following environment ID:
            </span>
            <CodeSnippet
              text={
                <s.HighlightedCode>{props.environment.id}</s.HighlightedCode>
              }
            />
          </>
        )
      },
      run: {
        title: "Deploy your application / run the build",
        content: (
          <>
            <span>
              Running your app will integrate your environment and Digma can
              start showing you info!
            </span>
            <s.IllustrationContainer>
              <PlayButtonWithCursorIcon size={80} themeKind={themeKind} />
            </s.IllustrationContainer>
          </>
        )
      }
    }
  };

  const content = props.environment.type
    ? environmentTypesContent[props.environment.type]
    : null;

  if (!content) {
    return null;
  }

  return (
    <s.Container>
      <s.Header>
        {content.title}
        {props.onClose && (
          <s.CloseButton
            onClick={handleCloseButtonClick}
            buttonType={"secondary"}
            label={"Close"}
          />
        )}
      </s.Header>
      <s.ContentContainer>
        <s.Section>
          <s.SectionHeader>
            <s.SectionNumber>1</s.SectionNumber>
            <s.SectionTitle>{content.instrumentation.title}</s.SectionTitle>
          </s.SectionHeader>
          <s.SectionContentContainer>
            {content.instrumentation.content}
          </s.SectionContentContainer>
        </s.Section>
        <s.Section>
          <s.SectionHeader>
            <s.SectionNumber>2</s.SectionNumber>
            <s.SectionTitle>{content.run.title}</s.SectionTitle>
          </s.SectionHeader>
          <s.SectionContentContainer>
            {content.run.content}
          </s.SectionContentContainer>
        </s.Section>
      </s.ContentContainer>
    </s.Container>
  );
};
