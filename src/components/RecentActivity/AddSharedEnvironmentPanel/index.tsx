import { ChangeEvent, useEffect, useState } from "react";
import { actions as globalActions } from "../../../actions";
import {
  INSTALL_DIGMA_IN_ORGANIZATION_DOCUMENTATION_URL,
  SETUP_PLUGIN_TO_ORGANIZATION_DIGMA_URL,
  SLACK_WORKSPACE_URL
} from "../../../constants";
import { dispatcher } from "../../../dispatcher";
import { openURLInDefaultBrowser } from "../../../utils/openURLInDefaultBrowser";
import { AsyncActionResultData } from "../../InstallationWizard/types";
import { NewCircleLoader } from "../../common/NewCircleLoader";
import { Tooltip } from "../../common/Tooltip";
import { CheckmarkCircleInvertedIcon } from "../../common/icons/CheckmarkCircleInvertedIcon";
import { InfinityIcon } from "../../common/icons/InfinityIcon";
import { InfoCircleIcon } from "../../common/icons/InfoCircleIcon";
import { WarningCircleLargeIcon } from "../../common/icons/WarningCircleLargeIcon";
import { actions } from "../actions";
import { Section } from "./Section";
import * as s from "./styles";
import { AddSharedEnvironmentPanelProps } from "./types";

export const AddSharedEnvironmentPanel = (
  props: AddSharedEnvironmentPanelProps
) => {
  const [apiToken, setApiToken] = useState(props.environment.token || "");
  const [ip, setIP] = useState(props.environment.serverApiUrl || "");
  const [connectionTestResult, setConnectionTestResult] =
    useState<AsyncActionResultData>();
  const [isConnectionCheckInProgress, setIsConnectionCheckInProgress] =
    useState(false);

  useEffect(() => {
    window.sendMessageToDigma({
      action: globalActions.OPEN_URL_IN_EDITOR_TAB,
      payload: {
        url: INSTALL_DIGMA_IN_ORGANIZATION_DOCUMENTATION_URL,
        title: "Installing Digma in your organization"
      }
    });

    const handleConnectionCheckResultData = (data: unknown) => {
      setConnectionTestResult(data as AsyncActionResultData);
      setIsConnectionCheckInProgress(false);
    };

    dispatcher.addActionListener(
      actions.SET_REMOTE_ENVIRONMENT_CONNECTION_CHECK_RESULT,
      handleConnectionCheckResultData
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_REMOTE_ENVIRONMENT_CONNECTION_CHECK_RESULT,
        handleConnectionCheckResultData
      );
    };
  }, []);

  const handleInstructionsLinkClick = () => {
    window.sendMessageToDigma({
      action: globalActions.OPEN_URL_IN_EDITOR_TAB,
      payload: {
        url: INSTALL_DIGMA_IN_ORGANIZATION_DOCUMENTATION_URL,
        title: "Installing Digma in your organization"
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
    window.sendMessageToDigma({
      action: actions.CHECK_REMOTE_ENVIRONMENT_CONNECTION,
      payload: {
        token: apiToken,
        serverAddress: ip
      }
    });
    setIsConnectionCheckInProgress(true);
  };

  const handleSetupPluginLinkClick = () => {
    window.sendMessageToDigma({
      action: globalActions.OPEN_URL_IN_EDITOR_TAB,
      payload: {
        url: SETUP_PLUGIN_TO_ORGANIZATION_DIGMA_URL,
        title: "Connecting your IDE to the Org Digma deployment"
      }
    });
  };

  // const handleAutoApplyButtonClick = () => {
  //   window.sendMessageToDigma({
  //     action: actions.APPLY_REMOTE_ENVIRONMENT_SETTINGS,
  //     payload: {
  //       token: apiToken,
  //       serverAddress: ip
  //     }
  //   });
  // };

  const handleFinishButtonClick = () => {
    // TODO
  };

  const handleContactUsLinkClick = () => {
    openURLInDefaultBrowser(SLACK_WORKSPACE_URL);
  };

  const renderConnectionResultMessage = () => {
    const result = connectionTestResult?.result;
    switch (result) {
      case "success":
        return (
          <s.ConnectionTestResultMessage result={result}>
            <WarningCircleLargeIcon size={14} color={"currentColor"} />
            Connected to server successfully
          </s.ConnectionTestResultMessage>
        );
      case "failure":
        return (
          <s.ConnectionTestResultMessage result={result}>
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
        How to setup your CI/Prod Environment
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
            <Tooltip
              title={
                "The API Token is provided as an argument when you deploy the Helm chart for Digma. Copy its value into this field"
              }
            >
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
            <Tooltip
              title={
                "Use the Digma Plugin API url which is typically exposed by the service: digma-plugin-api-service-lb in the helm deployment"
              }
            >
              <span>
                <InfoCircleIcon size={16} color={"currentColor"} />
              </span>
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
            {isConnectionCheckInProgress && (
              <NewCircleLoader size={20} color={"#5154ec"} />
            )}
            {connectionTestResult && renderConnectionResultMessage()}
          </s.TestConnectionContainer>
        </Section>
        <Section number={2} title={"Connect Plugin"} isExpanded={false}>
          <span>
            <s.Link onClick={handleSetupPluginLinkClick}>
              Setup the plugin
            </s.Link>{" "}
            to connect to Org Digma
          </span>
          {/* <s.Button
            disabled={connectionTestResult?.result !== "success"}
            onClick={handleAutoApplyButtonClick}
          >
            Auto Apply
          </s.Button> */}
        </Section>
        <s.Button
          disabled={connectionTestResult?.result !== "success"}
          onClick={handleFinishButtonClick}
        >
          Finish
        </s.Button>
        <s.Link onClick={handleContactUsLinkClick}>
          Having Trouble? Contact us
        </s.Link>
      </s.ContentContainer>
    </s.Container>
  );
};
