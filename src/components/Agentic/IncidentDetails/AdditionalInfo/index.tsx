import { useState, type ReactNode } from "react";
import { useStableSearchParams } from "../../../../hooks/useStableSearchParams";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { trackingEvents } from "../../tracking";
import { Artifacts } from "./Artifacts";
import { RelatedIssues } from "./RelatedIssues";
import * as s from "./styles";
import type { TabId } from "./types";

const tabs: { id: TabId; name: string; content: ReactNode }[] = [
  { id: "relatedIssues", name: "Related issues", content: <RelatedIssues /> },
  { id: "artifacts", name: "Artifacts", content: <Artifacts /> }
];

export const AdditionalInfo = () => {
  const [selectedTabId, setSelectedTabId] = useState<TabId>("relatedIssues");
  const [searchParams] = useStableSearchParams();
  const agentId = searchParams.get("agent");

  const handleTabChange = (tabId: TabId) => () => {
    sendUserActionTrackingEvent(
      trackingEvents.INCIDENT_RELATED_ASSETS_TAB_CLICKED,
      {
        agentId: agentId ?? "",
        tabId
      }
    );
    const newTab = tabs.find((tab) => tab.id === tabId);

    if (newTab) {
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
          >
            <s.TabTitle>{tab.name}</s.TabTitle>
          </s.Tab>
        ))}
      </s.TabsContainer>
      {tabs.find((tab) => tab.id === selectedTabId)?.content}
    </s.Container>
  );
};
