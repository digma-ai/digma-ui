import { useContext, useEffect, useState } from "react";
import { actions as globalActions } from "../../actions";
import { dispatcher } from "../../dispatcher";
import { usePrevious } from "../../hooks/usePrevious";
import { isNull } from "../../typeGuards/isNull";
import { AsyncActionResultData } from "../InstallationWizard/types";
import { ConfigContext } from "../common/App/ConfigContext";
import { CodeDetails, Environment, Scope } from "../common/App/types";
import { EnvironmentIcon } from "../common/EnvironmentIcon";
import { NewPopover } from "../common/NewPopover";
import { Tooltip } from "../common/Tooltip";
import { CrosshairIcon } from "../common/icons/16px/CrosshairIcon";
import { HomeIcon } from "../common/icons/16px/HomeIcon";
import { FourSquaresIcon } from "../common/icons/FourSquaresIcon";
import { ThreeDotsIcon } from "../common/icons/ThreeDotsIcon";
import { CodeButton } from "./CodeButton";
import { CodeButtonMenu } from "./CodeButtonMenu";
import { EnvironmentBar } from "./EnvironmentBar";
import { IconButton } from "./IconButton";
import { KebabMenu } from "./KebabMenu";
import { MenuList } from "./MenuList";
import { Popup } from "./Popup";
import { ScopeNavigation } from "./ScopeNavigation";
import { Tabs } from "./Tabs";
import { TargetButtonMenu } from "./TargetButtonMenu";
import { actions } from "./actions";
import * as s from "./styles";
import {
  AddAnnotationPayload,
  AutoFixMissingDependencyPayload,
  ChangeEnvironmentPayload,
  ChangeScopePayload,
  ChangeViewPayload,
  CodeContext,
  GoToCodeLocationPayload,
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

const isAlreadyAtCode = (codeContext?: CodeContext, scope?: Scope): boolean => {
  if (!codeContext || !scope?.span) {
    return false;
  }

  return Boolean(
    codeContext.methodId &&
      scope.span.methodId &&
      codeContext.methodId === scope.span.methodId
  );
};

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

const getTargetButtonTooltip = (
  codeContext?: CodeContext,
  scope?: Scope
): string => {
  if (!scope) {
    return "";
  }

  if (isAlreadyAtCode(codeContext, scope)) {
    return "Already at code";
  }

  if (
    [...scope.code.codeDetailsList, scope.code.relatedCodeDetailsList]
      .length === 0
  ) {
    return "Code not found";
  } else {
    return "Navigate to code";
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
  const [isTargetButtonMenuOpen, setIsTargetButtonMenuOpen] = useState(false);
  const [isKebabButtonMenuOpen, setIsKebabButtonMenuOpen] = useState(false);
  const [isAutoFixing, setIsAutoFixing] = useState(false);
  const [isAnnotationAdding, setIsAnnotationAdding] = useState(false);
  const previousCodeContext = usePrevious(codeContext);
  const [currentTab, setCurrentTab] = useState<string>();

  const environments = config.environments || [];

  const scopeDisplayName = config.scope
    ? config.scope.span
      ? config.scope.span.displayName
      : "Home"
    : "";

  const codeButtonTooltip = getCodeButtonTooltip(codeContext, config.scope);
  const isCodeButtonEnabled = codeContext && !isNull(codeContext?.methodId);

  const targetButtonTooltip = getTargetButtonTooltip(codeContext, config.scope);
  const isTargetButtonEnabled = Boolean(
    config.scope?.span &&
      [
        ...config.scope.code.codeDetailsList,
        ...config.scope.code.relatedCodeDetailsList
      ].length > 0 &&
      !isAlreadyAtCode(codeContext, config.scope)
  );

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
      !config.environment
    ) {
      setSelectedEnvironment(config.environments[0]);
    }

    if (config.environments && config.environments.length === 0) {
      setSelectedEnvironment(undefined);
    }
  }, [config.environments, config.environment]);

  useEffect(() => {
    setSelectedEnvironment(config.environment);
  }, [config.environment]);

  useEffect(() => {
    setIsAutoFixing(false);
    setIsAnnotationAdding(false);
    setIsCodeButtonMenuOpen(false);
  }, [codeContext?.methodId]);

  useEffect(() => {
    setIsTargetButtonMenuOpen(false);
  }, [config.scope]);

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
    window.sendMessageToDigma<OpenDashboardPayload>({
      action: globalActions.OPEN_DASHBOARD,
      payload: {
        environment: selectedEnvironment
      }
    });
  };

  const handleHomeButtonClick = () => {
    window.sendMessageToDigma<ChangeScopePayload>({
      action: actions.CHANGE_SCOPE,
      payload: {
        span: null
      }
    });
  };

  const handleTargetButtonClick = () => {
    if (config.scope && config.scope.code.codeDetailsList.length === 1) {
      handleGoToCodeLocation(config.scope.code.codeDetailsList[0]);
    }
  };

  const handleCodeButtonClick = () => {
    if (codeContext && codeContext.spans.assets.length === 1) {
      const { spanCodeObjectId } = codeContext.spans.assets[0];
      changeScope(spanCodeObjectId);
    }
  };

  const handleEnvironmentChange = (environment: Environment) => {
    setIsEnvironmentMenuOpen(false);

    const environmentToChange = environments.find(
      (x) => x.originalName === environment.originalName
    );

    if (!environmentToChange) {
      return;
    }

    window.sendMessageToDigma<ChangeEnvironmentPayload>({
      action: actions.CHANGE_ENVIRONMENT,
      payload: {
        environment: environmentToChange
      }
    });

    setSelectedEnvironment(environment);
  };

  const changeTab = (tabId: string) => {
    setCurrentTab(tabId);
    window.sendMessageToDigma<ChangeViewPayload>({
      action: actions.CHANGE_VIEW,
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
      action: actions.CHANGE_SCOPE,
      payload: {
        span: {
          spanCodeObjectId
        }
      }
    });
    setIsCodeButtonMenuOpen(false);
  };

  const handleGoToCodeLocation = (codeDetails: CodeDetails) => {
    window.sendMessageToDigma<GoToCodeLocationPayload>({
      action: actions.GO_TO_CODE_LOCATION,
      payload: {
        codeDetails
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
                id: x.originalName,
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
        <s.ScopeBar $isActive={Boolean(config.scope?.span)}>
          <s.ScopeBarButton
            disabled={isNull(config.scope?.span)}
            onClick={handleHomeButtonClick}
          >
            <HomeIcon color={"currentColor"} size={16} />
          </s.ScopeBarButton>
          <s.ScopeBarDivider />
          <s.ScopeName>{scopeDisplayName}</s.ScopeName>
          <s.ScopeBarDivider />
          <Tooltip
            title={targetButtonTooltip}
            isOpen={isTargetButtonMenuOpen ? false : undefined}
          >
            <s.ScopeBarButton
              disabled={!isTargetButtonEnabled}
              onClick={handleTargetButtonClick}
            >
              <CrosshairIcon color={"currentColor"} size={16} />
            </s.ScopeBarButton>
          </Tooltip>
          {config.scope && config.scope.code.codeDetailsList.length > 1 && (
            <NewPopover
              content={
                <Popup height={"78px"}>
                  {config.scope && (
                    <TargetButtonMenu
                      scope={config.scope}
                      onGoToCodeLocation={handleGoToCodeLocation}
                    />
                  )}
                </Popup>
              }
              onOpenChange={setIsTargetButtonMenuOpen}
              isOpen={isTargetButtonMenuOpen}
              placement={"bottom-end"}
            >
              <div>
                <Tooltip
                  title={targetButtonTooltip}
                  isOpen={isTargetButtonMenuOpen ? false : undefined}
                >
                  <s.ScopeBarButton
                    disabled={!isTargetButtonEnabled}
                    onClick={handleTargetButtonClick}
                  >
                    <CrosshairIcon color={"currentColor"} size={16} />
                  </s.ScopeBarButton>
                </Tooltip>
              </div>
            </NewPopover>
          )}
        </s.ScopeBar>
        <Tooltip
          title={codeButtonTooltip}
          isOpen={isCodeButtonMenuOpen ? false : undefined}
          placement={"bottom-end"}
        >
          {codeContext?.spans.assets.length === 1 ? (
            <CodeButton
              hasData={hasData(codeContext)}
              hasObservability={hasObservability(codeContext)}
              isDisabled={!isCodeButtonEnabled}
              onClick={handleCodeButtonClick}
              isAlreadyAtScope={isAlreadyAtScope(codeContext, config.scope)}
            />
          ) : (
            <div>
              <NewPopover
                content={
                  <Popup height={"78px"}>
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
                  </Popup>
                }
                onOpenChange={setIsCodeButtonMenuOpen}
                isOpen={isCodeButtonMenuOpen}
                placement={"left-start"}
              >
                <CodeButton
                  hasData={hasData(codeContext)}
                  hasObservability={hasObservability(codeContext)}
                  isDisabled={!isCodeButtonEnabled}
                  onClick={handleCodeButtonClick}
                  isAlreadyAtScope={isAlreadyAtScope(codeContext, config.scope)}
                />
              </NewPopover>
            </div>
          )}
        </Tooltip>
      </s.Row>
      <s.Row>
        <EnvironmentBar
          selectedEnvironment={selectedEnvironment}
          onClick={handleEnvironmentBarClick}
          isMenuOpen={isEnvironmentMenuOpen}
        />
        <Tooltip
          title={!selectedEnvironment ? "No environment selected" : "Dashboard"}
        >
          <IconButton
            isDisabled={!selectedEnvironment}
            onClick={handleDashboardButtonClick}
            icon={<FourSquaresIcon size={16} color={"currentColor"} />}
          />
        </Tooltip>
        <NewPopover
          content={<KebabMenu onClose={handleKebabButtonMenuClose} />}
          onOpenChange={setIsKebabButtonMenuOpen}
          isOpen={isKebabButtonMenuOpen}
          placement={"left"}
        >
          <IconButton
            icon={<ThreeDotsIcon size={16} color={"currentColor"} />}
          />
        </NewPopover>
      </s.Row>
      <s.TabsContainer>
        <Tabs tabs={tabs || []} onSelect={changeTab} />
      </s.TabsContainer>
      {isEnvironmentMenuOpen && renderEnvironmentMenu()}
    </s.Container>
  );
};
