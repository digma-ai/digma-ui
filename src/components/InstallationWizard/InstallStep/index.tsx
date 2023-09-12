import { useContext, useEffect, useState } from "react";
import { DefaultTheme, useTheme } from "styled-components";
import { usePrevious } from "../../../hooks/usePrevious";
import { openURLInDefaultBrowser } from "../../../utils/openURLInDefaultBrowser";
import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
import { ConfigContext } from "../../common/App/ConfigContext";
import { getThemeKind } from "../../common/App/styles";
import { ConfigContextData } from "../../common/App/types";
import { CircleLoader } from "../../common/CircleLoader";
import { CircleLoaderColors } from "../../common/CircleLoader/types";
import { CodeSnippet } from "../../common/CodeSnippet";
import { Link } from "../../common/Link";
import { Loader } from "../../common/Loader";
import { ChatFillIcon } from "../../common/icons/ChatIFillIcon";
import { CheckmarkCircleInvertedIcon } from "../../common/icons/CheckmarkCircleInvertedIcon";
import { CodeIcon } from "../../common/icons/CodeIcon";
import { DockerLogoIcon } from "../../common/icons/DockerLogoIcon";
import { SlackLogoIcon } from "../../common/icons/SlackLogoIcon";
import { Tabs } from "../Tabs";
import { MainButton, SectionDescription } from "../styles";
import { trackingEvents } from "../tracking";
import { AsyncActionResult } from "../types";
import { EngineManager } from "./EngineManager";
import * as s from "./styles";
import { InstallStepProps } from "./types";

