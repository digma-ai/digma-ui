import { Menu } from "../styles";
import { TargetButtonMenuProps } from "./types";

export const TargetButtonMenu = (props: TargetButtonMenuProps) => (
  <Menu>
    {props.scope.code.codeDetailsList.length > 0 &&
      props.scope.code.codeDetailsList.map((x) => (
        <div key={x.codeObjectId}>
          <div>Code locations</div>
          <div key={x.codeObjectId} onClick={() => props.onGoToCodeLocation(x)}>
            {x.displayName}
          </div>
        </div>
      ))}
    {props.scope.code.relatedCodeDetailsList.length > 0 &&
      props.scope.code.relatedCodeDetailsList.map((x) => (
        <div key={x.codeObjectId}>
          <div>Related code locations</div>
          {props.scope.code.relatedCodeDetailsList.map((x) => (
            <div
              key={x.codeObjectId}
              onClick={() => props.onGoToCodeLocation(x)}
            >
              {x.displayName}
            </div>
          ))}
        </div>
      ))}
  </Menu>
);
