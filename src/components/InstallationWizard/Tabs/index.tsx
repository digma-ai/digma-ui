import { Tab } from "./Tab";
import * as s from "./styles";
import type { TabsProps } from "./types";

export const Tabs = ({
  onSelect,
  className,
  tabs,
  selectedTab,
  fullWidth
}: TabsProps) => {
  const handleTabClick = (tabIndex: number) => () => {
    onSelect(tabIndex);
  };

  return (
    <s.Container className={className}>
      <s.TabList>
        {tabs.map((tab, i) => {
          const isSelected = selectedTab === i;

          return (
            <Tab
              isDisabled={tab.disabled}
              key={tab.title}
              isSelected={isSelected}
              onClick={handleTabClick(i)}
              icon={tab.icon}
              fullWidth={fullWidth}
            >
              {tab.title}
            </Tab>
          );
        })}
      </s.TabList>
      {tabs[selectedTab].content}
    </s.Container>
  );
};
