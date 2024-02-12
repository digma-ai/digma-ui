import { ChangeEvent, useContext, useEffect, useState } from "react";
import { actions as globalActions } from "../../actions";
import { SLACK_WORKSPACE_URL } from "../../constants";
import { dispatcher } from "../../dispatcher";
import { openURLInDefaultBrowser } from "../../utils/openURLInDefaultBrowser";
import { ConfigContext } from "../common/App/ConfigContext";
import { actions } from "./actions";
import * as s from "./styles";
import { SetViewsPayload, TabData } from "./types";

export const Navigation = () => {
  const [tabs, setTabs] = useState<TabData[]>();
  const config = useContext(ConfigContext);
  const [selectedEnvironment, setSelectedEnvironment] = useState(
    config.environment
  );

  const environments = config.environments || [];
  const scope: { displayName: string; spanCodeObjectId: string } | null = null;

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });

    const handleViewData = (data: unknown) => {
      const payload = data as SetViewsPayload;
      setTabs(payload.views);
    };

    dispatcher.addActionListener(actions.SET_VIEWS, handleViewData);

    return () => {
      dispatcher.removeActionListener(actions.SET_VIEWS, handleViewData);
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
  }, [config]);

  const handleDashboardButtonClick = () => {
    window.sendMessageToDigma({
      action: globalActions.OPEN_DASHBOARD,
      payload: {
        environment: selectedEnvironment
      }
    });
  };

  const handleHomeButtonClick = () => {
    window.sendMessageToDigma({
      action: actions.CHANGE_SCOPE,
      payload: {
        scope: {
          span: null
        }
      }
    });
  };

  const handleTargetButtonClick = () => {
    // TODO
  };

  const handleCodeButtonClick = () => {
    // TODO
  };

  const handleEnvironmentChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const environment = environments.find(
      (x) => x.originalName === e.target.value
    );

    window.sendMessageToDigma({
      action: actions.CHANGE_ENVIRONMENT,
      payload: {
        environment
      }
    });

    setSelectedEnvironment(environment);
  };

  const handleObservabilityChange = (e: ChangeEvent<HTMLInputElement>) => {
    window.sendMessageToDigma({
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
    window.sendMessageToDigma({
      action: globalActions.OPEN_DOCUMENTATION,
      payload: {
        page: "environment-types"
      }
    });
  };

  const handleSlackLinkClick = () => {
    openURLInDefaultBrowser(SLACK_WORKSPACE_URL);
  };

  const handleTabClick = (tabId: string) => {
    window.sendMessageToDigma({
      action: actions.CHANGE_VIEW,
      payload: {
        view: tabId
      }
    });
  };

  return (
    <s.Container>
      <s.Row>
        <button
          disabled={!selectedEnvironment}
          onClick={handleDashboardButtonClick}
        >
          Dashboard
        </button>
        <button disabled={!scope} onClick={handleHomeButtonClick}>
          Home
        </button>
        <span>Scope:</span>
        <span>{scope ? scope : "Home"}</span>
        <button disabled={!scope} onClick={handleTargetButtonClick}>
          Target
        </button>
        <button onClick={handleCodeButtonClick}>Code</button>
      </s.Row>
      <s.Row>
        <span>Environments</span>
        <select
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
        </select>
      </s.Row>
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
        <button onClick={handleInsightsOverviewClick}>Insights overview</button>
        <button onClick={handleSlackLinkClick}>Digma channel</button>
      </s.Row>
      <s.Row>
        {tabs &&
          tabs.map((tab) => (
            <s.Tab
              key={tab.id}
              $isSelected={Boolean(tab.isSelected)}
              $isDisabled={Boolean(tab.isDisabled)}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.title}
              {tab.hasNewData && " (new)"}
            </s.Tab>
          ))}
      </s.Row>
    </s.Container>
  );
};
