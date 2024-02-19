import { sendTrackingEvent } from "../../../../utils/sendTrackingEvent";
import { CodeDetails } from "../../../common/App/types";
import { MenuList } from "../../common/MenuList";
import { trackingEvents } from "../../tracking";
import * as s from "./styles";
import { TargetButtonMenuProps } from "./types";

export const TargetButtonMenu = (props: TargetButtonMenuProps) => {
  const handleMenuItemClick = (codeDetails: CodeDetails) => {
    sendTrackingEvent(trackingEvents.CODE_LOCATION_SELECTED);
    props.onGoToCodeLocation(codeDetails);
  };

  return (
    <s.Container>
      <MenuList
        items={[
          ...props.scope.code.codeDetailsList.map((x) => ({
            id: x.codeObjectId,
            label: x.displayName,
            onClick: () => handleMenuItemClick(x),
            disabled: false,
            groupName: "Code locations"
          })),
          ...props.scope.code.relatedCodeDetailsList.map((x) => ({
            id: x.codeObjectId,
            label: x.displayName,
            onClick: () => handleMenuItemClick(x),
            disabled: false,
            groupName: "Related code locations"
          }))
        ]}
      />
    </s.Container>
  );
};
