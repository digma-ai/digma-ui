import * as s from "./styles";
import { MenuProps } from "./types";

export const Menu = (props: MenuProps) => {
  const handleMenuItemClick = (value: string) => {
    props.onSelect(value);
  };

  return (
    <s.Container>
      <s.Header>{props.title}</s.Header>
      <s.List>
        {props.items.map((item) => (
          <s.ListItem
            key={item.value}
            onClick={() => handleMenuItemClick(item.value)}
          >
            {item.label}
          </s.ListItem>
        ))}
      </s.List>
    </s.Container>
  );
};
