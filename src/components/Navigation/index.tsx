import { useContext, useEffect, useState } from "react";
import { actions as globalActions } from "../../actions";
import { dispatcher } from "../../dispatcher";
import { usePrevious } from "../../hooks/usePrevious";
import { isNull } from "../../typeGuards/isNull";
import {
  ChangeEnvironmentPayload,
  ChangeScopePayload,
  ChangeViewPayload
} from "../../types";
import { sendUserActionTrackingEvent } from "../../utils/actions/sendUserActionTrackingEvent";
import { AsyncActionResultData } from "../InstallationWizard/types";
import { ConfigContext } from "../common/App/ConfigContext";
import { Environment, Scope } from "../common/App/types";
import { EnvironmentIcon } from "../common/EnvironmentIcon";
import { NewPopover } from "../common/NewPopover";
import { FourSquaresIcon } from "../common/icons/FourSquaresIcon";
import { ThreeDotsIcon } from "../common/icons/ThreeDotsIcon";
import { Tooltip } from "../common/v3/Tooltip";
import { CodeButton } from "./CodeButton";
import { CodeButtonMenu } from "./CodeButtonMenu";
import { EnvironmentBar } from "./EnvironmentBar";
import { KebabMenu } from "./KebabMenu";
import { ScopeBar } from "./ScopeBar";
import { ScopeNavigation } from "./ScopeNavigation";
import { Tabs } from "./Tabs";
import { actions } from "./actions";
import { IconButton } from "./common/IconButton";
import { MenuList } from "./common/MenuList";
import { Popup } from "./common/Popup";
import * as s from "./styles";
import { trackingEvents } from "./tracking";
import {
  AddAnnotationPayload,
  AutoFixMissingDependencyPayload,
  CodeContext,
  HighlightMethodInEditorPayload,
  OpenDashboardPayload,
  SetViewsPayload,
  TabData
} from "./types";

const hasData = (codeContext?: CodeContext): boolean =>
  Boolean(
    codeContext &&
      [null, true].includes(codeContext.isInstrumented) &&
      codeContext.spans.assets.length > 0
  );

const hasObservability = (codeContext?: CodeContext): boolean =>
  Boolean(codeContext && [null, true].includes(codeContext.isInstrumented));

const isAlreadyAtScope = (
  codeContext?: CodeContext,
  scope?: Scope
): boolean => {
  if (!codeContext || !scope?.span) {
    return false;
  }

  return codeContext.spans.assets
    .map((x) => x.spanCodeObjectId)
    .includes(scope.span.spanCodeObjectId);
};

const getCodeButtonTooltip = (
  codeContext?: CodeContext,
  scope?: Scope
): string => {
  if (!codeContext || codeContext.methodId === null) {
    return "No code selected";
  }

  if (codeContext.isInstrumented === false) {
    return "Observe this code";
  } else {
    if (codeContext.spans.assets.length === 0) {
      return "Not yet reached. Trigger actions to observe this code";
    } else {
      if (isAlreadyAtScope(codeContext, scope)) {
        return "Showing asset runtime data";
      }

      return "Runtime data available for this code. Click to view";
    }
  }
};

