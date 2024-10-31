import { useEffect, useState } from "react";
import { usePrevious } from "../../../hooks/usePrevious";
import { FilterButton } from "../FilterButton";
import { CrossIcon } from "../icons/16px/CrossIcon";
import { NewPopover } from "../NewPopover";
import { NewButton } from "../v3/NewButton";
import * as s from "./styles";
import { FilterPopupProps } from "./types";

export const FilterPopup = ({
  onClearAll,
  onClose,
  title,
  selectedFiltersCount,
  filters,
  onStateChange,
  onApply
}: FilterPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const previousIsOpen = usePrevious(isOpen);

  useEffect(() => {
    if (isOpen !== previousIsOpen && onStateChange) {
      onStateChange(isOpen);
    }
  }, [isOpen, previousIsOpen, onStateChange]);

  const handleApplyButtonClick = () => {
    setIsOpen(false);
    onApply();
  };

  const handleCloseButtonClick = () => {
    setIsOpen(false);
    onClose();
  };

  const handleFilterButtonClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NewPopover
      width={"100%"}
      closeOnOutsidePress={false}
      content={
        <s.Container>
          <s.Header>
            {title}
            <s.CloseButton onClick={handleCloseButtonClick}>
              <CrossIcon color={"currentColor"} size={16} />
            </s.CloseButton>
          </s.Header>
          {filters.map((x) => (
            <s.Filter key={x.title}>
              <s.FilterCategoryName>{x.title}</s.FilterCategoryName>
              {x.component}
            </s.Filter>
          ))}
          <s.Footer>
            <NewButton
              label={"Apply filters"}
              onClick={handleApplyButtonClick}
            />
            <s.ClearAllButton
              buttonType={"primaryBorderless"}
              label={"Clear filters"}
              isDisabled={selectedFiltersCount === 0}
              onClick={onClearAll}
            />
          </s.Footer>
        </s.Container>
      }
      onOpenChange={setIsOpen}
      isOpen={isOpen}
      placement={"bottom-end"}
    >
      <div>
        <FilterButton
          title={"Filters"}
          showCount={true}
          selectedCount={selectedFiltersCount}
          isActive={isOpen}
          onClick={handleFilterButtonClick}
        />
      </div>
    </NewPopover>
  );
};
