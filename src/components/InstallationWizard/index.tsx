import { useEffect, useState } from "react";
import { dispatcher } from "../../dispatcher";
import { getActions } from "../../utils/getActions";
import { actions as globalActions } from "../common/App";
import { CheckmarkCircleIcon } from "../common/icons/CheckmarkCircleIcon";
import { CheckmarkCircleInvertedIcon } from "../common/icons/CheckmarkCircleInvertedIcon";
import { CrossCircleIcon } from "../common/icons/CrossCircleIcon";
import { Loader } from "../common/Loader";
import { Button } from "./Button";
import { CodeSnippet } from "./CodeSnippet";
import * as s from "./styles";
import { ConnectionCheckResultData, ConnectionCheckStatus } from "./types";

const ACTION_PREFIX = "INSTALLATION_WIZARD";

const actions = getActions(ACTION_PREFIX, {
  finish: "FINISH",
  checkConnection: "CHECK_CONNECTION",
  setConnectionCheckResult: "SET_CONNECTION_CHECK_RESULT"
});

export const InstallationWizard = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isCollectorModified, setIsCollectorModified] =
    useState<boolean>(false);
  const [isAlreadyUsingOtel, setIsAlreadyUsingOtel] = useState<boolean>(false);
  const [connectionCheckStatus, setConnectionCheckStatus] =
    useState<ConnectionCheckStatus>();

  useEffect(() => {
    const handleConnectionCheckResultData = (data: unknown) => {
      const result = (data as ConnectionCheckResultData).result;
      setConnectionCheckStatus(result);
    };

    dispatcher.addActionListener(
      actions.setConnectionCheckResult,
      handleConnectionCheckResultData
    );

    return () => {
      dispatcher.removeActionListener(
        actions.setConnectionCheckResult,
        handleConnectionCheckResultData
      );
    };
  }, []);

  const handleDigmaIsInstalledButtonClick = () => {
    setConnectionCheckStatus("pending");
    window.sendMessageToDigma({
      action: actions.checkConnection
    });
  };

  const handleRetryButtonClick = () => {
    setConnectionCheckStatus(undefined);
  };

  const handleInstallDigmaButtonClick = () => {
    window.sendMessageToDigma({
      action: globalActions.openURLInDefaultBrowser,
      payload: {
        url: "https://open.docker.com/extensions/marketplace?extensionId=digmaai/digma-docker-extension"
      }
    });
  };

  const handleContinueButtonClick = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      window.sendMessageToDigma({
        action: actions.finish
      });
    }
  };

  const handleSkipLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleAlreadyUsingOTELLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setIsAlreadyUsingOtel(!isAlreadyUsingOtel);
  };

  const handleCollectorIsModifiedButtonClick = () => {
    setIsCollectorModified(true);
  };

  const renderDigmaInstallationContent = () => {
    const getDigmaDockerComposeCommandLinux =
      "curl -L https://get.digma.ai/ --output docker-compose.yml";
    const getDigmaDockerComposeCommandWindows =
      "iwr https://get.digma.ai/ -outfile docker-compose.yml";
    const runDockerComposeCommand = "docker compose up -d";

    return (
      <>
        <s.SectionTitle>Install Digma Docker Extension</s.SectionTitle>
        <s.SectionDescription>
          (You’ll need{" "}
          <s.Link
            href={"https://www.docker.com/products/docker-desktop/"}
            target={"_blank"}
            rel={"noopener noreferrer"}
          >
            Docker Desktop
          </s.Link>{" "}
          installed)
        </s.SectionDescription>
        <s.SectionDescription>
          <Button
            buttonType={"secondary"}
            onClick={handleInstallDigmaButtonClick}
          >
            Get Digma Docker Extension
          </Button>
        </s.SectionDescription>
        <s.SectionDivider>or</s.SectionDivider>
        <s.SectionTitle>
          Run the following from the terminal/command line to start the Digma
          backend:
        </s.SectionTitle>
        <s.SectionDescription>
          (You’ll need{" "}
          <s.Link
            href={"https://docs.docker.com/get-docker/"}
            target={"_blank"}
            rel={"noopener noreferrer"}
          >
            Docker
          </s.Link>{" "}
          and{" "}
          <s.Link
            href={"https://docs.docker.com/compose/install/"}
            target={"_blank"}
            rel={"noopener noreferrer"}
          >
            Docker Compose
          </s.Link>{" "}
          installed)
        </s.SectionDescription>
        <s.SectionDescription>Linux & MacOS:</s.SectionDescription>
        <CodeSnippet
          disabled={Boolean(connectionCheckStatus)}
          text={getDigmaDockerComposeCommandLinux}
        />

        <s.SectionDescription>Windows (PowerShell):</s.SectionDescription>
        <CodeSnippet
          disabled={Boolean(connectionCheckStatus)}
          text={getDigmaDockerComposeCommandWindows}
        />
        <s.SectionDescription>Then run:</s.SectionDescription>
        <CodeSnippet
          disabled={Boolean(connectionCheckStatus)}
          text={runDockerComposeCommand}
        />
        <s.SectionDescription>
          Prefer to use a helm file? Check out{" "}
          <s.Link
            href={"https://github.com/digma-ai/helm-chart/tree/gh-pages"}
            target={"_blank"}
            rel={"noopener noreferrer"}
          >
            these
          </s.Link>{" "}
          instructions instead
        </s.SectionDescription>
        {!connectionCheckStatus && (
          <Button
            buttonType={"secondary"}
            onClick={handleDigmaIsInstalledButtonClick}
          >
            OK, I&apos;ve installed Digma
          </Button>
        )}
        {connectionCheckStatus === "success" && (
          <Button
            buttonType={"success"}
            disabled={true}
            icon={<CheckmarkCircleIcon color={"#0fbf00"} />}
          >
            Complete
          </Button>
        )}
        {connectionCheckStatus === "failure" && (
          <Button
            buttonType={"failure"}
            disabled={true}
            icon={<CrossCircleIcon color={"#ed5050"} />}
          >
            Failed
          </Button>
        )}
        <s.LoaderContainer>
          {connectionCheckStatus && (
            <Loader size={143} status={connectionCheckStatus} />
          )}
        </s.LoaderContainer>
        <s.Footer>
          {connectionCheckStatus === "failure" ? (
            <Button buttonType={"primary"} onClick={handleRetryButtonClick}>
              Retry
            </Button>
          ) : (
            <Button
              buttonType={"primary"}
              disabled={connectionCheckStatus !== "success"}
              onClick={handleContinueButtonClick}
            >
              Continue
            </Button>
          )}
          <s.Link onClick={handleSkipLinkClick}>Skip for now</s.Link>
        </s.Footer>
      </>
    );
  };

  const renderObservabilityContent = (isAlreadyUsingOtel: boolean) => {
    const collectorConfigurationSnippet = `otlp/digma:
    endpoint: "localhost:5050"
    tls:
      insecure: true
service:
  pipelines:
    traces:
      exporters: [otlp/digma, ...]`;

    return isAlreadyUsingOtel ? (
      <>
        <s.SectionTitle>Add Digma to your collector:</s.SectionTitle>
        <s.SectionDescription>
          Modify your collector configuration file to add Digma&apos;s backend
          as a target. For example:
        </s.SectionDescription>
        <CodeSnippet
          disabled={isCollectorModified}
          text={collectorConfigurationSnippet}
        />
        {isCollectorModified ? (
          <Button
            buttonType={"success"}
            disabled={true}
            icon={<CheckmarkCircleIcon color={"#0fbf00"} />}
          >
            Complete
          </Button>
        ) : (
          <Button
            buttonType={"secondary"}
            onClick={handleCollectorIsModifiedButtonClick}
          >
            OK, I&apos;ve modified collector configuration
          </Button>
        )}
        <s.Footer>
          <Button
            buttonType={"primary"}
            onClick={handleContinueButtonClick}
            disabled={isAlreadyUsingOtel && !isCollectorModified}
          >
            Finish
          </Button>
          <s.Link onClick={handleAlreadyUsingOTELLinkClick}>
            Observe your application
          </s.Link>
        </s.Footer>
      </>
    ) : (
      <>
        <s.SectionTitle>How to get started?</s.SectionTitle>
        <s.SectionDescription>
          To quickly collect data from your application in IntelliJ, expand the
          Digma side-panel and open the settings menu as seen below.
        </s.SectionDescription>
        <s.Illustration src={"/images/navigation.png"} />
        <s.SectionDescription>
          Click the &quot;Observability&quot; toggle button to automatically
          collect data each time you run or debug via the IDE.
        </s.SectionDescription>
        <s.Footer>
          <Button buttonType={"primary"} onClick={handleContinueButtonClick}>
            Finish
          </Button>
          <s.Link onClick={handleAlreadyUsingOTELLinkClick}>
            Already using OpenTelemetry?
          </s.Link>
        </s.Footer>
      </>
    );
  };

  const steps = [
    {
      shortTitle: "Install Digma",
      title: "Get Digma up and running",
      content: renderDigmaInstallationContent(),
      link: {
        text: "Skip for now",
        onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
          handleSkipLinkClick(e);
        }
      }
    },
    {
      shortTitle: isAlreadyUsingOtel
        ? "If you're already using OpenTelemetry…"
        : "Observe your application",
      title: isAlreadyUsingOtel
        ? "If you're already using OpenTelemetry…"
        : "Observe your application",
      content: renderObservabilityContent(isAlreadyUsingOtel),
      link: {
        text: "Already using OpenTelemetry?",
        onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
          handleAlreadyUsingOTELLinkClick(e);
        }
      }
    }
  ];

  const step = steps[currentStep];

  const previousSteps = steps.slice(0, currentStep);

  return (
    <s.Container>
      {previousSteps.length > 0 ? (
        previousSteps.map((step, i) => (
          <s.PreviousStepHeader key={step.shortTitle}>
            <CheckmarkCircleInvertedIcon color={"#909090"} />
            Step {i + 1}
            <s.StepShortTitle>{step.shortTitle}</s.StepShortTitle>
          </s.PreviousStepHeader>
        ))
      ) : (
        <s.Header>Follow the steps to configure your project</s.Header>
      )}

      <s.Content>
        <s.StepCounter>Step {currentStep + 1}</s.StepCounter>
        <s.StepTitle>{step.title}</s.StepTitle>
        <s.StepContent>{step.content}</s.StepContent>
      </s.Content>
    </s.Container>
  );
};
