import { useContext } from "react";
import { INSTRUMENTATION_DOCUMENTATION_URL } from "../../../constants";
import { getFeatureFlagValue } from "../../../featureFlags";
import type { EnvironmentType } from "../../../redux/services/types";
import { isString } from "../../../typeGuards/isString";
import { FeatureFlag } from "../../../types";
import { openURLInDefaultBrowser } from "../../../utils/actions/openURLInDefaultBrowser";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { ConfigContext } from "../../common/App/ConfigContext";
import type { ConfigContextData } from "../../common/App/types";
import { CheckmarkIcon } from "../../common/icons/12px/CheckmarkIcon";
import { InfinityIcon } from "../../common/icons/32px/InfinityIcon";
import { Link } from "../../common/v3/Link";
import { Tooltip } from "../../common/v3/Tooltip";
import { actions } from "../actions";
import { trackingEvents } from "../tracking";
import { EnvironmentVariableCode } from "./EnvironmentVariableCode";
import * as s from "./styles";
import type { EnvironmentInstructionsPanelProps } from "./types";
import { useAddToRunConfig } from "./useAddToRunConfig";

const getIsActiveRunConfigSet = (
  config: ConfigContextData,
  environmentId: string,
  environmentName: string,
  environmentType: EnvironmentType | null
) => {
  if (!config.runConfig) {
    return false;
  }

  const isCentralizedDeployment = config.backendInfo?.centralize;
  const areNewInstrumentationAttributesEnabled = Boolean(
    getFeatureFlagValue(
      config.backendInfo,
      FeatureFlag.AreNewInstrumentationAttributesEnabled
    )
  );

  if (areNewInstrumentationAttributesEnabled) {
    if (isCentralizedDeployment) {
      return (
        config.runConfig.environmentName === environmentName &&
        isString(environmentType) &&
        config.runConfig.environmentType === environmentType &&
        isString(config.userInfo?.id) &&
        config.runConfig.userId === config.userInfo?.id
      );
    } else {
      return config.runConfig.environmentName === environmentName;
    }
  }

  return config.runConfig.environmentId === environmentId;
};