const getCircleLoaderColors = (theme: DefaultTheme): CircleLoaderColors => {
  switch (theme.mode) {
    case "light":
      return {
        start: "rgb(81 84 236 / 0%)",
        end: "#5154ec",
        background: "#f1f5fa"
      };
    case "dark":
    case "dark-jetbrains":
      return {
        start: "rgb(120 145 208 / 0%)",
        end: "#7891d0",
        background: "#383838"
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
      config.digmaStatus.isRunning === false &&
      config.digmaStatus.type === null &&
      !config.isDigmaEngineInstalled &&
      config.isDockerInstalled &&
      config.isDockerComposeInstalled
  );

export const InstallStep = (props: InstallStepProps) => {
  const theme = useTheme();
  const isConnectionCheckStarted = Boolean(props.connectionCheckStatus);
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

  useEffect(() => {
    if (!previousDigmaStatus && config.digmaStatus) {
      setIsInitializing(false);

      const isAutoInstallationFlow = checkIfAutoInstallationFlow(
        config,
        isFirstLaunch
      );

      if (isAutoInstallationFlow) {
        setIsAutoInstallationFlow(isAutoInstallationFlow);
      }
    }
  }, [config.digmaStatus, previousDigmaStatus, config]);

  const handleInstallDigmaButtonClick = () => {
    props.onGetDigmaDockerDesktopButtonClick();
  };

  const handleDigmaIsInstalledButtonClick = () => {
    props.onConnectionStatusCheck();
  };

  const handleRetryButtonClick = () => {
    props.onResetConnectionCheckStatus();
  };

  const handleNextButtonClick = () => {
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

  const handleEngineAutoInstallationFinish = (result: AsyncActionResult) => {
    setIsAutoInstallationFinished(true);
    sendTrackingEvent(trackingEvents.AUTO_INSTALLATION_FLOW_FINISHED, {
      result
    });

    if (result === "failure") {
      handleEngineManualInstallSelect();
    }
  };

  const handleEngineRemovalFinish = () => {
    setIsAutoInstallationFlow(false);
  };

  const handleEngineManualInstallSelect = () => {
    setIsAutoInstallationFlow(false);
    const dockerComposeTabIndex = installTabs.findIndex(
      (x) => x.title === "Docker Compose"
    );
    if (dockerComposeTabIndex >= 0) {
      setSelectedInstallTab(dockerComposeTabIndex);
      sendTrackingEvent(trackingEvents.DOCKER_COMPOSE_TAB_VIEWED);
    }
  };

  const handleEngineOperationStart = () => {
    setIsEngineOperationInProgress(true);
  };

  const handleEngineOperationFinish = () => {
    setIsEngineOperationInProgress(false);
  };

  const renderLoader = () => (
    <s.LoaderContainer>
      {props.connectionCheckStatus && (
        <Loader
          size={84}
          status={props.connectionCheckStatus}
          themeKind={getThemeKind(theme)}
        />
      )}
    </s.LoaderContainer>
  );

  const renderMainButton = () => {
    if (!isConnectionCheckStarted) {
      return (
        <MainButton onClick={handleDigmaIsInstalledButtonClick}>
          OK, I&apos;ve installed Digma
        </MainButton>
      );
    }

    switch (props.connectionCheckStatus) {
      case "pending":
        return <MainButton disabled={true}>Complete</MainButton>;
      case "failure":
        return <MainButton onClick={handleRetryButtonClick}>Retry</MainButton>;
      case "success":
        return (
          <MainButton
            icon={{
              component: CheckmarkCircleInvertedIcon,
              color: "#0fbf00"
            }}
            onClick={handleNextButtonClick}
          >
            Complete
          </MainButton>
        );
    }
  };

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
            title: "Auto install",
            content: (
              <s.TabContentContainer>
                <EngineManager
                  onOperationStart={handleEngineOperationStart}
                  onOperationFinish={handleEngineOperationFinish}
                />
              </s.TabContentContainer>
            )
          }
        ]
      : []),
    {
      icon: CodeIcon,
      title: "Docker Compose",
      content: (
        <>
          <s.TabContentContainer>
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
              <Link onClick={() => openURLInDefaultBrowser(DOCKER_COMPOSE_URL)}>
                Docker Compose
              </Link>{" "}
              installed)
            </SectionDescription>
            <s.DockerComposeTabs
              tabs={dockerComposeOSTabs}
              onSelect={handleSelectDockerComposeOSTab}
              selectedTab={selectedDockerComposeOSTab}
            />
          </s.TabContentContainer>
          <s.CommonContentContainer>
            {renderLoader()}
            {renderMainButton()}
          </s.CommonContentContainer>
        </>
      )
    },
    {
      icon: DockerLogoIcon,
      title: "Docker Desktop",
      content: (
        <>
          <s.TabContentContainer>
            <s.SectionTitle>
              <DockerLogoIcon size={24} color={"#2396ed"} />
              Install Digma Docker extension
            </s.SectionTitle>
            <SectionDescription>
              (You&apos;ll need{" "}
              <Link onClick={() => openURLInDefaultBrowser(DOCKER_DESKTOP_URL)}>
                Docker Desktop
              </Link>{" "}
              4.10.0 or higher installed)
            </SectionDescription>
            <s.GetDockerExtensionButton
              buttonType={"secondary"}
              onClick={handleInstallDigmaButtonClick}
            >
              Get Digma Docker Extension
            </s.GetDockerExtensionButton>
          </s.TabContentContainer>
          <s.CommonContentContainer>
            {renderLoader()}
            {renderMainButton()}
          </s.CommonContentContainer>
        </>
      )
    },
    {
      title: "I don't have Docker",
      content: (
        <>
          <s.NoDockerTabContentContainer>
            <s.IconBackgroundCircle>
              <ChatFillIcon
                size={28}
                color={theme.mode === "light" ? "#fbfdff" : "#83858e"}
              />
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
            {renderLoader()}
            {renderMainButton()}
          </s.CommonContentContainer>
        </>
      )
    }
  ];

  const renderEngineManager = () => (
    <EngineManager
      autoInstall={isAutoInstallationFlow}
      onAutoInstallFinish={handleEngineAutoInstallationFinish}
      onManualInstallSelect={handleEngineManualInstallSelect}
      onRemoveFinish={handleEngineRemovalFinish}
      onOperationStart={handleEngineOperationStart}
      onOperationFinish={handleEngineOperationFinish}
    />
  );

  const renderContent = () => {
    const digmaStatus = config.digmaStatus;

    if (digmaStatus?.type) {
      let messageString =
        "Digma is already running, please remove all running containers to re-install";

      switch (digmaStatus.type) {
        case "localEngine":
          return renderEngineManager();
        case "dockerDesktop":
          messageString =
            "Digma is already running as Docker extension, please remove the extension first to re-install";
          break;
      }

      return <s.AlreadyRunningMessage>{messageString}</s.AlreadyRunningMessage>;
    }

    if (isAutoInstallationFlow || config.isDigmaEngineInstalled) {
      return renderEngineManager();
    }

    return (
      <Tabs
        tabs={installTabs}
        onSelect={handleInstallTabSelect}
        selectedTab={selectedInstallTab}
        fullWidth={true}
      />
    );
  };

  const renderNextButton = () => (
    <s.CommonContentContainer>
      {(isAutoInstallationFinished ||
        (!isAutoInstallationFlow && !isEngineOperationInProgress)) && (
        <MainButton onClick={handleNextButtonClick}>Next</MainButton>
      )}
    </s.CommonContentContainer>
  );

  return (
    <s.Container>
      {isInitializing ? (
        <s.CircleLoaderContainer>
          <CircleLoader size={32} colors={circleLoaderColors} />
        </s.CircleLoaderContainer>
      ) : (
        <>
          {renderContent()}
          {renderNextButton()}
        </>
      )}
    </s.Container>
  );
};
