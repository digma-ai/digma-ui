import * as s from "./styles";
import { TabsProps } from "./types";

export const Tabs = (props: TabsProps) => {
  const handleTabClick = (tabId: string) => {
    props.onSelect(tabId);
  };

  return (
    <s.TabList>
      {props.tabs
        .filter((x) => !x.isHidden)
        .map((tab) => (
          <s.Tab
            key={tab.id}
            $isSelected={tab.isSelected}
            $isDisabled={tab.isDisabled}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.title}
            {tab.hasNewData && <s.Indicator />}
          </s.Tab>
        ))}
    </s.TabList>
  );
};
