import { Menu } from "../styles";
import { TargetButtonMenuProps } from "./types";

export const TargetButtonMenu = (props: TargetButtonMenuProps) => (
  <Menu>
    {props.scope.code.codeDetailsList.length > 0 && (
      <>
        <div>Code locations</div>
        {props.scope.code.codeDetailsList.map((x) => (
          <div key={x.codeObjectId} onClick={() => props.onGoToCodeLocation(x)}>
            {x.displayName}
          </div>
        ))}
      </>
    )}
    {props.scope.code.relatedCodeDetailsList.length > 0 && (
      <div>
        <div>Related code locations</div>
        {props.scope.code.relatedCodeDetailsList.map((x) => (
          <div key={x.codeObjectId} onClick={() => props.onGoToCodeLocation(x)}>
            {x.displayName}
          </div>
        ))}
      </div>
    )}
  </Menu>
);
