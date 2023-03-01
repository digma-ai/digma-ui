import { useState } from "react";
import { AssetsList } from "./AssetsList";
import { data } from "./data";
import { Details } from "./Details";
import { GlobalStyle } from "./styles";

export function Assets() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const handleBackButtonClick = () => {
    setSelectedCategoryId(null);
  };

  const handleSelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
  };

  const selectedCategory = data.categories.find(
    (x) => x.id === selectedCategoryId
  );

  return (
    <>
      <GlobalStyle />
      {selectedCategory ? (
        <Details
          onBackButtonClick={handleBackButtonClick}
          categoryId={selectedCategory.id}
          items={selectedCategory.items}
        />
      ) : (
        <AssetsList groups={data.categories} onSelect={handleSelect} />
      )}
    </>
  );
}
