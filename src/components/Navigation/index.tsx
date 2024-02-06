import { useEffect, useState } from "react";
import { actions } from "./actions";
import * as s from "./styles";
import { TabData, View } from "./types";

const tabs: TabData[] = [
  {
    label: "Assets",
    id: View.ASSETS
  },
  {
    label: "Insights",
    id: View.INSIGHTS
  },
  {
    label: "Tests",
    id: View.TESTS
  },
  {
    label: "Errors",
    id: View.ERRORS
  }
];

export const Navigation = () => {
  const [selectedTab, setSelectedTab] = useState(View.ASSETS);
  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });
  }, []);

  const handleTabClick = (tabId: View) => {
    setSelectedTab(tabId);
    window.sendMessageToDigma({
      action: actions.SET_VIEW,
      payload: {
        view: tabId
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
            $isSelected={tab.id === selectedTab}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </s.Tab>
        ))}
      </s.Tabs>
    </s.Container>
  );
};
