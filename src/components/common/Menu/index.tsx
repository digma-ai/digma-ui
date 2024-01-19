import * as s from "./styles";
import { MenuProps } from "./types";

export const Menu = (props: MenuProps) => {
  const handleMenuItemClick = (value: string) => {
    props.onSelect(value);
  };

  return (
    <s.Container>
      {props.title && <s.Header>{props.title}</s.Header>}
      <s.List width={props.width}>
        {props.items.map((item) => (
          <s.ListItem
            key={item.value}
            onClick={() =>
              item.onClick
                ? item.onClick(item.value)
                : handleMenuItemClick(item.value)
            }
          >
            {item.icon && (
              <item.icon.component
                size={item.icon.size || 14}
                color={item.icon.color || "currentColor"}
              />
            )}
            {item.label}
          </s.ListItem>
        ))}
      </s.List>
    </s.Container>
  );
};
