import { useState } from "react";
import { useTheme } from "styled-components";
import { actions as globalActions } from "../../common/App";
import { getThemeKind } from "../../common/App/styles";
import { Loader } from "../../common/Loader";
import { CheckmarkCircleInvertedIcon } from "../../common/icons/CheckmarkCircleInvertedIcon";
import { CodeIcon } from "../../common/icons/CodeIcon";
import { DockerLogoIcon } from "../../common/icons/DockerLogoIcon";
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

  const dockerComposeOSTabs = [
    {
      title: "Linux & macOS",
      content: <CodeSnippet text={GET_DIGMA_DOCKER_COMPOSE_COMMAND_LINUX} />
    },
    {
      title: "Windows (PowerShell)",
      content: <CodeSnippet text={GET_DIGMA_DOCKER_COMPOSE_COMMAND_WINDOWS} />
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
        <s.InstallTabContentContainer>
          <s.SectionTitle>
            <DockerLogoIcon size={24} color={"#2396ed"} />
            Install Digma Docker extension
          </s.SectionTitle>
          <SectionDescription>
            (You&apos;ll need{" "}
            <Link
              href={DOCKER_DESKTOP_URL}
              target={"_blank"}
              rel={"noopener noreferrer"}
            >
              Docker Desktop
            </Link>{" "}
            4.10.0 or later installed)
          </SectionDescription>
          <s.GetDockerExtensionButton
            buttonType={"secondary"}
            onClick={handleInstallDigmaButtonClick}
          >
            Get Digma Docker Extension
          </s.GetDockerExtensionButton>
        </s.InstallTabContentContainer>
      )
    },
    {
      icon: CodeIcon,
      title: "Docker Compose",
      content: (
        <s.DockerComposeOSTabContentContainer>
          <s.SectionTitle>
            Run the following from the terminal/command line to start the Digma
            backend:
          </s.SectionTitle>
          <SectionDescription>
            (You&apos;ll need{" "}
            <Link
              href={DOCKER_URL}
              target={"_blank"}
              rel={"noopener noreferrer"}
            >
              Docker
            </Link>{" "}
            and{" "}
            <Link
              href={DOCKER_COMPOSE_URL}
              target={"_blank"}
              rel={"noopener noreferrer"}
            >
              Docker Compose
            </Link>{" "}
            installed)
          </SectionDescription>
          <s.DockerComposeTabs
            tabs={dockerComposeOSTabs}
            onSelect={handleSelectDockerComposeOSTab}
            selectedTab={selectedDockerComposeOSTab}
          />
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
        </s.DockerComposeOSTabContentContainer>
      )
    },
    {
      title: "I don't have Docker",
      content: (
        <s.DockerComposeOSTabContentContainer>
          <SectionDescription>
            We&apos;ll be adding more options soon but please reach out via{" "}
            <Link onClick={handleSlackLinkClick}>Slack</Link> and we&apos;ll see
            if we can still get your Digma up and running
          </SectionDescription>
        </s.DockerComposeOSTabContentContainer>
      )
    }
  ];

  return (
    <s.Container>
      <Tabs
        tabs={installTabs}
        onSelect={handleInstallTabSelect}
        selectedTab={selectedInstallTab}
      />
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
    </s.Container>
  );
};
