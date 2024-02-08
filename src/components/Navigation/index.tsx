import { useEffect, useMemo, useState } from "react";
import { dispatcher } from "../../dispatcher";
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

  const handleTabClick = (tab: TabData) => {
    setTabs(updateTabs(tab));

    window.sendMessageToDigma({
      action: actions.SET_VIEW,
      payload: {
        view: tab.id
      }
    });
  };

  return (
    <s.Container>
      <s.Placeholder>Navigation</s.Placeholder>
      <s.Tabs>
        {tabs.map((tab) => (
          <s.Tab
            key={tab.id}
            $isSelected={tab.id === selectedTab.id}
            onClick={() => handleTabClick(tab)}
          >
            {tab.title}
          </s.Tab>
        ))}
      </s.Tabs>
    </s.Container>
  );
};