export const EnvironmentInstructionsPanel = ({
  environment,
  onClose
}: EnvironmentInstructionsPanelProps) => {
  const config = useContext(ConfigContext);
  const { addToRunConfig } = useAddToRunConfig(environment.id);

  const handleOpenDocsButtonClick = () => {
    openURLInDefaultBrowser(INSTRUMENTATION_DOCUMENTATION_URL);
  };

  const handleSetActiveRunConfigButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.SET_ACTIVE_RUN_CONFIG_BUTTON_CLICKED
    );
    addToRunConfig();
  };

  const handleRemoveLinkClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.REMOVE_FROM_RUN_CONFIG_LINK_CLICKED
    );
    window.sendMessageToDigma({
      action: actions.CLEAR_RUN_CONFIG
    });
  };

  const handleCloseButtonClick = () => {
    if (onClose) {
      onClose();
    }
  };

  const renderContent = () => {
    const { id, name, type } = environment;

    if (type === "Private") {
      const isActiveRunConfigSet = getIsActiveRunConfigSet(
        config,
        id,
        name,
        type
      );

      const isRunConfigSupported = Boolean(
        config.runConfig?.isRunConfigurationSupported
      );

      return (
        <>
          <s.Card>
            <s.CardHeader>
              <s.CardTitleContainer>
                <s.CardTitle>Running Locally?</s.CardTitle>
                Setup automatically or use the env variable below
              </s.CardTitleContainer>
              {isActiveRunConfigSet ? (
                <s.CardButtons>
                  <s.RunConfigSetMessage>
                    <s.RunConfigSetMessageIconContainer>
                      <CheckmarkIcon color={"currentColor"} />
                    </s.RunConfigSetMessageIconContainer>
                    Run config set
                  </s.RunConfigSetMessage>
                  <Link onClick={handleRemoveLinkClick}>Remove</Link>
                </s.CardButtons>
              ) : (
                <Tooltip
                  title={
                    "Automatic run config modification is not supported for this configuration type"
                  }
                  isDisabled={isRunConfigSupported}
                >
                  <s.ActionButton
                    label={"Set active run config"}
                    onClick={handleSetActiveRunConfigButtonClick}
                    isDisabled={!isRunConfigSupported}
                  />
                </Tooltip>
              )}
            </s.CardHeader>
            <s.CardContent>
              <s.MultiLineCodeSnippet text={<EnvironmentVariableCode />} />
            </s.CardContent>
          </s.Card>
          <s.CardDivider>OR</s.CardDivider>
          <s.Card>
            <s.CardHeader>
              <s.CardTitleContainer>
                <s.CardTitle>Running outside the IDE?</s.CardTitle>
                Use the following values referenced in the docs:
              </s.CardTitleContainer>
              <s.ActionButton
                label={"Open Docs"}
                onClick={handleOpenDocsButtonClick}
              />
            </s.CardHeader>
            <s.CardContent>
              <s.ColumnsContainer>
                <s.KeyValue>
                  <s.Label>ENV_NAME</s.Label>
                  <s.SingleLineCodeSnippet
                    text={<s.HighlightedCode>{name}</s.HighlightedCode>}
                  />
                </s.KeyValue>
                <s.KeyValue>
                  <s.Label>ENV_TYPE</s.Label>
                  <s.SingleLineCodeSnippet
                    text={<s.HighlightedCode>{type}</s.HighlightedCode>}
                  />
                </s.KeyValue>
                <s.KeyValue>
                  <s.Label>USER_ID</s.Label>
                  <s.SingleLineCodeSnippet
                    text={
                      <s.HighlightedCode>
                        {config.userInfo?.id ?? ""}
                      </s.HighlightedCode>
                    }
                  />
                </s.KeyValue>
              </s.ColumnsContainer>
            </s.CardContent>
          </s.Card>
        </>
      );
    }

    if (type === "Public") {
      return (
        <>
          <s.Card>
            <s.CardHeader>
              <s.CardTitleContainer>
                <s.CardTitle>Connect your App to this environment</s.CardTitle>
                Use the following values referenced in the docs:
              </s.CardTitleContainer>
              <s.ActionButton
                label={"Open Docs"}
                onClick={handleOpenDocsButtonClick}
              />
            </s.CardHeader>
            <s.CardContent>
              <s.ColumnsContainer>
                <s.KeyValue>
                  <s.Label>ENV_NAME</s.Label>
                  <s.SingleLineCodeSnippet
                    text={<s.HighlightedCode>{name}</s.HighlightedCode>}
                  />
                </s.KeyValue>
                <s.KeyValue>
                  <s.Label>ENV_TYPE</s.Label>
                  <s.SingleLineCodeSnippet
                    text={<s.HighlightedCode>{type}</s.HighlightedCode>}
                  />
                </s.KeyValue>
              </s.ColumnsContainer>
            </s.CardContent>
          </s.Card>
          <s.Card>
            <s.PublicEnvironmentConnectCardContent>
              <s.PublicEnvironmentIconBackground>
                <InfinityIcon size={32} color={"currentColor"} />
              </s.PublicEnvironmentIconBackground>
              <s.PublicEnvironmentTextContainer>
                <s.PublicEnvironmentTitle>
                  Connect your app environment
                </s.PublicEnvironmentTitle>
                Use these instructions to connect Digma with environments such
                as Prod/CI or Staging
              </s.PublicEnvironmentTextContainer>
            </s.PublicEnvironmentConnectCardContent>
          </s.Card>
        </>
      );
    }

    return null;
  };

  return (
    <s.Container>
      {onClose && (
        <s.Header>
          How to setup your Environment
          <s.CloseButton
            onClick={handleCloseButtonClick}
            buttonType={"secondary"}
            label={"Close"}
          />
        </s.Header>
      )}
      <s.ContentContainer>{renderContent()}</s.ContentContainer>
    </s.Container>
  );
};
