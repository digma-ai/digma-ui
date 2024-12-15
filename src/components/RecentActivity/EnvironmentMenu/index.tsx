import * as s from "./styles";
import type { EnvironmentMenuProps } from "./types";

export const EnvironmentMenu = ({ onSelect, items }: EnvironmentMenuProps) => {
  const handleMenuItemClick = (value: string) => {
    onSelect(value);
  };

  return (
    <s.Container>
      <s.List>
        {items.map((item) => (
          <s.ListItem
            key={item.value}
            onClick={() => handleMenuItemClick(item.value)}
          >
            <s.IconContainer>
              <item.icon color={"currentColor"} size={16} />
            </s.IconContainer>
            {item.label}
          </s.ListItem>
        ))}
      </s.List>
    </s.Container>
  );
};
