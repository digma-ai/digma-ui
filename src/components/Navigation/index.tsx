import { useCallback, useEffect, useState } from "react";
import { dispatcher } from "../../dispatcher";
import { usePrevious } from "../../hooks/usePrevious";
// import { isNull } from "../../typeGuards/isNull";
// import { isUndefined } from "../../typeGuards/isUndefined";
import { FeatureFlag } from "../../types";
import { changeScope } from "../../utils/actions/changeScope";
import { sendUserActionTrackingEvent } from "../../utils/actions/sendUserActionTrackingEvent";
// import { AsyncActionResultData } from "../InstallationWizard/types";
// import { SCOPE_CHANGE_EVENTS } from "../Main/types";
import { NewPopover } from "../common/NewPopover";
import { ThreeDotsVerticalIcon } from "../common/icons/ThreeDotsVerticalIcon";
// import { Tooltip } from "../common/v3/Tooltip";
// import { CodeButton } from "./CodeButton";
// import { CodeButtonMenu } from "./CodeButtonMenu";
import useDimensions from "react-cool-dimensions";
import { useLocation } from "react-router";
import { getFeatureFlagValue } from "../../featureFlags";
import { useGetSpanInfoQuery } from "../../redux/services/digma";
import type { Environment } from "../../redux/services/types";
import { useConfigSelector } from "../../store/config/useConfigSelector";
import { useHistory } from "../Main/useHistory";
import { EnvironmentBar } from "./EnvironmentBar";
import { HistoryNavigation } from "./HistoryNavigation";
import { KebabMenu } from "./KebabMenu";
import { ScopeBar } from "./ScopeBar";
import { SpanInfo } from "./SpanInfo";
import { Tabs } from "./Tabs";
import { TAB_IDS } from "./Tabs/types";
import { actions } from "./actions";
import { IconButton } from "./common/IconButton";
import { isDisplayNameTooLong } from "./isDisplayNameTooLong";
import * as s from "./styles";
import { trackingEvents } from "./tracking";
import type {
  // AddAnnotationPayload,
  // AutoFixMissingDependencyPayload,
  CodeContext
} from "./types";

// const hasData = (codeContext?: CodeContext): boolean =>
//   Boolean(
//     codeContext &&
//       [null, true].includes(codeContext.isInstrumented) &&
//       codeContext.spans.assets.length > 0
//   );

// const hasObservability = (codeContext?: CodeContext): boolean =>
//   Boolean(codeContext && [null, true].includes(codeContext.isInstrumented));

// const isAlreadyAtScope = (
//   codeContext: CodeContext | undefined,
//   scope: Scope | null
// ): boolean => {
//   if (!codeContext || !scope?.span) {
//     return false;
//   }

//   return codeContext.spans.assets
//     .map((x) => x.spanCodeObjectId)
//     .includes(scope.span.spanCodeObjectId);
// };

// const getCodeButtonTooltip = (
//   codeContext: CodeContext | undefined,
//   scope: Scope | null
// ): string => {
//   if (isUndefined(codeContext) || codeContext.methodId === null) {
//     return "No code selected";
//   }

//   if (codeContext.isInstrumented === false) {
//     return "Observe this code";
//   } else {
//     if (codeContext.spans.assets.length === 0) {
//       return "Not yet reached. Trigger actions to observe this code";
//     } else {
//       if (isAlreadyAtScope(codeContext, scope)) {
//         return "Showing asset runtime data";
//       }

//       return "Runtime data available for this code. Click to view";
//     }
//   }
// };

