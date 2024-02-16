import { ChevronIcon } from "../../common/icons/ChevronIcon";
import { Direction } from "../../common/icons/types";
import * as s from "./styles";
import { HistoryNavigationPanelProps } from "./types";

export const HistoryNavigationPanel = (props: HistoryNavigationPanelProps) => (
  <s.Container>
    <s.Button onClick={props.onGoBack} disabled={props.isBackDisabled}>
      <ChevronIcon
        direction={Direction.LEFT}
        size={16}
        color={"currentColor"}
      />
    </s.Button>
    <s.Button onClick={props.onGoForward} disabled={props.isForwardDisabled}>
      <ChevronIcon
        direction={Direction.RIGHT}
        size={16}
        color={"currentColor"}
      />
    </s.Button>
  </s.Container>
);
