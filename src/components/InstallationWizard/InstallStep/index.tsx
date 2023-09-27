import { useContext, useEffect, useState } from "react";
import { DefaultTheme, useTheme } from "styled-components";
import { usePrevious } from "../../../hooks/usePrevious";
import { openURLInDefaultBrowser } from "../../../utils/openURLInDefaultBrowser";
import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
import { ConfigContext } from "../../common/App/ConfigContext";
import { ConfigContextData } from "../../common/App/types";
import { CircleLoader } from "../../common/CircleLoader";
import { CircleLoaderColors } from "../../common/CircleLoader/types";
import { CodeSnippet } from "../../common/CodeSnippet";
import { Link } from "../../common/Link";
import { ChatFillIcon } from "../../common/icons/ChatIFillIcon";
import { CodeIcon } from "../../common/icons/CodeIcon";
import { DockerLogoIcon } from "../../common/icons/DockerLogoIcon";
import { LightningIcon } from "../../common/icons/LightningIcon";
import { SlackLogoIcon } from "../../common/icons/SlackLogoIcon";
import { Tabs } from "../Tabs";
import { MainButton, SectionDescription } from "../styles";
import { trackingEvents } from "../tracking";
import { AsyncActionResultData } from "../types";
import { EngineManager } from "./EngineManager";
import * as s from "./styles";
import { InstallStepProps, Operation } from "./types";
import { useEngine } from "./useEngine";

const getCircleLoaderColors = (theme: DefaultTheme): CircleLoaderColors => {
  switch (theme.mode) {
    case "light":
      return {
        start: "rgb(81 84 236 / 0%)",
        end: "#5154ec",
        background: "#ebecf0"
      };
    case "dark":
    case "dark-jetbrains":
      return {
        start: "rgb(120 145 208 / 0%)",
        end: "#7891d0",
        background: "#393b40"
      };
  }
};

const GET_DIGMA_DOCKER_COMPOSE_COMMAND_LINUX =
  "curl -L https://get.digma.ai/ --output docker-compose.yml";
const GET_DIGMA_DOCKER_COMPOSE_COMMAND_WINDOWS =
  "iwr https://get.digma.ai/ -outfile docker-compose.yml";
const RUN_DOCKER_COMPOSE_COMMAND = "docker compose up -d";

const DOCKER_DESKTOP_URL = "https://www.docker.com/products/docker-desktop/";
const DOCKER_URL = "https://docs.docker.com/get-docker/";
const DOCKER_COMPOSE_URL = "https://docs.docker.com/compose/install/";
const DIGMA_HELM_CHART_URL =
  "https://github.com/digma-ai/helm-chart/tree/gh-pages";

const isFirstLaunch = window.wizardFirstLaunch === true;

const checkIfAutoInstallationFlow = (
  config: ConfigContextData,
  isFirstLaunch: boolean
) =>
  Boolean(
    isFirstLaunch &&
      config.digmaStatus &&
      config.digmaStatus.runningDigmaInstances.length === 0 &&
      !config.isDigmaEngineInstalled &&
      config.isDockerInstalled &&
      config.isDockerComposeInstalled
  );