export const Navigation = () => {
  const {
    environments,
    environment,
    scope,
    userInfo,
    backendInfo,
    selectedServices
  } = useConfigSelector();
  const [selectedEnvironment, setSelectedEnvironment] = useState(environment);
  const [codeContext, setCodeContext] = useState<CodeContext>();
  // const [isCodeButtonMenuOpen, setIsCodeButtonMenuOpen] = useState(false);
  const [isKebabButtonMenuOpen, setIsKebabButtonMenuOpen] = useState(false);
  // const [isAutoFixing, setIsAutoFixing] = useState(false);
  // const [isAnnotationAdding, setIsAnnotationAdding] = useState(false);
  // const previousCodeContext = usePrevious(codeContext);
  const previousEnvironment = usePrevious(environment);
  const [isSpanInfoVisible, setIsSpanInfoVisible] = useState(false);
  const location = useLocation();
  const { goTo } = useHistory();

  const { data: spanInfo } = useGetSpanInfoQuery(
    {
      spanCodeObjectId: scope?.span?.spanCodeObjectId ?? ""
    },
    {
      skip: !scope?.span?.spanCodeObjectId
    }
  );

  const previousSpanInfo = usePrevious(spanInfo);

  const isAtSpan = Boolean(scope?.span);

  const { observe, width: containerWidth } = useDimensions();

  // const codeButtonTooltip = getCodeButtonTooltip(codeContext, config.scope);
  // const isCodeButtonEnabled = codeContext && !isNull(codeContext.methodId);
  // const isCodeButtonMenuEnabled =
  //   codeContext && codeContext.spans.assets.length !== 1;

  const isSpanInfoEnabled = Boolean(
    getFeatureFlagValue(backendInfo, FeatureFlag.IsHighlightsSpanInfoEnabled)
  );

  useEffect(() => {
    const handleCodeContextData = (data: unknown) => {
      const payload = data as CodeContext;
      setCodeContext(payload);
    };

    // const handleAutoFixResult = (data: unknown) => {
    //   const payload = data as AsyncActionResultData;
    //   if (payload.result === "failure") {
    //     setIsAutoFixing(false);
    //   }
    // };

    // const handleAddAnnotationResult = (data: unknown) => {
    //   const payload = data as AsyncActionResultData;
    //   if (payload.result === "failure") {
    //     setIsAnnotationAdding(false);
    //   }
    // };

    dispatcher.addActionListener(
      actions.SET_CODE_CONTEXT,
      handleCodeContextData
    );
    // dispatcher.addActionListener(
    //   actions.SET_AUTOFIX_MISSING_DEPENDENCY_RESULT,
    //   handleAutoFixResult
    // );
    // dispatcher.addActionListener(
    //   actions.SET_ADD_ANNOTATION_RESULT,
    //   handleAddAnnotationResult
    // );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_CODE_CONTEXT,
        handleCodeContextData
      );
    };
  }, [userInfo?.id]);

  useEffect(() => {
    if (environment?.id !== previousEnvironment?.id) {
      setSelectedEnvironment(environment);
    }
  }, [environment, previousEnvironment?.id]);

  const handleEnvironmentChange = useCallback(
    (environment: Environment) => {
      sendUserActionTrackingEvent(trackingEvents.ENVIRONMENT_SELECTED);

      changeScope({
        span: scope?.span
          ? {
              spanCodeObjectId: scope.span.spanCodeObjectId
            }
          : null,
        environmentId: environment.id
      });
    },
    [scope]
  );

  useEffect(() => {
    if (
      environments &&
      environments.length > 0 &&
      (!environment || !environments.find((x) => x.id === environment.id))
    ) {
      changeScope({
        span: scope?.span
          ? {
              spanCodeObjectId: scope.span.spanCodeObjectId
            }
          : null,
        environmentId: environments[0].id
      });
    }

    if (environments && environments.length === 0) {
      setSelectedEnvironment(null);
    }
  }, [environments, environment, scope]);

  useEffect(() => {
    if (
      previousSpanInfo?.displayName !== spanInfo?.displayName &&
      spanInfo?.displayName
    ) {
      const isSpanInfoVisible = isDisplayNameTooLong(
        spanInfo.displayName,
        containerWidth
      );
      setIsSpanInfoVisible(isSpanInfoVisible);
    }
  }, [spanInfo, previousSpanInfo, containerWidth]);

  // useEffect(() => {
  //   setIsAutoFixing(false);
  //   setIsAnnotationAdding(false);
  //   setIsCodeButtonMenuOpen(false);
  // }, [codeContext?.methodId]);

  // useEffect(() => {
  //   if (
  //     previousCodeContext?.methodId === codeContext?.methodId &&
  //     previousCodeContext?.hasMissingDependency &&
  //     !codeContext?.hasMissingDependency
  //   ) {
  //     setIsAutoFixing(false);
  //   }

  //   if (
  //     previousCodeContext?.methodId === codeContext?.methodId &&
  //     !previousCodeContext?.isInstrumented &&
  //     codeContext?.isInstrumented
  //   ) {
  //     setIsAnnotationAdding(false);
  //   }
  // }, [codeContext, previousCodeContext]);

  const handleScopeDisplayNameExpandCollapseChange = (isExpanded: boolean) => {
    setIsSpanInfoVisible(isExpanded);
  };

  const handleSpanInfoCollapse = () => {
    setIsSpanInfoVisible(false);
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

  // const handleCodeMenuButtonOpenChange = (isOpen: boolean) => {
  //   if (isOpen) {
  //     sendUserActionTrackingEvent(trackingEvents.CODE_BUTTON_CLICKED);
  //   }
  //   setIsCodeButtonMenuOpen(isOpen);
  // };

  // const handleCodeButtonClick = () => {
  //   sendUserActionTrackingEvent(trackingEvents.CODE_BUTTON_CLICKED);
  //   if (codeContext && codeContext.spans.assets.length === 1) {
  //     const { spanCodeObjectId } = codeContext.spans.assets[0];
  //     changeScope({
  //       span: {
  //         spanCodeObjectId
  //       },
  //       context: {
  //         event: SCOPE_CHANGE_EVENTS.NAVIGATION_CODE_BUTTON_CLICKED
  //       }
  //     });
  //   }
  // };

  // const handleCodeButtonMouseEnter = () => {
  //   if (codeContext?.methodId) {
  //     window.sendMessageToDigma<HighlightMethodInEditorPayload>({
  //       action: actions.HIGHLIGHT_METHOD_IN_EDITOR,
  //       payload: {
  //         methodId: codeContext.methodId
  //       }
  //     });
  //   }
  // };

  // const handleCodeButtonMouseLeave = () => {
  //   window.sendMessageToDigma({
  //     action: actions.CLEAR_HIGHLIGHTS_IN_EDITOR
  //   });
  // };

  // const handleObservabilityAdd = (methodId: string) => {
  //   window.sendMessageToDigma<AddAnnotationPayload>({
  //     action: actions.ADD_ANNOTATION,
  //     payload: {
  //       methodId
  //     }
  //   });
  //   setIsAnnotationAdding(true);
  // };

  // const handleAutoFix = (methodId: string) => {
  //   window.sendMessageToDigma<AutoFixMissingDependencyPayload>({
  //     action: actions.AUTOFIX_MISSING_DEPENDENCY,
  //     payload: {
  //       methodId
  //     }
  //   });
  //   setIsAutoFixing(true);
  // };

  // const handleScopeChange = (spanCodeObjectId: string) => {
  //   changeScope({
  //     span: {
  //       spanCodeObjectId
  //     },
  //     context: {
  //       event: SCOPE_CHANGE_EVENTS.NAVIGATION_CODE_BUTTON_MENU_ITEM_SELECTED
  //     }
  //   });

  //   setIsCodeButtonMenuOpen(false);
  // };

  const handleKebabButtonMenuClose = () => {
    setIsKebabButtonMenuOpen(false);
  };

  const handleTabSelect = (tabId: string) => {
    goTo(`/${tabId}`);
  };

  const selectedTabId =
    Object.values(TAB_IDS).find((value) =>
      location.pathname.startsWith(`/${value}`)
    ) ?? TAB_IDS.ISSUES;

  // const handleCodeButtonMenuClose = () => {
  //   setIsCodeButtonMenuOpen(false);
  // };

  if (!userInfo?.id && backendInfo?.centralize) {
    return <s.Background />;
  }

  return (
    <s.Container $isActive={isAtSpan} ref={observe}>
      <s.Row>
        <HistoryNavigation />
        {isAtSpan ? (
          <ScopeBar
            codeContext={codeContext}
            scope={scope}
            isExpanded={isSpanInfoVisible}
            onExpandCollapseChange={handleScopeDisplayNameExpandCollapseChange}
            isSpanInfoEnabled={isSpanInfoEnabled}
            linkedEndpoints={
              spanInfo?.linkedEndpoints?.filter(
                (x) => x.environment === environment?.id
              ) ?? []
            }
          />
        ) : (
          <EnvironmentBar
            selectedEnvironment={selectedEnvironment}
            onEnvironmentChange={handleEnvironmentChange}
            environments={environments ?? []}
          />
        )}
        <NewPopover
          content={<KebabMenu onClose={handleKebabButtonMenuClose} />}
          onOpenChange={handleKebabMenuOpenChange}
          isOpen={isKebabButtonMenuOpen}
          placement={"bottom-end"}
        >
          <IconButton
            isHighlighted={isAtSpan}
            icon={<ThreeDotsVerticalIcon size={16} color={"currentColor"} />}
            onClick={handleKebabButtonClick}
          />
        </NewPopover>
      </s.Row>
      {isAtSpan && isSpanInfoEnabled && spanInfo && isSpanInfoVisible && (
        <SpanInfo
          data={spanInfo}
          onCollapse={handleSpanInfoCollapse}
          spanCodeObjectId={scope?.span?.spanCodeObjectId}
        />
      )}
      {/* <s.Row>
        <Tooltip
          title={codeButtonTooltip}
          isOpen={isCodeButtonMenuOpen ? false : undefined}
          placement={"bottom-start"}
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
                        onScopeChange={handleScopeChange}
                        onClose={handleCodeButtonMenuClose}
                      />
                    )}
                  </>
                }
                onOpenChange={handleCodeMenuButtonOpenChange}
                isOpen={isCodeButtonMenuOpen}
                placement={"bottom-start"}
              >
                <CodeButton
                  hasData={hasData(codeContext)}
                  hasObservability={hasObservability(codeContext)}
                  isDisabled={!isCodeButtonEnabled}
                  onClick={handleCodeButtonClick}
                  isAlreadyAtScope={isAlreadyAtScope(codeContext, scope)}
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
              isAlreadyAtScope={isAlreadyAtScope(codeContext, scope)}
              hasErrors={false}
              onMouseEnter={handleCodeButtonMouseEnter}
              onMouseLeave={handleCodeButtonMouseLeave}
            />
          )}
        </Tooltip>
      </s.Row> */}
      <s.TabsContainer>
        <Tabs
          onTabSelect={handleTabSelect}
          selectedTabId={selectedTabId}
          spanCodeObjectId={scope?.span?.spanCodeObjectId}
          environmentId={environment?.id}
          unreadInsightsCount={scope?.unreadInsightsCount}
          hasErrors={scope?.hasErrors}
          services={selectedServices ?? undefined}
        />
      </s.TabsContainer>
    </s.Container>
  );
};
