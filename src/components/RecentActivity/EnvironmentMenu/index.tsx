import * as s from "./styles";
import { EnvironmentMenuProps } from "./types";

export const EnvironmentMenu = (props: EnvironmentMenuProps) => {
  const handleMenuItemClick = (value: string) => {
    props.onSelect(value);
  };

  return (
    <s.Container>
      <s.List>
        {props.items.map((item) => (
          <s.ListItem
            key={item.value}
            onClick={() => handleMenuItemClick(item.value)}
          >
            {item.icon && (
              <s.IconContainer>
                <item.icon color={"currentColor"} size={16} />
              </s.IconContainer>
            )}
            {item.label}
          </s.ListItem>
        ))}
      </s.List>
    </s.Container>
  );
};
