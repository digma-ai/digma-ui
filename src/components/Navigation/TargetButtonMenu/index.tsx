import { MenuList } from "../MenuList";
import * as s from "./styles";
import { TargetButtonMenuProps } from "./types";

export const TargetButtonMenu = (props: TargetButtonMenuProps) => (
  <s.Container>
    <MenuList
      items={[
        ...props.scope.code.codeDetailsList.map((x) => ({
          id: x.codeObjectId,
          label: x.displayName,
          onClick: () => props.onGoToCodeLocation(x),
          disabled: false,
          groupName: "Code locations"
        })),
        ...props.scope.code.relatedCodeDetailsList.map((x) => ({
          id: x.codeObjectId,
          label: x.displayName,
          onClick: () => props.onGoToCodeLocation(x),
          disabled: false,
          groupName: "Related code locations"
        }))
      ]}
    />
  </s.Container>
);
