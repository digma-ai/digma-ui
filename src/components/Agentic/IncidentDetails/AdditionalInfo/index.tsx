import { useState, type ReactNode } from "react";
import { RelatedIssues } from "./RelatedIssues";
import * as s from "./styles";
import type { TabId } from "./types";

const tabs: { id: TabId; name: string; isDisabled?: boolean }[] = [
  { id: "relatedIssues", name: "Related issues" },
  { id: "artifacts", name: "Artifacts", isDisabled: true }
];

export const AdditionalInfo = () => {
  const [selectedTabId, setSelectedTabId] = useState<TabId>("relatedIssues");

  const tabContent: Record<TabId, ReactNode> = {
    relatedIssues: <RelatedIssues />,
    artifacts: null
  };

  const handleTabChange = (tabId: TabId) => () => {
    const newTab = tabs.find((tab) => tab.id === tabId);

    if (!newTab?.isDisabled) {
      setSelectedTabId(tabId);
    }
  };

  return (
    <s.Container>
      <s.TabsContainer>
        {tabs.map((tab) => (
          <s.Tab
            key={tab.id}
            $isActive={selectedTabId === tab.id}
            onClick={handleTabChange(tab.id)}
            $isDisabled={tab.isDisabled}
          >
            <s.TabTitle>{tab.name}</s.TabTitle>
          </s.Tab>
        ))}
      </s.TabsContainer>
      {tabContent[selectedTabId]}
    </s.Container>
  );
};
