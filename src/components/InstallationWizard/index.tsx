import copy from "copy-to-clipboard";
import { useState } from "react";
import { getActions } from "../../utils/getActions";
import { CheckmarkCircleIcon } from "../common/icons/CheckmarkCircleIcon";
import { CopyIcon } from "../common/icons/CopyIcon";
import { Loader } from "../common/Loader";
import { Button } from "./Button";
import * as s from "./styles";

const ACTION_PREFIX = "INSTALLATION_WIZARD";

const actions = getActions(ACTION_PREFIX, {
  skip: "SKIP",
  finish: "FINISH"
});

export const InstallationWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isDigmaInstalled, setIsDigmaInstalled] = useState<boolean>(false);

  const handleCopyButtonClick = (text: string) => {
    copy(text);
  };

  const handleDigmaIsInstalledButtonClick = () => {
    setIsDigmaInstalled(true);
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
    window.sendMessageToDigma({
      action: actions.skip
    });
  };

  const handleAlreadyUsingOTELLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    window.sendMessageToDigma({
      action: actions.skip
    });
  };

  const renderDigmaInstallationContent = () => {
    const getDigmaDockerComposeCommandLinux =
      "curl -L https://get.digma.ai/ --output docker-compose.yml";
    const getDigmaDockerComposeCommandWindows =
      "iwr https://get.digma.ai/ -outfile docker-compose.yml";
    const runDockerComposeCommand = "docker compose up -d";

    return (
      <>
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
          instructions instead:
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

  const renderObservabilityContent = () => (
    <>
      <s.SectionTitle>How to get started?</s.SectionTitle>
      <s.SectionDescription>
        Click on the ‘Observe’ button seen below to enable collecting data about
        your application whenever you run it.
      </s.SectionDescription>
      <s.Illustration src="/images/navigation.png" />
      <s.Footer>
        <Button buttonType="primary" onClick={handleContinueButtonClick}>
          Continue
        </Button>
        <s.Link onClick={handleAlreadyUsingOTELLinkClick}>
          Already using OpenTelemetry?
        </s.Link>
      </s.Footer>
    </>
  );

  const steps = [
    {
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
      title: "Observe your application",
      content: renderObservabilityContent(),
      link: {
        text: "Already using OpenTelemetry?",
        onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
          handleAlreadyUsingOTELLinkClick(e);
        }
      }
    }
  ];

  const step = steps[currentStep];

  return (
    <s.Container>
      <s.Header>Digma quick start guide for Java</s.Header>
      <s.Content>
        <s.StepCounter>Step {currentStep + 1}</s.StepCounter>
        <s.StepTitle>{step.title}</s.StepTitle>
        <s.StepContent>{step.content}</s.StepContent>
      </s.Content>
    </s.Container>
  );
};
