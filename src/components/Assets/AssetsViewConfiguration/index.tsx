import { useEffect, useState } from "react";
import { SpanInfo } from "../../../types";
import { ToggleSwitch } from "../../common/ToggleSwitch";
import * as s from "./styles";
import { AssetsViewConfigurationProps } from "./types";

const isEntrySpan = (spanInfo: SpanInfo) =>
  !!(spanInfo.kind && ["Server", "Consumer"].includes(spanInfo.kind));

export const AssetsViewConfiguration = (
  props: AssetsViewConfigurationProps
) => {
  const [isEntry, setIsEntry] = useState(false);
  const [isDirect, setIsDirect] = useState(false);
  useEffect(() => {
    const isEntryPoint = !props.scope || isEntrySpan(props.scope);

    props.onAssetViewChanged(!isEntryPoint);
    setIsEntry(isEntryPoint);
    setIsDirect(!isEntryPoint);
  }, [props.scope]);

  return (
    <s.Container>
      <s.Item $position="left">Show for selected assets</s.Item>
      <s.Item $position="right">
        <ToggleSwitch
          label={"Show direct only"}
          labelPosition={"start"}
          onChange={(val) => {
            setIsDirect(val);
            props.onAssetViewChanged && props.onAssetViewChanged(val);
          }}
          checked={isDirect}
          disabled={!isEntry}
        />
      </s.Item>
    </s.Container>
  );
};
