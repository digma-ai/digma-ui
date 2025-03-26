import { useTheme } from "styled-components";
import { HomeIcon } from "../icons/16px/HomeIcon";
import { ChevronIcon } from "../icons/20px/ChevronIcon";
import { Direction } from "../icons/types";
import { Tooltip } from "../v3/Tooltip";
import * as s from "./styles";
import type { HistoryNavigationPanelProps } from "./types";

export const HistoryNavigationPanel = ({
  isAtHome,
  onGoBack,
  onGoForward,
  canGoBack,
  canGoForward,
  onGoHome
}: HistoryNavigationPanelProps) => {
  const theme = useTheme();

  const handleBackButtonClick = () => {
    onGoBack();
  };

  const handleForwardButtonClick = () => {
    onGoForward();
  };

  const handleHomeButtonClick = () => {
    onGoHome();
  };

  return (
    <s.Container $isActive={!isAtHome}>
      <Tooltip title={"Go back"}>
        <s.Button onClick={handleBackButtonClick} disabled={!canGoBack}>
          <ChevronIcon
            direction={Direction.Left}
            size={16}
            color={"currentColor"}
          />
        </s.Button>
      </Tooltip>
      <Tooltip title={"Go forward"}>
        <s.Button onClick={handleForwardButtonClick} disabled={!canGoForward}>
          <ChevronIcon
            direction={Direction.Right}
            size={16}
            color={"currentColor"}
          />
        </s.Button>
      </Tooltip>
      <Tooltip title={"Go home"}>
        <s.Button onClick={handleHomeButtonClick} disabled={isAtHome}>
          <HomeIcon
            color={
              isAtHome ? theme.colors.v3.icon.brandPrimary : "currentColor"
            }
            size={16}
            fillColor={
              isAtHome ? theme.colors.v3.surface.brandPrimary : undefined
            }
          />
        </s.Button>
      </Tooltip>
    </s.Container>
  );
};
