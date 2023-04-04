import * as s from "./styles";
import { TabsProps } from "./types";

export const Tabs = (props: TabsProps) => {
  const handleTabClick = (tabIndex: number) => {
    if (!props.tabs[tabIndex].disabled) {
      props.onSelect(tabIndex);
    }
  };

  return (
    <s.Container className={props.className}>
      <s.TabList>
        {props.tabs.map((tab, i) => {
          const isSelected = props.selectedTab === i;

          return (
            <s.Tab
              disabled={tab.disabled}
              key={tab.title}
              isSelected={isSelected}
              onClick={() => handleTabClick(i)}
            >
              {tab.icon && (
                <tab.icon
                  size={14}
                  color={isSelected ? "#dadada" : "#9b9b9b"}
                />
              )}
              {tab.title}
            </s.Tab>
          );
        })}
      </s.TabList>
      {props.tabs[props.selectedTab].content}
    </s.Container>
  );
};
