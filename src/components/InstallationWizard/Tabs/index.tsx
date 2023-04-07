import { Tab } from "./Tab";
import * as s from "./styles";
import { TabsProps } from "./types";

export const Tabs = (props: TabsProps) => {
  const handleTabClick = (tabIndex: number) => {
    props.onSelect(tabIndex);
  };

  return (
    <s.Container className={props.className}>
      <s.TabList>
        {props.tabs.map((tab, i) => {
          const isSelected = props.selectedTab === i;

          return (
            <Tab
              isDisabled={tab.disabled}
              key={tab.title}
              isSelected={isSelected}
              onClick={() => handleTabClick(i)}
              icon={tab.icon}
            >
              {tab.title}
            </Tab>
          );
        })}
      </s.TabList>
      {props.tabs[props.selectedTab].content}
    </s.Container>
  );
};
