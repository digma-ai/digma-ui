import { ChangeEvent, useContext, useEffect, useState } from "react";
import { actions as globalActions } from "../../actions";
import { SLACK_WORKSPACE_URL } from "../../constants";
import { dispatcher } from "../../dispatcher";
import { usePrevious } from "../../hooks/usePrevious";
import { isNull } from "../../typeGuards/isNull";
import { SetObservabilityPayload } from "../../types";
import { openURLInDefaultBrowser } from "../../utils/openURLInDefaultBrowser";
import { AsyncActionResultData } from "../InstallationWizard/types";
import { ConfigContext } from "../common/App/ConfigContext";
import { CodeDetails, Scope } from "../common/App/types";
import { Tooltip } from "../common/Tooltip";
import { HomeIcon } from "../common/icons/12px/HomeIcon";
import { TargetIcon } from "../common/icons/12px/TargetIcon";
import { FourSquaresIcon } from "../common/icons/FourSquaresIcon";
import { ThreeDotsIcon } from "../common/icons/ThreeDotsIcon";
import { CodeButton } from "./CodeButton";
import { CodeButtonMenu } from "./CodeButtonMenu";
import { IconButton } from "./IconButton";
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
  OpenDocumentationPayload,
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

const getCodeButtonTooltip = (codeContext?: CodeContext): string => {
  if (!codeContext || codeContext.methodId === null) {
    return "No data";
  }

  if (codeContext.isInstrumented === false) {
    return "No observability";
  }

  if ([null, true].includes(codeContext.isInstrumented)) {
    if (codeContext.spans.assets.length === 0) {
      return "No data";
    } else {
      return "Assets";
    }
  }

  return "";
};

