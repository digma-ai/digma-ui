import { useContext, useEffect, useState } from "react";
import { SpanInfo } from "../../../types";
import { ConfigContext } from "../../common/App/ConfigContext";
import { ToggleSwitch } from "../../common/ToggleSwitch";
import * as s from "./styles";
import { AssetsViewConfigurationProps as AssetsViewScopeConfigurationProps } from "./types";

const isEntrySpan = (spanInfo?: SpanInfo) =>
  !!(spanInfo?.kind && ["Server", "Consumer"].includes(spanInfo.kind));

export const AssetsViewScopeConfiguration = (
  props: AssetsViewScopeConfigurationProps
) => {
  const [isEntry, setIsEntry] = useState(false);
  const [isDirect, setIsDirect] = useState(false);
  const { scope } = useContext(ConfigContext);

  useEffect(() => {
    const isEntryPoint = !scope || isEntrySpan(scope.span);

    props.onAssetViewChanged({
      scopedSpanCodeObjectId: scope?.span?.spanCodeObjectId,
      isDirect: !isEntryPoint
    });
    setIsEntry(isEntryPoint);
    setIsDirect(!isEntryPoint);
  }, [scope]);

  return (
    <s.Container>
      <s.Item>Show for selected assets</s.Item>
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
