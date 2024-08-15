import { useEffect } from "react";
import { useAssetsStore } from "../../../containers/Main/stores/useAssetsStore";
import { useGlobalStore } from "../../../containers/Main/stores/useGlobalStore";
import { isNumber } from "../../../typeGuards/isNumber";
import { formatUnit } from "../../../utils/formatUnit";
import { ArrowIcon } from "../../common/icons/12px/ArrowIcon";
import { TreeNodesIcon } from "../../common/icons/12px/TreeNodesIcon";
import { Toggle } from "../../common/v3/Toggle";
import { ToggleOption } from "../../common/v3/Toggle/types";
import * as s from "./styles";
import {
  AssetsViewConfigurationProps as AssetsViewScopeConfigurationProps,
  ViewMode
} from "./types";

export const AssetsViewScopeConfiguration = ({
  assetsCount
}: AssetsViewScopeConfigurationProps) => {
  const scope = useGlobalStore.use.scope();
  const viewMode = useAssetsStore.use.viewMode();
  const setViewMode = useAssetsStore.use.setViewMode();

  useEffect(() => {
    const isEntryPoint = !scope || scope.span?.role === "Entry";

    setViewMode(isEntryPoint ? "descendants" : "children");
  }, [scope, setViewMode]);

  const handleToggleOptionChange = (value: ViewMode) => {
    setViewMode(value);
  };

  const toggleOptions: ToggleOption<ViewMode>[] = [
    {
      value: "descendants",
      icon: TreeNodesIcon
    },
    {
      value: "children",
      icon: ArrowIcon
    }
  ];

  const assetTypeDescription =
    viewMode === "descendants" ? "descendant" : "child";

  return (
    <s.Container>
      <Toggle
        value={viewMode}
        onValueChange={handleToggleOptionChange}
        options={toggleOptions}
        size={"small"}
      />
      <s.Label>
        Showing
        <s.AssetsCount>
          {isNumber(assetsCount) ? ` ${assetsCount} ` : " "}
        </s.AssetsCount>
        {assetTypeDescription} {formatUnit(assetsCount ?? 0, "asset")}
      </s.Label>
    </s.Container>
  );
};
