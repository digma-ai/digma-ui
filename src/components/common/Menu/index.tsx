import * as s from "./styles";
import type { MenuItem, MenuProps } from "./types";

export const Menu = ({ onSelect, title, width, items }: MenuProps) => {
  const handleMenuItemClick = (item: MenuItem) => () => {
    if (item.onClick) {
      item.onClick(item.value);
    } else {
      onSelect(item.value);
    }
  };

  return (
    <s.Container>
      {title && <s.Header>{title}</s.Header>}
      <s.List width={width}>
        {items.map((item) => (
          <s.ListItem key={item.value} onClick={handleMenuItemClick(item)}>
            {item.icon && (
              <item.icon.component
                size={item.icon.size ?? 14}
                color={item.icon.color ?? "currentColor"}
              />
            )}
            {item.label}
          </s.ListItem>
        ))}
      </s.List>
    </s.Container>
  );
};
