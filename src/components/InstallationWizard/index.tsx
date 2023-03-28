import copy from "copy-to-clipboard";
import { useState } from "react";
import { getActions } from "../../utils/getActions";
import { CheckmarkCircleIcon } from "../common/icons/CheckmarkCircleIcon";
import { CheckmarkCircleInvertedIcon } from "../common/icons/CheckmarkCircleInvertedIcon";
import { CopyIcon } from "../common/icons/CopyIcon";
import { Loader } from "../common/Loader";
import { Button } from "./Button";
import * as s from "./styles";

const ACTION_PREFIX = "INSTALLATION_WIZARD";

const actions = getActions(ACTION_PREFIX, {
  finish: "FINISH"
});

export const InstallationWizard = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isDigmaInstalled, setIsDigmaInstalled] = useState<boolean>(false);
  const [isCollectorModified, setIsCollectorModified] =
    useState<boolean>(false);
  const [isAlreadyUsingOtel, setIsAlreadyUsingOtel] = useState<boolean>(false);

  const handleCopyButtonClick = (text: string) => {
    copy(text);
  };

  const handleDigmaIsInstalledButtonClick = () => {
    setIsDigmaInstalled(true);
  };

  const handleInstallDigmaButtonClick = () => {
    window.open(
      "https://open.docker.com/extensions/marketplace?extensionId=digmaai/digma-docker-extension",
      "_blank",
      "noopener,noreferrer"
    );
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
            href="https://www.docker.com/products/docker-desktop/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Docker Desktop
          </s.Link>{" "}
          installed)
        </s.SectionDescription>
        <s.SectionDescription>
          <Button
            buttonType="secondary"
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
            href="https://docs.docker.com/get-docker/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Docker
          </s.Link>{" "}
          and{" "}
          <s.Link
            href="https://docs.docker.com/compose/install/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Docker Compose
          </s.Link>{" "}
          installed)
        </s.SectionDescription>
        <s.SectionDescription>Linux & MacOS:</s.SectionDescription>
        <s.CodeSnippetContainer disabled={isDigmaInstalled}>
          <s.Code>{getDigmaDockerComposeCommandLinux}</s.Code>
          <s.CopyButton
            onClick={() =>
              handleCopyButtonClick(getDigmaDockerComposeCommandLinux)
            }
          >
            <CopyIcon color="#dadada" />
          </s.CopyButton>
        </s.CodeSnippetContainer>
        <s.SectionDescription>Windows (PowerShell):</s.SectionDescription>
        <s.CodeSnippetContainer disabled={isDigmaInstalled}>
          <s.Code>{getDigmaDockerComposeCommandWindows}</s.Code>
          <s.CopyButton
            onClick={() =>
              handleCopyButtonClick(getDigmaDockerComposeCommandWindows)
            }
          >
            <CopyIcon color="#dadada" />
          </s.CopyButton>
        </s.CodeSnippetContainer>
        <s.SectionDescription>Then run:</s.SectionDescription>
        <s.CodeSnippetContainer disabled={isDigmaInstalled}>
          <s.Code>{runDockerComposeCommand}</s.Code>
          <s.CopyButton
            onClick={() => handleCopyButtonClick(runDockerComposeCommand)}
          >
            <CopyIcon color="#dadada" />
          </s.CopyButton>
        </s.CodeSnippetContainer>
        <s.SectionDescription>
          Prefer to use a helm file? Check out{" "}
          <s.Link
            href="https://github.com/digma-ai/helm-chart/tree/gh-pages"
            target="_blank"
            rel="noopener noreferrer"
          >
            these
          </s.Link>{" "}
          instructions instead
        </s.SectionDescription>
        {isDigmaInstalled ? (
          <Button
            buttonType="success"
            disabled={true}
            icon={<CheckmarkCircleIcon color={"#0fbf00"} />}
          >
            Complete
          </Button>
        ) : (
          <Button
            buttonType="secondary"
            onClick={handleDigmaIsInstalledButtonClick}
          >
            OK, I&apos;ve installed Digma
          </Button>
        )}
        <s.LoaderContainer>
          <Loader
            size={143}
            status={isDigmaInstalled ? "success" : "pending"}
          />
        </s.LoaderContainer>
        <s.Footer>
          <Button
            buttonType="primary"
            disabled={!isDigmaInstalled}
            onClick={handleContinueButtonClick}
          >
            Continue
          </Button>
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
          Modify your collector configuration file to add Digma’s backend as a
          target. For example:
        </s.SectionDescription>
        <s.CodeSnippetContainer disabled={isCollectorModified}>
          <s.Code>{collectorConfigurationSnippet}</s.Code>
          <s.CopyButton
            onClick={() => handleCopyButtonClick(collectorConfigurationSnippet)}
          >
            <CopyIcon color="#dadada" />
          </s.CopyButton>
        </s.CodeSnippetContainer>
        {isCollectorModified ? (
          <Button
            buttonType="success"
            disabled={true}
            icon={<CheckmarkCircleIcon color={"#0fbf00"} />}
          >
            Complete
          </Button>
        ) : (
          <Button
            buttonType="secondary"
            onClick={handleCollectorIsModifiedButtonClick}
          >
            OK, I&apos;ve modified collector configuration
          </Button>
        )}
        <s.Footer>
          <Button
            buttonType="primary"
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
          Press in three dots icon and enable &quot;Observability&quot; toggle
        </s.SectionDescription>
        <s.Illustration src="/images/navigation.png" />
        <s.Footer>
          <Button buttonType="primary" onClick={handleContinueButtonClick}>
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
        ? "If you’re already using OpenTelemetry… "
        : "Observe your application",
      title: isAlreadyUsingOtel
        ? "If you’re already using OpenTelemetry… "
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
