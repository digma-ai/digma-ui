import * as s from "./styles";
import { TabProps } from "./types";

export const Tab = (props: TabProps) => {
  const handleContainerClick = () => {
    if (!props.isDisabled) {
      props.onClick();
    }
  };
  return (
    <s.Container
      $isDisabled={props.isDisabled}
      $isSelected={props.isSelected}
      onClick={handleContainerClick}
      $fullWidth={props.fullWidth}
    >
      <s.IconContainer>
        {props.icon && <props.icon size={14} color={"currentColor"} />}
      </s.IconContainer>
      {props.children}
    </s.Container>
  );
};
