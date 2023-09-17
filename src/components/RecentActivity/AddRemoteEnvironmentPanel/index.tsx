import { ChangeEvent, useState } from "react";
import { actions as globalActions } from "../../../actions";
import { SLACK_WORKSPACE_URL } from "../../../constants";
import { openURLInDefaultBrowser } from "../../../utils/openURLInDefaultBrowser";
import { Tooltip } from "../../common/Tooltip";
import { CheckmarkCircleInvertedIcon } from "../../common/icons/CheckmarkCircleInvertedIcon";
import { InfinityIcon } from "../../common/icons/InfinityIcon";
import { InfoCircleIcon } from "../../common/icons/InfoCircleIcon";
import { WarningCircleLargeIcon } from "../../common/icons/WarningCircleLargeIcon";
import { Section } from "./Section";
import * as s from "./styles";
import { AddRemoteEnvironmentPanelProps } from "./types";

const INSTALL_DIGMA_IN_ORGANIZATION_DOCUMENTATION_URL =
  "https://digma.ai/installing-digma-in-your-organization/";

export const AddRemoteEnvironmentPanel = (
  props: AddRemoteEnvironmentPanelProps
) => {
  const [apiToken, setApiToken] = useState("");
  const [ip, setIP] = useState("");
  const [connectionTestResult, setConnectionTestResult] = useState<
    "success" | "failure" | undefined
  >();

  const handleInstructionsLinkClick = () => {
    window.sendMessageToDigma({
      action: globalActions.OPEN_URL_IN_EDITOR_TAB,
      payload: {
        url: INSTALL_DIGMA_IN_ORGANIZATION_DOCUMENTATION_URL
      }
    });
  };

  const handleApiTokenTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setApiToken(e.target.value);
    setConnectionTestResult(undefined);
  };

  const handleIPTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIP(e.target.value);
    setConnectionTestResult(undefined);
  };

  const handleTestConnectionButtonClick = () => {
    // TODO:
  };

  const handleGitHubDocumentationLinkClick = () => {
    // TODO:
  };

  const handleGitLabDocumentationLinkClick = () => {
    // TODO:
  };

  const handleSetupPluginLinkClick = () => {
    // TODO:
  };

  const handleAutoApplyButtonClick = () => {
    // TODO:
  };

  const handleContactUsLinkClick = () => {
    openURLInDefaultBrowser(SLACK_WORKSPACE_URL);
  };

  const renderConnectionResultMessage = () => {
    switch (connectionTestResult) {
      case "success":
        return (
          <s.ConnectionTestResultMessage result={connectionTestResult}>
            <WarningCircleLargeIcon size={14} color={"currentColor"} />
            Connected to server successfully
          </s.ConnectionTestResultMessage>
        );
      case "failure":
        return (
          <s.ConnectionTestResultMessage result={connectionTestResult}>
            <CheckmarkCircleInvertedIcon size={14} color={"currentColor"} />
            Connection to server failed
          </s.ConnectionTestResultMessage>
        );
    }
  };

  return (
    <s.Container>
      <s.Header>
        <InfinityIcon size={16} color={"currentColor"} />
        How to setup your CI Environment
      </s.Header>
      <s.ContentContainer>
        <Section
          number={1}
          title={"Installing Digma in your organization"}
          isExpanded={true}
        >
          <span>
            Follow the{" "}
            <s.Link onClick={handleInstructionsLinkClick}>instructions</s.Link>{" "}
            to set up Digma in your organization
          </span>
          <s.TextFieldContainer>
            <s.TextField
              value={apiToken}
              onChange={handleApiTokenTextFieldChange}
              placeholder={"Enter API Token"}
            />
            <Tooltip title={"tooltip text"}>
              <span>
                <InfoCircleIcon size={16} color={"currentColor"} />
              </span>
            </Tooltip>
          </s.TextFieldContainer>
          <s.TextFieldContainer>
            <s.TextField
              value={ip}
              onChange={handleIPTextFieldChange}
              placeholder={"Enter Digma IP/DNS"}
            />
            <Tooltip title={"tooltip text"}>
              <InfoCircleIcon size={16} color={"currentColor"} />
            </Tooltip>
          </s.TextFieldContainer>
          <s.TestConnectionContainer>
            <s.Button
              onClick={handleTestConnectionButtonClick}
              buttonType={"secondary"}
              disabled={[apiToken, ip].some((x) => x.length === 0)}
            >
              Test Connection
            </s.Button>
            {connectionTestResult && renderConnectionResultMessage()}
          </s.TestConnectionContainer>
        </Section>
        <Section number={2} title={"Connect to your CI"} isExpanded={false}>
          <s.ServiceContainer>
            <s.ServiceTitle>GitHub</s.ServiceTitle>
            <span>
              See our{" "}
              <s.Link onClick={handleGitHubDocumentationLinkClick}>
                GitHub documentation
              </s.Link>{" "}
              on how to collect data from your builds
            </span>
          </s.ServiceContainer>
          <s.ServiceContainer>
            <s.ServiceTitle>GitLab</s.ServiceTitle>
            <span>
              See our{" "}
              <s.Link onClick={handleGitLabDocumentationLinkClick}>
                GitLab documentation
              </s.Link>{" "}
              on how to collect data from your builds
            </span>
          </s.ServiceContainer>
        </Section>
        <Section number={3} title={"Connect Plugin"} isExpanded={false}>
          <span>
            <s.Link onClick={handleSetupPluginLinkClick}>
              Setup the plugin
            </s.Link>{" "}
            to connect to Org Digma
          </span>
          <s.Button
            disabled={connectionTestResult !== "success"}
            onClick={handleAutoApplyButtonClick}
          >
            Auto Apply
          </s.Button>
        </Section>
        <s.Link onClick={handleContactUsLinkClick}>
          Having Trouble? Contact us
        </s.Link>
      </s.ContentContainer>
    </s.Container>
  );
};
