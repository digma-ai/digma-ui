import { ButtonType } from "../../../../../../../common/v3/Button/types";
import { Action } from "../types";
import * as s from "./styles";
import { ActionToolbarProps } from "./types";

export const ActionToolbar = ({ actions }: ActionToolbarProps) => {
  const renderActions = (action: Action, isPrimary: boolean) => {
    const buttonType: ButtonType = isPrimary ? "primary" : "tertiary";

    switch (action) {
      // TODO: implement
      case "markAsRead":
      case "openHistogram":
      case "recheck":
      case "viewTicketInfo":
      case "openTrace":
      case "openLiveView":
      case "pin":
      default:
        return null;
    }
  };

  return (
    <s.Container>
      {actions.map((x, i) => renderActions(x, i === actions.length - 1))}
    </s.Container>
  );
};