export const InstallStep = (props: InstallStepProps) => {
  const theme = useTheme();
  // const isConnectionCheckStarted = Boolean(props.connectionCheckStatus);
  const [selectedInstallTab, setSelectedInstallTab] = useState(0);
  const [selectedDockerComposeOSTab, setSelectedDockerComposeOSTab] =
    useState(0);
  const config = useContext(ConfigContext);
  const [isInitializing, setIsInitializing] = useState(!config.digmaStatus);
  const previousDigmaStatus = usePrevious(config.digmaStatus);
  const [isAutoInstallationFlow, setIsAutoInstallationFlow] = useState(
    checkIfAutoInstallationFlow(config, isFirstLaunch)
  );
  const [isAutoInstallationFinished, setIsAutoInstallationFinished] =
    useState(false);
  const [isEngineOperationInProgress, setIsEngineOperationInProgress] =
    useState(false);
  const circleLoaderColors = getCircleLoaderColors(theme);

  const handleEngineOperationStart = () => {
    setIsEngineOperationInProgress(true);
  };

  const handleEngineOperationFinish = (
    operation: Operation,
    resultData: AsyncActionResultData
  ) => {
    setIsEngineOperationInProgress(false);

    if (isAutoInstallationFlow) {
      if (operation === Operation.INSTALL) {
        setIsAutoInstallationFinished(true);
        sendTrackingEvent(trackingEvents.AUTO_INSTALLATION_FLOW_FINISHED, {
          result: resultData.result
        });

        if (resultData.result === "failure") {
          setIsAutoInstallationFlow(false);
          handleEngineManualInstallSelect();
        }
      }

      if (operation === Operation.UNINSTALL) {
        setIsAutoInstallationFlow(false);
      }
    }
  };

  const engine = useEngine(
    handleEngineOperationStart,
    handleEngineOperationFinish
  );

  useEffect(() => {
    if (!previousDigmaStatus && config.digmaStatus) {
      setIsInitializing(false);

      const isAutoInstallationFlow = checkIfAutoInstallationFlow(
        config,
        isFirstLaunch
      );

      if (isAutoInstallationFlow) {
        setIsAutoInstallationFlow(isAutoInstallationFlow);

        sendTrackingEvent(trackingEvents.AUTO_INSTALLATION_FLOW_STARTED);
        engine.startOperation(Operation.INSTALL);
      }
    }
  }, [config.digmaStatus, previousDigmaStatus, config, engine]);

  // Move to the next step if connection to Digma is already available
  // on the first launch of the plugin
  useEffect(() => {
    if (
      isFirstLaunch &&
      !previousDigmaStatus &&
      config.digmaStatus?.connection.status &&
      config.digmaStatus.runningDigmaInstances.length === 1
    ) {
      props.onGoToNextStep(true);
    }
  }, [config, previousDigmaStatus, props.onGoToNextStep]);

  // Move to the next step if connection has been established
  // on the first launch of the plugin
  useEffect(() => {
    if (
      isFirstLaunch &&
      previousDigmaStatus &&
      !previousDigmaStatus.connection.status &&
      config.digmaStatus?.connection.status &&
      config.digmaStatus.runningDigmaInstances.length === 1 &&
      config.digmaStatus.runningDigmaInstances
    ) {
      props.onGoToNextStep();
    }
  }, [config, previousDigmaStatus, props.onGoToNextStep]);

  const handleInstallDigmaButtonClick = () => {
    props.onGetDigmaDockerDesktopButtonClick();
  };

  // const handleDigmaIsInstalledButtonClick = () => {
  //   props.onConnectionStatusCheck();
  // };

  // const handleRetryButtonClick = () => {
  //   props.onResetConnectionCheckStatus();
  // };

  const handleConfigureButtonClick = () => {
    props.onGoToNextStep();
  };

  const handleInstallTabSelect = (tabIndex: number) => {
    setSelectedInstallTab(tabIndex);
    props.onInstallTabSelect(installTabs[tabIndex].title);
  };

  const handleSelectDockerComposeOSTab = (tabIndex: number) => {
    setSelectedDockerComposeOSTab(tabIndex);
  };

  const handleSlackLinkClick = () => {
    sendTrackingEvent(trackingEvents.NO_DOCKER_SLACK_LINK_CLICKED);
    props.onSlackLinkClick();
  };

  // const handleEngineAutoInstallationFinish = (result: AsyncActionResult) => {
  //   setIsAutoInstallationFinished(true);
  //   sendTrackingEvent(trackingEvents.AUTO_INSTALLATION_FLOW_FINISHED, {
  //     result
  //   });

  //   if (result === "failure") {
  //     handleEngineManualInstallSelect();
  //   }
  // };

  // const handleEngineRemovalFinish = () => {
  //   setIsAutoInstallationFlow(false);
  // };

  const handleEngineManualInstallSelect = () => {
    const dockerComposeTabIndex = installTabs.findIndex(
      (x) => x.title === "Docker Compose"
    );
    if (dockerComposeTabIndex >= 0) {
      setSelectedInstallTab(dockerComposeTabIndex);
      sendTrackingEvent(trackingEvents.DOCKER_COMPOSE_TAB_VIEWED);
    }
  };

  // const renderLoader = () => (
  //   <s.LoaderContainer>
  //     {props.connectionCheckStatus && (
  //       <Loader
  //         size={84}
  //         status={props.connectionCheckStatus}
  //         themeKind={getThemeKind(theme)}
  //       />
  //     )}
  //   </s.LoaderContainer>
  // );

  const renderRunningDigmaMessage = () => {
    let showMessage = false;
    let messageString = "Digma is currently running!";
    const digmaStatus = config.digmaStatus;

    if (digmaStatus && digmaStatus.runningDigmaInstances.length > 1) {
      showMessage = true;
    }

    if (
      digmaStatus &&
      digmaStatus.runningDigmaInstances.length === 1 &&
      !digmaStatus.runningDigmaInstances.includes("localEngine")
    ) {
      showMessage = true;
    }

    if (
      digmaStatus &&
      digmaStatus.runningDigmaInstances.length === 1 &&
      digmaStatus.runningDigmaInstances.includes("dockerDesktop")
    ) {
      messageString = "Digma is currently running as a Docker Extension!";
      showMessage = true;
    }

    return showMessage ? (
      <s.RunningDigmaMessageContainer>
        <s.RunningDigmaMessageTitle>{messageString}</s.RunningDigmaMessageTitle>
        <span>If you wish to re-install Digma please uninstall first</span>
      </s.RunningDigmaMessageContainer>
    ) : null;
  };

  // const renderMainButton = () => {
  //   if (!isConnectionCheckStarted) {
  //     return (
  //       <MainButton onClick={handleDigmaIsInstalledButtonClick}>
  //         OK, I&apos;ve installed Digma
  //       </MainButton>
  //     );
  //   }

  //   switch (props.connectionCheckStatus) {
  //     case "pending":
  //       return <MainButton disabled={true}>Complete</MainButton>;
  //     case "failure":
  //       return <MainButton onClick={handleRetryButtonClick}>Retry</MainButton>;
  //     case "success":
  //       return (
  //         <MainButton
  //           icon={{
  //             component: CheckmarkCircleInvertedIcon,
  //             color: "#0fbf00"
  //           }}
  //           onClick={handleNextButtonClick}
  //         >
  //           Complete
  //         </MainButton>
  //       );
  //   }
  // };

  const runningDigmaMessage = renderRunningDigmaMessage();

  const renderDockerComposeInstructions = () => (
    <>
      <SectionDescription>Then run:</SectionDescription>
      <CodeSnippet text={RUN_DOCKER_COMPOSE_COMMAND} language={"bash"} />
      <SectionDescription>
        Prefer to use a helm file? Check out{" "}
        <Link
          href={DIGMA_HELM_CHART_URL}
          target={"_blank"}
          rel={"noopener noreferrer"}
        >
          these
        </Link>{" "}
        instructions instead
      </SectionDescription>
    </>
  );

  const dockerComposeOSTabs = [
    {
      title: "Linux & macOS",
      content: (
        <s.DockerComposeOSTabContentContainer>
          <CodeSnippet
            text={GET_DIGMA_DOCKER_COMPOSE_COMMAND_LINUX}
            language={"bash"}
          />
          {renderDockerComposeInstructions()}
        </s.DockerComposeOSTabContentContainer>
      )
    },
    {
      title: "Windows (PowerShell)",
      content: (
        <s.DockerComposeOSTabContentContainer>
          <CodeSnippet
            text={GET_DIGMA_DOCKER_COMPOSE_COMMAND_WINDOWS}
            language={"powershell"}
          />
          {renderDockerComposeInstructions()}
        </s.DockerComposeOSTabContentContainer>
      )
    }
  ];

  const installTabs = [
    ...(config.isDockerInstalled && config.isDockerComposeInstalled
      ? [
          {
            icon: LightningIcon,
            title: "Auto install",
            content: (
              <>
                {runningDigmaMessage}
                <s.TabContentContainer>
                  <EngineManager
                    overlay={Boolean(runningDigmaMessage)}
                    engine={engine}
                  />
                </s.TabContentContainer>
                <s.CommonContentContainer>
                  <MainButton
                    disabled={isEngineOperationInProgress}
                    onClick={handleConfigureButtonClick}
                  >
                    Configure
                  </MainButton>
                </s.CommonContentContainer>
              </>
            )
          }
        ]
      : []),
    {
      icon: CodeIcon,
      title: "Docker Compose",
      disabled: isEngineOperationInProgress,
      content: (
        <>
          {runningDigmaMessage}
          <s.TabContentContainer overlay={Boolean(runningDigmaMessage)}>
            <s.TextContainer>
              <s.SectionTitle>
                Run the following from the terminal/command line to start the
                Digma backend:
              </s.SectionTitle>
              <SectionDescription>
                (You&apos;ll need{" "}
                <Link onClick={() => openURLInDefaultBrowser(DOCKER_URL)}>
                  Docker
                </Link>{" "}
                and{" "}
                <Link
                  onClick={() => openURLInDefaultBrowser(DOCKER_COMPOSE_URL)}
                >
                  Docker Compose
                </Link>{" "}
                installed)
              </SectionDescription>
            </s.TextContainer>
            <s.DockerComposeTabs
              tabs={dockerComposeOSTabs}
              onSelect={handleSelectDockerComposeOSTab}
              selectedTab={selectedDockerComposeOSTab}
            />
          </s.TabContentContainer>
          <s.CommonContentContainer>
            {/* {renderLoader()} */}
            {/* {renderMainButton()} */}
            {!isFirstLaunch && (
              <MainButton onClick={handleConfigureButtonClick}>
                Configure
              </MainButton>
            )}
          </s.CommonContentContainer>
        </>
      )
    },
    {
      icon: DockerLogoIcon,
      title: "Docker Desktop",
      disabled: isEngineOperationInProgress,
      content: (
        <>
          {runningDigmaMessage}
          <s.DockerDesktopTabContentContainer
            overlay={Boolean(runningDigmaMessage)}
          >
            <s.DockerLogoBackgroundCircle>
              <DockerLogoIcon size={55} color={"currentColor"} />
            </s.DockerLogoBackgroundCircle>
            Install Digma Docker extension
            <SectionDescription>
              (You&apos;ll need{" "}
              <Link onClick={() => openURLInDefaultBrowser(DOCKER_DESKTOP_URL)}>
                Docker Desktop
              </Link>{" "}
              4.10.0 or higher installed)
            </SectionDescription>
            <s.GetDockerExtensionButton
              disabled={
                config.digmaStatus &&
                config.digmaStatus.runningDigmaInstances.length > 0
              }
              onClick={handleInstallDigmaButtonClick}
            >
              Get Digma Docker Extension
            </s.GetDockerExtensionButton>
          </s.DockerDesktopTabContentContainer>
          <s.CommonContentContainer>
            {/* {renderLoader()} */}
            {/* {renderMainButton()} */}
            {!isFirstLaunch && (
              <MainButton onClick={handleConfigureButtonClick}>
                Configure
              </MainButton>
            )}
          </s.CommonContentContainer>
        </>
      )
    },
    {
      title: "I don't have Docker",
      disabled: isEngineOperationInProgress,
      content: (
        <>
          <s.NoDockerTabContentContainer>
            <s.IconBackgroundCircle>
              <ChatFillIcon size={50} color={"currentColor"} />
            </s.IconBackgroundCircle>
            <s.NoDockerText>
              <span>We&apos;ll be adding more options soon</span>
              <span>but please reach out via Slack and we&apos;ll see</span>
              <span>if we can still get your Digma up and running</span>
            </s.NoDockerText>
            <s.SlackLink onClick={handleSlackLinkClick}>
              <SlackLogoIcon size={14} />
              Slack group
            </s.SlackLink>
          </s.NoDockerTabContentContainer>
          <s.CommonContentContainer>
            {/* {renderLoader()} */}
            {/* {renderMainButton()} */}
            {!isFirstLaunch && (
              <MainButton onClick={handleConfigureButtonClick}>
                Configure
              </MainButton>
            )}
          </s.CommonContentContainer>
        </>
      )
    }
  ];

  const renderEngineManager = () => {
    const isDigmaEngineRunning = Boolean(
      config.digmaStatus?.connection.status &&
        config.digmaStatus.runningDigmaInstances.length === 1 &&
        config.digmaStatus.runningDigmaInstances.includes("localEngine")
    );

    const isConfigureButtonEnabled =
      (isFirstLaunch &&
        isAutoInstallationFinished &&
        config.isDigmaEngineInstalled &&
        isDigmaEngineRunning) ||
      !isEngineOperationInProgress;

    return (
      <>
        {runningDigmaMessage}
        <s.EngineManagerContainer>
          <EngineManager
            overlay={Boolean(runningDigmaMessage)}
            isAutoInstallationFlow={isAutoInstallationFlow}
            onManualInstallSelect={handleEngineManualInstallSelect}
            engine={engine}
          />
        </s.EngineManagerContainer>
        <s.CommonContentContainer>
          <MainButton
            disabled={!isConfigureButtonEnabled}
            onClick={handleConfigureButtonClick}
          >
            Configure
          </MainButton>
        </s.CommonContentContainer>
      </>
    );
  };

  const renderTabs = () => (
    <Tabs
      tabs={installTabs}
      onSelect={handleInstallTabSelect}
      selectedTab={selectedInstallTab}
      fullWidth={true}
    />
  );

  const renderContent = () => {
    if (isAutoInstallationFlow || config.isDigmaEngineInstalled) {
      return renderEngineManager();
    }

    return renderTabs();
  };

  return (
    <s.Container>
      {isInitializing ? (
        <s.CircleLoaderContainer>
          <CircleLoader size={32} colors={circleLoaderColors} />
        </s.CircleLoaderContainer>
      ) : (
        renderContent()
      )}
    </s.Container>
  );
};
