import { DefaultTheme, useTheme } from "styled-components";
import { LightBulbIcon } from "../../common/icons/LightBulbIcon";
import * as s from "./styles";
import { TipProps } from "./types";

const getTipIconColor = (theme: DefaultTheme): string => {
  switch (theme.mode) {
    case "light":
      return "#788ca9";
    case "dark":
    case "dark-jetbrains":
      return "#b9c2eb";
  }
};

export const Tip = (props: TipProps) => {
  const theme = useTheme();

  return (
    <s.TipContainer>
      <s.TipIconContainer>
        <LightBulbIcon size={16} color={getTipIconColor(theme)} />
      </s.TipIconContainer>
      {props.children}
    </s.TipContainer>
  );
};
