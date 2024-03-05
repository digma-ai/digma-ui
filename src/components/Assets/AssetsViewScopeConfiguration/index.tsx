import { useEffect, useState } from "react";
import { ToggleSwitch } from "../../common/ToggleSwitch";
import * as s from "./styles";
import { AssetsViewConfigurationProps as AssetsViewScopeConfigurationProps } from "./types";

export const AssetsViewScopeConfiguration = (
  props: AssetsViewScopeConfigurationProps
) => {
  const [isEntry, setIsEntry] = useState(false);
  const [isDirect, setIsDirect] = useState(false);
  const scope = props.currentScope;

  useEffect(() => {
    const isEntryPoint = !scope || scope.span?.role === "Entry";
    props.onAssetViewChanged({
      scopedSpanCodeObjectId: scope?.span?.spanCodeObjectId,
      isDirect: !isEntryPoint
    });
    setIsEntry(isEntryPoint);
    setIsDirect(!isEntryPoint);
  }, [scope]);

  return (
    <s.Container>
      <s.Item>Assets filtered to current scope</s.Item>
      <s.Item>
        <ToggleSwitch
          label={"Show direct only"}
          labelPosition={"start"}
          onChange={(val) => {
            setIsDirect(val);
            props.onAssetViewChanged &&
              props.onAssetViewChanged({
                isDirect: val,
                scopedSpanCodeObjectId: scope?.span?.spanCodeObjectId
              });
          }}
          checked={isDirect}
          disabled={!isEntry}
        />
      </s.Item>
    </s.Container>
  );
};
