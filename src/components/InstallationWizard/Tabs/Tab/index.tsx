import * as s from "./styles";
import type { TabProps } from "./types";

export const Tab = ({
  isDisabled,
  onClick,
  isSelected,
  fullWidth,
  icon: Icon,
  children
}: TabProps) => {
  const handleContainerClick = () => {
    if (!isDisabled) {
      onClick();
    }
  };
  return (
    <s.Container
      $isDisabled={isDisabled}
      $isSelected={isSelected}
      onClick={handleContainerClick}
      $fullWidth={fullWidth}
    >
      <s.IconContainer>
        {Icon && <Icon size={14} color={"currentColor"} />}
      </s.IconContainer>
      {children}
    </s.Container>
  );
};
