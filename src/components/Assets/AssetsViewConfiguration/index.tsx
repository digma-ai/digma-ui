import { useState } from "react";
import { SpanInfo } from "../../../types";
import { ToggleSwitch } from "../../common/ToggleSwitch";
import * as s from "./styles";
import { AssetsViewConfigurationProps } from "./types";

const isEntrySpan = (spanInfo: SpanInfo) =>
  spanInfo.kind && ["Server", "Consumer"].includes(spanInfo.kind);

export const AssetsViewConfiguration = (
  props: AssetsViewConfigurationProps
) => {
  const isEntry = !props.scope || isEntrySpan(props.scope);
  const [isDirect, setIsDirect] = useState(!isEntry);

  return (
    <s.Container>
      <s.Item $position="left">Show for selected assets</s.Item>
      <s.Item $position="right">
        <ToggleSwitch
          label={"Show direct only"}
          labelPosition={"start"}
          onChange={(val) => {
            setIsDirect(val);
            props.onAssetViewChanged && props.onAssetViewChanged("some");
          }}
          checked={isDirect}
          disabled={!isEntry}
        />
      </s.Item>
    </s.Container>
  );
};
