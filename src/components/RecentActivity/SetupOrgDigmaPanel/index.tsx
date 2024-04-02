import { ChangeEvent, useContext, useEffect, useState } from "react";
import {
  INSTALL_DIGMA_IN_ORGANIZATION_DOCUMENTATION_URL,
  SETUP_PLUGIN_TO_ORGANIZATION_DIGMA_URL,
  SLACK_WORKSPACE_URL
} from "../../../constants";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import { openURLInDefaultBrowser } from "../../../utils/actions/openURLInDefaultBrowser";
import { sendTrackingEvent } from "../../../utils/actions/sendTrackingEvent";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { getHostnameFromURL } from "../../../utils/getHostNameFromURL";
import { AsyncActionResultData } from "../../InstallationWizard/types";
import { ConfigContext } from "../../common/App/ConfigContext";
import { ConfigContextData } from "../../common/App/types";
import { NewCircleLoader } from "../../common/NewCircleLoader";
import { Tooltip } from "../../common/Tooltip";
import { CheckmarkCircleInvertedIcon } from "../../common/icons/CheckmarkCircleInvertedIcon";
import { CrossIcon } from "../../common/icons/CrossIcon";
import { InfoCircleIcon } from "../../common/icons/InfoCircleIcon";
import { PlugAndSocketIcon } from "../../common/icons/PlugAndSocketIcon";
import { WarningCircleLargeIcon } from "../../common/icons/WarningCircleLargeIcon";
import { actions } from "../actions";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import { SetupOrgDigmaPanelProps } from "./types";

const isIDEConnectedToLocalDigma = (config: ConfigContextData): boolean => {
  const hostname = getHostnameFromURL(config.digmaApiUrl);
  if (hostname && ["localhost", "127.0.0.1"].includes(hostname)) {
    return true;
  }

  return false;
};

const SETTINGS_MISMATCH_ERROR_MESSAGE =
  "Please make sure to update your plugin settings based on the value above. See the documentation for more info";

const renderUpdatePluginSettingsMessage = () => {
  const handleLinkClick = () => {
    openURLInDefaultBrowser(
      SETUP_PLUGIN_TO_ORGANIZATION_DIGMA_URL,
      "Installing Digma in your organization"
    );
  };

  return (
    <s.NotificationMessage $type={"failure"}>
      <div>
        <WarningCircleLargeIcon size={14} color={"currentColor"} />
      </div>
      <span>
        Please make sure to update your plugin settings based on the value
        above. See the <s.Link onClick={handleLinkClick}>documentation</s.Link>{" "}
        for more info
      </span>
    </s.NotificationMessage>
  );
};

