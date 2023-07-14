import { useState } from "react";
import { useTheme } from "styled-components";
import { actions as globalActions } from "../../common/App";
import { getThemeKind } from "../../common/App/styles";
import { Loader } from "../../common/Loader";
import { ChatFillIcon } from "../../common/icons/ChatIFillIcon";
import { CheckmarkCircleInvertedIcon } from "../../common/icons/CheckmarkCircleInvertedIcon";
import { CodeIcon } from "../../common/icons/CodeIcon";
import { DockerLogoIcon } from "../../common/icons/DockerLogoIcon";
import { SlackLogoIcon } from "../../common/icons/SlackLogoIcon";
import { CodeSnippet } from "../CodeSnippet";
import { Tabs } from "../Tabs";
import { Link, MainButton, SectionDescription } from "../styles";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import { InstallStepProps } from "./types";

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

export const InstallStep = (props: InstallStepProps) => {
  const theme = useTheme();
  const isConnectionCheckStarted = Boolean(props.connectionCheckStatus);
  const [selectedInstallTab, setSelectedInstallTab] = useState(0);
  const [selectedDockerComposeOSTab, setSelectedDockerComposeOSTab] =
    useState(0);

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

  const openLinkInDefaultBrowser = (url: string) => {
    window.sendMessageToDigma({
      action: globalActions.OPEN_URL_IN_DEFAULT_BROWSER,
      payload: {
        url
      }
    });
  };

  const renderDockerComposeInstructions = () => (
    <>
      <SectionDescription>Then run:</SectionDescription>
      <CodeSnippet text={RUN_DOCKER_COMPOSE_COMMAND} />
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
          <CodeSnippet text={GET_DIGMA_DOCKER_COMPOSE_COMMAND_LINUX} />
          {renderDockerComposeInstructions()}
        </s.DockerComposeOSTabContentContainer>
      )
    },
    {
      title: "Windows (PowerShell)",
      content: (
        <s.DockerComposeOSTabContentContainer>
          <CodeSnippet text={GET_DIGMA_DOCKER_COMPOSE_COMMAND_WINDOWS} />
          {renderDockerComposeInstructions()}
        </s.DockerComposeOSTabContentContainer>
      )
    }
  ];

  const handleSlackLinkClick = () => {
    window.sendMessageToDigma({
      action: globalActions.SEND_TRACKING_EVENT,
      payload: {
        eventName: trackingEvents.NO_DOCKER_SLACK_LINK_CLICKED
      }
    });
    props.onSlackLinkClick();
  };

  const installTabs = [
    {
      icon: DockerLogoIcon,
      title: "Docker Desktop",
      content: (
        <s.TabContentContainer>
          <s.SectionTitle>
            <DockerLogoIcon size={24} color={"#2396ed"} />
            Install Digma Docker extension
          </s.SectionTitle>
          <SectionDescription>
            (You&apos;ll need{" "}
            <Link onClick={() => openLinkInDefaultBrowser(DOCKER_DESKTOP_URL)}>
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
      )
    },
    {
      icon: CodeIcon,
      title: "Docker Compose",
      content: (
        <s.TabContentContainer>
          <s.SectionTitle>
            Run the following from the terminal/command line to start the Digma
            backend:
          </s.SectionTitle>
          <SectionDescription>
            (You&apos;ll need{" "}
            <Link onClick={() => openLinkInDefaultBrowser(DOCKER_URL)}>
              Docker
            </Link>{" "}
            and{" "}
            <Link onClick={() => openLinkInDefaultBrowser(DOCKER_COMPOSE_URL)}>
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
      )
    },
    {
      title: "I don't have Docker",
      content: (
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
            <SlackLogoIcon />
            Slack group
          </s.SlackLink>
        </s.NoDockerTabContentContainer>
      )
    }
  ];

  return (
    <s.Container>
      <Tabs
        tabs={installTabs}
        onSelect={handleInstallTabSelect}
        selectedTab={selectedInstallTab}
        fullWidth={true}
      />
      <s.CommonContentContainer>
        <s.LoaderContainer>
          {props.connectionCheckStatus && (
            <Loader
              size={84}
              status={props.connectionCheckStatus}
              themeKind={getThemeKind(theme)}
            />
          )}
        </s.LoaderContainer>
        {!isConnectionCheckStarted && (
          <MainButton onClick={handleDigmaIsInstalledButtonClick}>
            OK, I&apos;ve installed Digma
          </MainButton>
        )}
        {props.connectionCheckStatus === "pending" && (
          <MainButton disabled={true}>Complete</MainButton>
        )}
        {props.connectionCheckStatus === "failure" && (
          <MainButton onClick={handleRetryButtonClick}>Retry</MainButton>
        )}
        {props.connectionCheckStatus === "success" && (
          <MainButton
            icon={{
              component: CheckmarkCircleInvertedIcon,
              color: "#0fbf00"
            }}
            onClick={handleNextButtonClick}
          >
            Complete
          </MainButton>
        )}
      </s.CommonContentContainer>
    </s.Container>
  );
};
