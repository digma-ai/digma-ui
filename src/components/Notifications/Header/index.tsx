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

const getCloseButtonIconColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#818594";
    case "dark":
    case "dark-jetbrains":
      return "#b4b8bf";
  }
};

export const Header = (props: HeaderProps) => {
  const theme = useTheme();
  const iconColor = getIconColor(theme);
  const closeButtonIconColor = getCloseButtonIconColor(theme);

  const handleCloseButtonClick = () => {
    props.onClose();
  };

  return (
    <s.Container>
      <s.Title>
        <BellIcon color={iconColor} size={16} />
        Notifications
      </s.Title>
      <s.CloseButton onClick={handleCloseButtonClick}>
        <CrossIcon color={closeButtonIconColor} size={14} />
      </s.CloseButton>
    </s.Container>
  );
};