export const Navigation = () => {
  const [tabs, setTabs] = useState<TabData[]>();
  const config = useContext(ConfigContext);
  const [selectedEnvironment, setSelectedEnvironment] = useState(
    config.environment
  );
  const [codeContext, setCodeContext] = useState<CodeContext>();
  const [isEnvironmentMenuOpen, setIsEnvironmentMenuOpen] = useState(false);
  const [isCodeButtonMenuOpen, setIsCodeButtonMenuOpen] = useState(false);
  const [isKebabButtonMenuOpen, setIsKebabButtonMenuOpen] = useState(false);
  const [isAutoFixing, setIsAutoFixing] = useState(false);
  const [isAnnotationAdding, setIsAnnotationAdding] = useState(false);
  const previousCodeContext = usePrevious(codeContext);
  const [currentTab, setCurrentTab] = useState<string>();

  const environments = config.environments || [];

  const codeButtonTooltip = getCodeButtonTooltip(codeContext, config.scope);
  const isCodeButtonEnabled = codeContext && !isNull(codeContext.methodId);
  const isCodeButtonMenuEnabled =
    codeContext && codeContext.spans.assets.length !== 1;

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });

    const handleViewData = (data: unknown) => {
      const payload = data as SetViewsPayload;
      setTabs(payload.views);

      const selected = payload.views.find((x) => x.isSelected);
      selected && setCurrentTab(selected.id);
    };

    const handleCodeContextData = (data: unknown) => {
      const payload = data as CodeContext;
      setCodeContext(payload);
    };

    const handleAutoFixResult = (data: unknown) => {
      const payload = data as AsyncActionResultData;
      if (payload.result === "failure") {
        setIsAutoFixing(false);
      }
    };

    const handleAddAnnotationResult = (data: unknown) => {
      const payload = data as AsyncActionResultData;
      if (payload.result === "failure") {
        setIsAnnotationAdding(false);
      }
    };

    dispatcher.addActionListener(actions.SET_VIEWS, handleViewData);
    dispatcher.addActionListener(
      actions.SET_CODE_CONTEXT,
      handleCodeContextData
    );
    dispatcher.addActionListener(
      actions.SET_AUTOFIX_MISSING_DEPENDENCY_RESULT,
      handleAutoFixResult
    );
    dispatcher.addActionListener(
      actions.SET_ADD_ANNOTATION_RESULT,
      handleAddAnnotationResult
    );

    return () => {
      dispatcher.removeActionListener(actions.SET_VIEWS, handleViewData);
      dispatcher.removeActionListener(
        actions.SET_CODE_CONTEXT,
        handleCodeContextData
      );
    };
  }, []);

  useEffect(() => {
    setSelectedEnvironment(config.environment);
  }, [config.environment]);

  useEffect(() => {
    if (
      config.environments &&
      config.environments.length > 0 &&
      (!config.environment ||
        !config.environments.find((x) => x.id == config.environment?.id))
    ) {
      handleEnvironmentChange(config.environments[0]);
    }

    if (config.environments && config.environments.length === 0) {
      setSelectedEnvironment(undefined);
    }
  }, [config.environments, config.environment]);

  useEffect(() => {
    setIsAutoFixing(false);
    setIsAnnotationAdding(false);
    setIsCodeButtonMenuOpen(false);
  }, [codeContext?.methodId]);

  useEffect(() => {
    if (
      previousCodeContext?.methodId === codeContext?.methodId &&
      previousCodeContext?.hasMissingDependency &&
      !codeContext?.hasMissingDependency
    ) {
      setIsAutoFixing(false);
    }

    if (
      previousCodeContext?.methodId === codeContext?.methodId &&
      !previousCodeContext?.isInstrumented &&
      codeContext?.isInstrumented
    ) {
      setIsAnnotationAdding(false);
    }
  }, [codeContext, previousCodeContext]);

  const handleDashboardButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.DASHBOARD_BUTTON_CLICKED);
    window.sendMessageToDigma<OpenDashboardPayload>({
      action: globalActions.OPEN_DASHBOARD,
      payload: {
        environment: selectedEnvironment?.id
      }
    });
  };

  const handleKebabMenuOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      sendUserActionTrackingEvent(trackingEvents.KEBAB_MENU_BUTTON_CLICKED);
    }
    setIsKebabButtonMenuOpen(isOpen);
  };

  const handleKebabButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.KEBAB_MENU_BUTTON_CLICKED);
  };

  const handleCodeMenuButtonOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      sendUserActionTrackingEvent(trackingEvents.CODE_BUTTON_CLICKED);
    }
    setIsCodeButtonMenuOpen(isOpen);
  };

  const handleCodeButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.CODE_BUTTON_CLICKED);
    if (codeContext && codeContext.spans.assets.length === 1) {
      const { spanCodeObjectId } = codeContext.spans.assets[0];
      changeScope(spanCodeObjectId);
    }
  };

  const handleCodeButtonMouseEnter = () => {
    if (codeContext && codeContext.methodId) {
      window.sendMessageToDigma<HighlightMethodInEditorPayload>({
        action: actions.HIGHLIGHT_METHOD_IN_EDITOR,
        payload: {
          methodId: codeContext.methodId
        }
      });
    }
  };

  const handleCodeButtonMouseLeave = () => {
    window.sendMessageToDigma({
      action: actions.CLEAR_HIGHLIGHTS_IN_EDITOR
    });
  };

  const handleEnvironmentChange = (environment: Environment) => {
    sendUserActionTrackingEvent(trackingEvents.ENVIRONMENT_SELECTED);
    setIsEnvironmentMenuOpen(false);

    const environmentToChange = environments.find(
      (x) => x.id === environment.id
    );

    if (!environmentToChange) {
      return;
    }

    window.sendMessageToDigma<ChangeEnvironmentPayload>({
      action: globalActions.CHANGE_ENVIRONMENT,
      payload: {
        environment: environmentToChange.id
      }
    });

    setSelectedEnvironment(environment);
  };

  const changeTab = (tabId: string) => {
    setCurrentTab(tabId);
    window.sendMessageToDigma<ChangeViewPayload>({
      action: globalActions.CHANGE_VIEW,
      payload: {
        view: tabId
      }
    });
  };

  const handleObservabilityAdd = (methodId: string) => {
    window.sendMessageToDigma<AddAnnotationPayload>({
      action: actions.ADD_ANNOTATION,
      payload: {
        methodId
      }
    });
    setIsAnnotationAdding(true);
  };

  const handleAutoFix = (methodId: string) => {
    window.sendMessageToDigma<AutoFixMissingDependencyPayload>({
      action: actions.AUTOFIX_MISSING_DEPENDENCY,
      payload: {
        methodId
      }
    });
    setIsAutoFixing(true);
  };

  const changeScope = (spanCodeObjectId: string) => {
    window.sendMessageToDigma<ChangeScopePayload>({
      action: globalActions.CHANGE_SCOPE,
      payload: {
        span: {
          spanCodeObjectId
        }
      }
    });
    setIsCodeButtonMenuOpen(false);
  };

  const handleKebabButtonMenuClose = () => {
    setIsKebabButtonMenuOpen(false);
  };

  const handleCodeButtonMenuClose = () => {
    setIsCodeButtonMenuOpen(false);
  };

  const renderEnvironmentMenu = () => {
    const handleOverlayClick = () => {
      setIsEnvironmentMenuOpen(false);
    };

    return (
      <s.Overlay onClick={handleOverlayClick}>
        <s.EnvironmentMenuContainer>
          <Popup height={"78px"}>
            <MenuList
              items={environments.map((x) => ({
                id: x.id,
                label: x.name,
                onClick: () => handleEnvironmentChange(x),
                icon: <EnvironmentIcon environment={x} />
              }))}
            />
          </Popup>
        </s.EnvironmentMenuContainer>
      </s.Overlay>
    );
  };

  const handleEnvironmentBarClick = () => {
    setIsEnvironmentMenuOpen(!isEnvironmentMenuOpen);
  };

  return (
    <s.Container>
      <s.Row>
        <ScopeNavigation currentTabId={currentTab || ""} />
        <ScopeBar codeContext={codeContext} scope={config.scope} />
        <NewPopover
          content={<KebabMenu onClose={handleKebabButtonMenuClose} />}
          onOpenChange={handleKebabMenuOpenChange}
          isOpen={isKebabButtonMenuOpen}
          placement={"left-start"}
        >
          <IconButton
            icon={<ThreeDotsIcon size={16} color={"currentColor"} />}
            onClick={handleKebabButtonClick}
          />
        </NewPopover>
      </s.Row>
      <s.Row>
        <Tooltip
          title={codeButtonTooltip}
          isOpen={isCodeButtonMenuOpen ? false : undefined}
          placement={"right"}
        >
          {isCodeButtonMenuEnabled ? (
            <div>
              <NewPopover
                content={
                  <>
                    {codeContext && (
                      <CodeButtonMenu
                        codeContext={codeContext}
                        isAutoFixing={isAutoFixing}
                        isAnnotationAdding={isAnnotationAdding}
                        onAutoFix={handleAutoFix}
                        onObservabilityAdd={handleObservabilityAdd}
                        onScopeChange={changeScope}
                        onClose={handleCodeButtonMenuClose}
                      />
                    )}
                  </>
                }
                onOpenChange={handleCodeMenuButtonOpenChange}
                isOpen={isCodeButtonMenuOpen}
                placement={"right"}
              >
                <CodeButton
                  hasData={hasData(codeContext)}
                  hasObservability={hasObservability(codeContext)}
                  isDisabled={!isCodeButtonEnabled}
                  onClick={handleCodeButtonClick}
                  isAlreadyAtScope={isAlreadyAtScope(codeContext, config.scope)}
                  hasErrors={false}
                  onMouseEnter={handleCodeButtonMouseEnter}
                  onMouseLeave={handleCodeButtonMouseLeave}
                />
              </NewPopover>
            </div>
          ) : (
            <CodeButton
              hasData={hasData(codeContext)}
              hasObservability={hasObservability(codeContext)}
              isDisabled={!isCodeButtonEnabled}
              onClick={handleCodeButtonClick}
              isAlreadyAtScope={isAlreadyAtScope(codeContext, config.scope)}
              hasErrors={false}
              onMouseEnter={handleCodeButtonMouseEnter}
              onMouseLeave={handleCodeButtonMouseLeave}
            />
          )}
        </Tooltip>
        <EnvironmentBar
          selectedEnvironment={selectedEnvironment}
          onClick={handleEnvironmentBarClick}
          isMenuOpen={isEnvironmentMenuOpen}
          isDisabled={environments.length === 0}
        />
        <Tooltip
          title={!selectedEnvironment ? "No environment selected" : "Dashboard"}
          placement={"top-end"}
        >
          <IconButton
            isDisabled={!selectedEnvironment}
            onClick={handleDashboardButtonClick}
            icon={<FourSquaresIcon size={16} color={"currentColor"} />}
          />
        </Tooltip>
      </s.Row>
      <s.TabsContainer>
        <Tabs tabs={tabs || []} onSelect={changeTab} />
      </s.TabsContainer>
      {isEnvironmentMenuOpen && renderEnvironmentMenu()}
    </s.Container>
  );
};
