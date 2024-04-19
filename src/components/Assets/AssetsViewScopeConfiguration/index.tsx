import { useEffect, useState } from "react";
import { isNumber } from "../../../typeGuards/isNumber";
import { formatUnit } from "../../../utils/formatUnit";
import { ArrowIcon } from "../../common/icons/12px/ArrowIcon";
import { TreeNodesIcon } from "../../common/icons/12px/TreeNodesIcon";
import { Toggle } from "../../common/v3/Toggle";
import { ToggleOption } from "../../common/v3/Toggle/types";
import * as s from "./styles";
import { AssetsViewConfigurationProps as AssetsViewScopeConfigurationProps } from "./types";

type ViewMode = "descendants" | "children";

export const AssetsViewScopeConfiguration = ({
  currentScope,
  onAssetViewChange,
  assetsCount
}: AssetsViewScopeConfigurationProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>("descendants");

  useEffect(() => {
    const isEntryPoint = !currentScope || currentScope.span?.role === "Entry";

    setViewMode(isEntryPoint ? "descendants" : "children");

    onAssetViewChange({
      scopedSpanCodeObjectId: currentScope?.span?.spanCodeObjectId,
      isDirect: !isEntryPoint
    });
  }, [currentScope, onAssetViewChange]);

  const handleToggleOptionChange = (value: ViewMode) => {
    setViewMode(value);

    onAssetViewChange &&
      onAssetViewChange({
        isDirect: value === "children",
        scopedSpanCodeObjectId: currentScope?.span?.spanCodeObjectId
      });
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
        {assetTypeDescription} {formatUnit(assetsCount || 0, "asset")}
      </s.Label>
    </s.Container>
  );
};
