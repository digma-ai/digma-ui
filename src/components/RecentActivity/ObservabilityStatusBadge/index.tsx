import { actions as globalActions } from "../../../actions";
import { WarningTriangleIcon } from "../../common/icons/WarningTriangleIcon";
import * as s from "./styles";

export const ObservabilityStatusBadge = () => {
  const handleTurnOnLinkClick = () => {
    window.sendMessageToDigma({
      action: globalActions.SET_OBSERVABILITY,
      payload: {
        isObservabilityEnabled: true
      }
    });
  };

  return (
    <s.Container>
      <s.MessageContainer>
        <s.IconContainer>
          <WarningTriangleIcon size={14} color={"currentColor"} />
        </s.IconContainer>
        <s.Message>
          <s.Title>Observability turned off</s.Title>
          <s.Divider />
          <s.Description>
            Turn observability on in order for Digma to collect new data
          </s.Description>
        </s.Message>
      </s.MessageContainer>
      <s.TurnOnLink onClick={handleTurnOnLinkClick}>Turn on</s.TurnOnLink>
    </s.Container>
  );
};
