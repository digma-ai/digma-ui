import { useEffect } from "react";
import { useAssetsSelector } from "../../../store/assets/useAssetsSelector";
import { useStore } from "../../../store/useStore";
import { isNumber } from "../../../typeGuards/isNumber";
import { formatUnit } from "../../../utils/formatUnit";
import { ArrowIcon } from "../../common/icons/12px/ArrowIcon";
import { TreeNodesIcon } from "../../common/icons/12px/TreeNodesIcon";
import { Toggle } from "../../common/v3/Toggle";
import type { ToggleOption } from "../../common/v3/Toggle/types";
import * as s from "./styles";
import type { AssetsViewScopeConfigurationProps, ViewMode } from "./types";

// TODO: move to AssetsContent
export const AssetsViewScopeConfiguration = ({
  assetsCount,
  spanRole
}: AssetsViewScopeConfigurationProps) => {
  const { viewMode } = useAssetsSelector();
  const { setAssetsViewMode } = useStore.getState();

  useEffect(() => {
    const isEntryPoint = spanRole === "Entry";

    setAssetsViewMode(isEntryPoint ? "descendants" : "children");
  }, [spanRole, setAssetsViewMode]);

  const handleToggleOptionChange = (value: ViewMode) => {
    setAssetsViewMode(value);
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
