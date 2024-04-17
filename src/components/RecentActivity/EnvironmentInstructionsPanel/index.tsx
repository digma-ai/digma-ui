import copy from "copy-to-clipboard";
import { useContext, useState } from "react";
import { useTheme } from "styled-components";
import { actions as globalActions } from "../../../actions";
import { CENTRAL_ON_PREM_INSTALLATION_GUIDE_URL } from "../../../constants";
import { openURLInDefaultBrowser } from "../../../utils/actions/openURLInDefaultBrowser";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { getHostnameFromURL } from "../../../utils/getHostNameFromURL";
import { ConfigContext } from "../../common/App/ConfigContext";
import { getThemeKind } from "../../common/App/styles";
import { EnvironmentType } from "../../common/App/types";
import { Link } from "../../common/Link";
import { CopyIcon } from "../../common/icons/12px/CopyIcon";
import { DesktopIcon } from "../../common/icons/DesktopIcon";
import { InfinityIcon } from "../../common/icons/InfinityIcon";
import { PlayButtonWithCursorIcon } from "../../common/icons/PlayButtonWithCursorIcon";
import { Tooltip } from "../../common/v3/Tooltip";
import { SetupOrgDigmaPanel } from "../SetupOrgDigmaPanel";
import { Overlay } from "../common/Overlay";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import {
  AddToRunConfigState,
  EnvironmentInstructionsPanelContent,
  EnvironmentInstructionsPanelProps
} from "./types";
import { useAddToRunConfig } from "./useAddToRunConfig";

const getEnvironmentVariableString = (
  isMicrometerProject: boolean,
  environmentId: string
) =>
  isMicrometerProject
    ? `MANAGEMENT_OPENTELEMETRY_RESOURCE-ATTRIBUTES_digma_environment=${environmentId}`
    : `OTEL_RESOURCE_ATTRIBUTES=digma.environment.id=${environmentId}`;

export const EnvironmentInstructionsPanel = (
  props: EnvironmentInstructionsPanelProps
) => {
  const [isOrgDigmaSetupGuideVisible, setIsOrgDigmaSetupGuideVisible] =
    useState(false);
  const theme = useTheme();
  const themeKind = getThemeKind(theme);
  const config = useContext(ConfigContext);
  const hostname =
    getHostnameFromURL(config.digmaApiUrl) || "[DIGMA_BACKEND_URL]";
  const environmentVariableString = getEnvironmentVariableString(
    config.isMicrometerProject,
    props.environment.id
  );

  const { addToRunConfig, state } = useAddToRunConfig(props.environment.id);

  const handleOrgDigmaSetupGuideLinkClick = () => {
    // setIsOrgDigmaSetupGuideVisible(true);
    openURLInDefaultBrowser(CENTRAL_ON_PREM_INSTALLATION_GUIDE_URL);
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

  const close = () => {
    if (props.onClose) {
      props.onClose();
    }
  };

  const handleCloseButtonClick = () => {
    close();
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

  const renderHeaderContent = (title: string) => {
    const environmentId = props.environment.id;

    const handleCopyButtonClick = () => {
      copy(environmentId);
    };

    return (
      <>
        <s.HeaderContentContainer>
          {title}
          <s.Divider />
          <s.EnvironmentIdLabel>Environment ID</s.EnvironmentIdLabel>
          <s.EnvironmentIdContainer>
            <Tooltip title={environmentId}>
              <s.EnvironmentId>{environmentId}</s.EnvironmentId>
            </Tooltip>
            <Tooltip title={"Copy"}>
              <s.CopyButton onClick={handleCopyButtonClick}>
                <CopyIcon />
              </s.CopyButton>
            </Tooltip>
          </s.EnvironmentIdContainer>
        </s.HeaderContentContainer>
        <s.CloseButton
          onClick={handleCloseButtonClick}
          buttonType={"secondary"}
          label={"Close"}
        />
      </>
    );
  };
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
            <s.CodeSection text={environmentVariableString} />
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
            <s.RunOrDebugIllustration
              src={`/images/runOrDebug_${themeKind}.gif`}
            />
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
              Add the following to your build/prod deployment scripts,
              don&apos;t forget to set the <code>SERVICE_NAME</code> variable
            </span>
            <s.CodeSection
              text={`curl --create-dirs -O -L --output-dir ./otel https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/download/v2.1.0/opentelemetry-javaagent.jar

curl --create-dirs -O -L --output-dir ./otel https://github.com/digma-ai/otel-java-instrumentation/releases/latest/download/digma-otel-agent-extension.jar

export JAVA_TOOL_OPTIONS="-javaagent:/otel/opentelemetry-javaagent.jar -Dotel.exporter.otlp.endpoint=http://${hostname}:5050 -Dotel.javaagent.extensions=/otel/digma-otel-agent-extension.jar -Dotel.metrics.exporter=none -Dotel.logs.exporter=none -Dotel.exporter.otlp.protocol=grpc"

export OTEL_SERVICE_NAME={--ENTER YOUR SERVICE NAME HERE--}
export OTEL_RESOURCE_ATTRIBUTES=digma.environment.id="${props.environment.id}"`}
              language={"bash"}
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
              <PlayButtonWithCursorIcon size={100} themeKind={themeKind} />
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
      <s.Header>{renderHeaderContent(content.title)}</s.Header>
      {props.environment.type === "Public" && (
        <span>
          CI/Prod environments require Digma to be installed in your
          organization. Follow{" "}
          <Link onClick={handleOrgDigmaSetupGuideLinkClick}>these steps</Link>{" "}
          to set that up.
        </span>
      )}
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