const getTargetButtonTooltip = (scope?: Scope): string => {
  if (!scope) {
    return "";
  }

  if (scope.code.isAlreadyAtCode) {
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
  const [isCodeButtonMenuOpen, setIsCodeButtonMenuOpen] = useState(false);
  const [isTargetButtonMenuOpen, setIsTargetButtonMenuOpen] = useState(false);
  const [isKebabButtonMenuOpen, setIsKebabButtonMenuOpen] = useState(false);
  const [isAutoFixing, setIsAutoFixing] = useState(false);
  const [isAnnotationAdding, setIsAnnotationAdding] = useState(false);
  const previousCodeContext = usePrevious(codeContext);
  const [currentTab, setCurrentTab] = useState<string>();

  const environments = config.environments || [];

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

  const handleKebabMenuButtonClick = () => {
    setIsKebabButtonMenuOpen(!isKebabButtonMenuOpen);
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
    setIsCodeButtonMenuOpen(false);

    if (config.scope?.code.codeDetailsList.length === 1) {
      handleGoToCodeLocation(config.scope.code.codeDetailsList[0]);
    } else if (
      config.scope &&
      [
        ...config.scope.code.codeDetailsList,
        ...config.scope.code.relatedCodeDetailsList
      ].length > 1
    ) {
      setIsTargetButtonMenuOpen(!isTargetButtonMenuOpen);
    }
  };

  const handleCodeButtonClick = () => {
    if (codeContext?.spans.assets.length === 1) {
      const { spanCodeObjectId } = codeContext.spans.assets[0];
      changeScope(spanCodeObjectId);
    } else {
      setIsTargetButtonMenuOpen(false);
      setIsCodeButtonMenuOpen(!isCodeButtonMenuOpen);
    }
  };

  const handleEnvironmentChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const environment = environments.find(
      (x) => x.originalName === e.target.value
    );

    if (!environment) {
      return;
    }

    window.sendMessageToDigma<ChangeEnvironmentPayload>({
      action: actions.CHANGE_ENVIRONMENT,
      payload: {
        environment
      }
    });

    setSelectedEnvironment(environment);
  };

  const handleObservabilityChange = (e: ChangeEvent<HTMLInputElement>) => {
    window.sendMessageToDigma<SetObservabilityPayload>({
      action: globalActions.SET_OBSERVABILITY,
      payload: {
        isObservabilityEnabled: e.target.checked
      }
    });
  };

  const handleOnboardingClick = () => {
    window.sendMessageToDigma({
      action: globalActions.OPEN_INSTALLATION_WIZARD
    });
  };

  const handleTroubleshootingClick = () => {
    window.sendMessageToDigma({
      action: globalActions.OPEN_TROUBLESHOOTING_GUIDE
    });
  };

  const handleInsightsOverviewClick = () => {
    window.sendMessageToDigma<OpenDocumentationPayload>({
      action: globalActions.OPEN_DOCUMENTATION,
      payload: {
        page: "environment-types"
      }
    });
  };

  const handleSlackLinkClick = () => {
    openURLInDefaultBrowser(SLACK_WORKSPACE_URL);
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

  const codeButtonTooltip = getCodeButtonTooltip(codeContext);

  const targetButtonTooltip = getTargetButtonTooltip(config.scope);

  const isTargetButtonEnabled = Boolean(
    config.scope?.span &&
      [
        ...config.scope.code.codeDetailsList,
        ...config.scope.code.relatedCodeDetailsList
      ].length > 0 &&
      !config.scope.code.isAlreadyAtCode
  );

  const scopeDisplayName = config.scope
    ? config.scope.span
      ? config.scope.span.displayName
      : "Home"
    : "";

  return (
    <s.Container>
      <ScopeNavigation currentTabId={currentTab || ""} />
      <s.Row>
        <s.ScopeBar $isActive={Boolean(config.scope?.span)}>
          <s.ScopeBarButton
            disabled={isNull(config.scope?.span)}
            onClick={handleHomeButtonClick}
          >
            <HomeIcon />
          </s.ScopeBarButton>
          <s.ScopeBarDivider />

          <s.ScopeName>{scopeDisplayName}</s.ScopeName>
          <s.ScopeBarDivider />
          <Tooltip title={targetButtonTooltip}>
            <div>
              <s.ScopeBarButton
                disabled={!isTargetButtonEnabled}
                onClick={handleTargetButtonClick}
              >
                <TargetIcon />
              </s.ScopeBarButton>
            </div>
          </Tooltip>
        </s.ScopeBar>
        <Tooltip title={codeButtonTooltip}>
          <div>
            <CodeButton
              hasData={hasData(codeContext)}
              hasObservability={hasObservability(codeContext)}
              isDisabled={!codeContext || isNull(codeContext?.methodId)}
              onClick={handleCodeButtonClick}
            />
          </div>
        </Tooltip>
      </s.Row>
      <s.Row>
        {codeContext && isCodeButtonMenuOpen && (
          <CodeButtonMenu
            codeContext={codeContext}
            isAutoFixing={isAutoFixing}
            isAnnotationAdding={isAnnotationAdding}
            onAutoFix={handleAutoFix}
            onObservabilityAdd={handleObservabilityAdd}
            onScopeChange={changeScope}
          />
        )}
        {config.scope && isTargetButtonMenuOpen && (
          <TargetButtonMenu
            scope={config.scope}
            onGoToCodeLocation={handleGoToCodeLocation}
          />
        )}
      </s.Row>
      <s.Row>
        <s.EnvironmentSelect
          disabled={environments.length === 0}
          onChange={handleEnvironmentChange}
          value={selectedEnvironment?.originalName}
        >
          {environments.length > 0 ? (
            environments.map((x) => (
              <option key={x.originalName} value={x.originalName}>
                {x.name}
              </option>
            ))
          ) : (
            <option>No environments</option>
          )}
        </s.EnvironmentSelect>
        <Tooltip
          title={!selectedEnvironment ? "No environment selected" : "Dashboard"}
        >
          <div>
            <IconButton
              isDisabled={!selectedEnvironment}
              onClick={handleDashboardButtonClick}
              icon={<FourSquaresIcon size={16} color={"currentColor"} />}
            />
          </div>
        </Tooltip>
        <IconButton
          onClick={handleKebabMenuButtonClick}
          icon={<ThreeDotsIcon size={16} color={"currentColor"} />}
        />
      </s.Row>
      {isKebabButtonMenuOpen && (
        <s.Row>
          <input
            type={"checkbox"}
            id={"observability"}
            checked={config.isObservabilityEnabled}
            onChange={handleObservabilityChange}
          />
          <label htmlFor={"observability"}>Observability</label>
          <button onClick={handleOnboardingClick}>Onboarding Digma</button>
          <button onClick={handleTroubleshootingClick}>Troubleshooting</button>
          <button onClick={handleInsightsOverviewClick}>
            Insights overview
          </button>
          <button onClick={handleSlackLinkClick}>Digma channel</button>
        </s.Row>
      )}
      <s.TabsContainer>
        <Tabs tabs={tabs || []} onSelect={changeTab} />
      </s.TabsContainer>
    </s.Container>
  );
};
