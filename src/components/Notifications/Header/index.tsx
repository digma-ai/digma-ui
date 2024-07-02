import { DefaultTheme, useTheme } from "styled-components";
import { BellIcon } from "../../common/icons/BellIcon";
import { CrossIcon } from "../../common/icons/CrossIcon";
import * as s from "./styles";
import { HeaderProps } from "./types";

const getIconColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#494b57";
    case "dark":
    case "dark-jetbrains":
      return "#dfe1e5";
  }
};

export const Header = ({ onClose }: HeaderProps) => {
  const theme = useTheme();
  const iconColor = getIconColor(theme);

  const handleCloseButtonClick = () => {
    onClose();
  };

  return (
    <s.Container>
      <s.Title>
        <BellIcon color={iconColor} size={16} />
        Notifications
      </s.Title>
      <s.CloseButton onClick={handleCloseButtonClick}>
        <CrossIcon color={"currentColor"} size={14} />
      </s.CloseButton>
    </s.Container>
  );
};
