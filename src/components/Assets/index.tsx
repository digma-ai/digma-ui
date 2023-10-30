import { useMemo, useState } from "react";
import { AssetList } from "./AssetList";
import { AssetTypeList } from "./AssetTypeList";
import * as s from "./styles";

export const Assets = () => {
  const [selectedAssetTypeId, setSelectedAssetTypeId] = useState<string | null>(
    null
  );

  const handleBackButtonClick = () => {
    setSelectedAssetTypeId(null);
  };

  const handleAssetTypeSelect = (assetTypeId: string) => {
    setSelectedAssetTypeId(assetTypeId);
  };

  const renderContent = useMemo((): JSX.Element => {
    if (!selectedAssetTypeId) {
      return <AssetTypeList onAssetTypeSelect={handleAssetTypeSelect} />;
    }

    return (
      <AssetList
        onBackButtonClick={handleBackButtonClick}
        assetTypeId={selectedAssetTypeId}
      />
    );
  }, [selectedAssetTypeId]);

  return <s.Container>{renderContent}</s.Container>;
};