export const SetupOrgDigmaPanel = (props: SetupOrgDigmaPanelProps) => {
  const [apiToken, setApiToken] = useState(props.environment.token || "");
  const [serverApiUrl, setServerApiUrl] = useState(
    props.environment.serverApiUrl || ""
  );
  const [connectionTestResult, setConnectionTestResult] =
    useState<AsyncActionResultData>();
  const [isConnectionCheckInProgress, setIsConnectionCheckInProgress] =
    useState(false);
  const previousIsConnectionInProgress = usePrevious(
    isConnectionCheckInProgress
  );
  const [urlToCheckConnection, setUrlToCheckConnection] = useState<string>();
  const [isSettingsMessageVisible, setIsSettingsMessageVisible] =
    useState(false);
  // const [isInstructionsCopyButtonClicked, setIsInstructionsCopyButtonClicked] =
  //   useState(false);
  const config = useContext(ConfigContext);
  const [skipOrgDigmaSetupGuide] = useState(
    !props.environment.isOrgDigmaSetupFinished &&
      !isIDEConnectedToLocalDigma(config)
  );

  useEffect(() => {
    if (isSettingsMessageVisible) {
      setIsSettingsMessageVisible(config.digmaApiUrl !== serverApiUrl);
    }
  }, [config.digmaApiUrl, isSettingsMessageVisible, serverApiUrl]);

  useEffect(() => {
    if (previousIsConnectionInProgress && !isConnectionCheckInProgress) {
      sendTrackingEvent(trackingEvents.CHECK_CONNECTION_RESULT_RECEIVED, {
        serverApiUrl: urlToCheckConnection,
        result: connectionTestResult
      });
      setUrlToCheckConnection(undefined);
    }
  }, [
    previousIsConnectionInProgress,
    isConnectionCheckInProgress,
    connectionTestResult,
    urlToCheckConnection
  ]);

  useEffect(() => {
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
    openURLInDefaultBrowser(
      INSTALL_DIGMA_IN_ORGANIZATION_DOCUMENTATION_URL,
      "Installing Digma in your organization"
    );
  };

  // const handleCopyInstructionsLinkButtonClick = () => {
  //   copy(INSTALL_DIGMA_IN_ORGANIZATION_DOCUMENTATION_URL);
  //   setIsInstructionsCopyButtonClicked(true);
  // };

  const handleApiTokenTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setApiToken(e.target.value);
    setConnectionTestResult(undefined);
  };

  const handleIPTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setServerApiUrl(e.target.value);
    setConnectionTestResult(undefined);
  };

  const handleCloseButtonClick = () => {
    props.onCancel(props.environment.originalName);
  };

  const handleCancelButtonClick = () => {
    props.onCancel(props.environment.originalName);
  };

  const handleTestConnectionButtonClick = () => {
    window.sendMessageToDigma({
      action: actions.CHECK_REMOTE_ENVIRONMENT_CONNECTION,
      payload: {
        environment: props.environment.originalName,
        token: apiToken,
        serverAddress: serverApiUrl
      }
    });
    setIsConnectionCheckInProgress(true);
    setUrlToCheckConnection(serverApiUrl);
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
    const areSettingsMatch = config.digmaApiUrl === serverApiUrl;

    sendUserActionTrackingEvent(trackingEvents.FINISH_BUTTON_CLICKED, {
      result: areSettingsMatch ? "success" : "failure",
      ...(areSettingsMatch ? [] : [{ error: SETTINGS_MISMATCH_ERROR_MESSAGE }])
    });

    if (areSettingsMatch) {
      props.onFinish(props.environment.originalName);
    } else {
      setIsSettingsMessageVisible(true);
    }
  };

  const handleContactUsLinkClick = () => {
    openURLInDefaultBrowser(SLACK_WORKSPACE_URL);
  };

  if (skipOrgDigmaSetupGuide) {
    props.onFinish(props.environment.originalName);
    return null;
  }

  const renderConnectionResultMessage = (data: AsyncActionResultData) => {
    const { result, error } = data;

    switch (result) {
      case "success":
        return (
          <s.NotificationMessage $type={result}>
            <WarningCircleLargeIcon size={14} color={"currentColor"} />
            Connected to server successfully
          </s.NotificationMessage>
        );
      case "failure":
        return (
          <Tooltip title={error}>
            <s.NotificationMessage $type={result}>
              <CheckmarkCircleInvertedIcon size={14} color={"currentColor"} />
              Connection to server failed
            </s.NotificationMessage>
          </Tooltip>
        );
    }
  };

  return (
    <s.Container>
      <s.Header>
        <s.Title>
          <PlugAndSocketIcon size={20} color={"currentColor"} />
          Set up Digma in your organization
          <s.CloseButton onClick={handleCloseButtonClick}>
            <CrossIcon color={"currentColor"} size={14} />
          </s.CloseButton>
        </s.Title>
        <span>
          Environments that connect to org systems such as build systems or
          prod, need to be deployed to a shared location.
        </span>
        <span>
          Digma is easily distributed as a Helm file, you can follow the{" "}
          <s.Link onClick={handleInstructionsLinkClick}>instructions</s.Link>{" "}
          {/* <Tooltip
              title={
                isInstructionsCopyButtonClicked ? "Link copied!" : "Copy link"
              }
            >
              <s.CopyButton onClick={handleCopyInstructionsLinkButtonClick}>
                <CopyIcon color={"currentColor"} />
              </s.CopyButton>
            </Tooltip> */}
          to set up Digma in your organization
        </span>
      </s.Header>
      <s.ContentContainer>
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
            value={serverApiUrl}
            onChange={handleIPTextFieldChange}
            placeholder={"Enter Digma IP/DNS"}
          />
          <Tooltip
            title={
              <span>
                Use the Digma Plugin API url which is typically exposed by the
                service: <code>digma-plugin-api-service-lb</code> in the helm
                deployment
              </span>
            }
          >
            <span>
              <InfoCircleIcon size={16} color={"currentColor"} />
            </span>
          </Tooltip>
        </s.TextFieldContainer>
        <s.TestConnectionStatusContainer>
          <s.Button
            onClick={handleTestConnectionButtonClick}
            buttonType={"secondary"}
            disabled={serverApiUrl.length === 0}
          >
            Test Connection
          </s.Button>
          {isConnectionCheckInProgress && (
            <NewCircleLoader size={20} color={"#5154ec"} />
          )}
          {connectionTestResult &&
            renderConnectionResultMessage(connectionTestResult)}
        </s.TestConnectionStatusContainer>
        {isSettingsMessageVisible && renderUpdatePluginSettingsMessage()}

        {/* <s.Button
            disabled={connectionTestResult?.result !== "success"}
            onClick={handleAutoApplyButtonClick}
          >
            Auto Apply
          </s.Button> */}
      </s.ContentContainer>
      <s.ButtonsContainer>
        <s.Button onClick={handleCancelButtonClick} buttonType={"secondary"}>
          Cancel
        </s.Button>
        <s.Button
          disabled={connectionTestResult?.result !== "success"}
          onClick={handleFinishButtonClick}
        >
          Finish
        </s.Button>
      </s.ButtonsContainer>
      <s.Link onClick={handleContactUsLinkClick}>
        Having Trouble? Contact us
      </s.Link>
    </s.Container>
  );
};
