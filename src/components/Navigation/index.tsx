import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";
import { actions as globalActions } from "../../actions";
import { SLACK_WORKSPACE_URL } from "../../constants";
import { dispatcher } from "../../dispatcher";
import { openURLInDefaultBrowser } from "../../utils/openURLInDefaultBrowser";
import { ConfigContext } from "../common/App/ConfigContext";
import { actions } from "./actions";
import * as s from "./styles";
import { SetViewPayload, TabData, View } from "./types";

const defaultTabs: TabData[] = [
  {
    title: "Insights",
    id: View.INSIGHTS,
    isSelected: true
  },
  {
    title: "Assets",
    id: View.ASSETS
  },
  {
    title: "Errors",
    id: View.ERRORS
  },
  {
    title: "Tests",
    id: View.TESTS
  }
];

const updateTabs = (tabToSelect: TabData): TabData[] =>
  defaultTabs.map((tab) => ({
    ...tab,
    title: tab.id === tabToSelect.id ? tabToSelect.title : tab.title,
    isSelected: tab.id === tabToSelect.id
  }));

export const Navigation = () => {
  const [tabs, setTabs] = useState<TabData[]>(defaultTabs);
  const config = useContext(ConfigContext);
  const [selectedEnvironment, setSelectedEnvironment] = useState(
    config.environment
  );

  const environments = config.environments || [];
  const scope: { displayName: string; spanCodeObjectId: string } | null = null;

  const selectedTab = useMemo(
    () => tabs.find((tab) => tab.isSelected) || tabs[0],
    [tabs]
  );

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });

    const handleViewData = (data: unknown) => {
      const payload = data as SetViewPayload;
      setTabs(updateTabs(payload.view));
    };

    dispatcher.addActionListener(actions.SET_VIEW, handleViewData);

    return () => {
      dispatcher.removeActionListener(actions.SET_VIEW, handleViewData);
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
      setSelectedEnvironment(config.environments[0].originalName);
      window.sendMessageToDigma({
        action: actions.CHANGE_ENVIRONMENT
      });
    }

    if (config.environments && config.environments.length === 0) {
      setSelectedEnvironment("");
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
    setSelectedEnvironment(e.target.value);
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

  const handleTabClick = (tab: TabData) => {
    setTabs(updateTabs(tab));

    window.sendMessageToDigma({
      action: actions.CHANGE_VIEW,
      payload: {
        view: tab.id
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
          value={selectedEnvironment}
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
        {tabs.map((tab) => (
          <s.Tab
            key={tab.id}
            $isSelected={tab.id === selectedTab.id}
            onClick={() => handleTabClick(tab)}
          >
            {tab.title}
          </s.Tab>
        ))}
      </s.Row>
    </s.Container>
  );
};
