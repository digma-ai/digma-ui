import { useCallback, useEffect, useState } from "react";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components";
import { SORTING_ORDER } from "../../../redux/services/types";
import { Menu } from "../Menu";
import { Popover } from "../Popover";
import { PopoverContent } from "../Popover/PopoverContent";
import { PopoverTrigger } from "../Popover/PopoverTrigger";
import { ChevronIcon } from "../icons/ChevronIcon";
import { SortIcon } from "../icons/SortIcon";
import { Direction } from "../icons/types";
import * as s from "./styles";
import type { Sorting, SortingSelectorProps } from "./types";

const getSortingMenuChevronColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#4d668a";
    case "dark":
    case "dark-jetbrains":
      return "#dadada";
  }
};

export const SortingSelector = ({
  defaultSorting,
  onChange,
  options
}: SortingSelectorProps) => {
  const theme = useTheme();
  const [sorting, setSorting] = useState<Sorting>(defaultSorting);
  const [isSortingMenuOpen, setIsSortingMenuOpen] = useState(false);
  const sortingMenuChevronColor = getSortingMenuChevronColor(theme);

  useEffect(() => {
    onChange(sorting);
  }, [sorting, defaultSorting]);

  const getSortingCriterionInfo = useCallback(
    (value: string) => {
      return options.find((x) => x.value === value);
    },
    [options]
  );

  const handleSortingMenuItemSelect = (value: string) => {
    if (sorting.criterion === value) {
      setSorting({
        ...sorting,
        order:
          sorting.order === SORTING_ORDER.DESC
            ? SORTING_ORDER.ASC
            : SORTING_ORDER.DESC
      });
    } else {
      setSorting({
        criterion: value,
        order:
          getSortingCriterionInfo(value)?.defaultOrder ?? SORTING_ORDER.DESC
      });
    }
    handleSortingMenuToggle();
  };

  const handleSortingMenuToggle = () => {
    setIsSortingMenuOpen(!isSortingMenuOpen);
  };

  const handleSortingOrderToggleOptionButtonClick =
    (order: SORTING_ORDER) => () => {
      setSorting({
        ...sorting,
        order
      });
    };

  return (
    <s.PopoverContainer>
      <Popover
        open={isSortingMenuOpen}
        onOpenChange={setIsSortingMenuOpen}
        placement={"bottom-start"}
      >
        <PopoverTrigger onClick={handleSortingMenuToggle}>
          <s.SortingMenuButton $isOpen={isSortingMenuOpen}>
            <span>Sort by</span>
            <s.SortingLabel>
              {getSortingCriterionInfo(sorting.criterion)?.label}
            </s.SortingLabel>
            <ChevronIcon
              direction={isSortingMenuOpen ? Direction.UP : Direction.DOWN}
              color={sortingMenuChevronColor}
            />
          </s.SortingMenuButton>
        </PopoverTrigger>
        <PopoverContent className={"Popover"}>
          <Menu
            title={"Sort by"}
            items={options.map(({ value, label }) => ({
              value,
              label
            }))}
            onSelect={handleSortingMenuItemSelect}
          />
        </PopoverContent>
      </Popover>

      <s.SortingOrderToggle>
        {[SORTING_ORDER.DESC, SORTING_ORDER.ASC].map((order) => {
          const isSelected = sorting.order === order;

          return (
            <s.SortingOrderToggleOptionButton
              key={order}
              $selected={isSelected}
              onClick={handleSortingOrderToggleOptionButtonClick(order)}
            >
              <s.SortingOrderIconContainer $sortingOrder={order}>
                <SortIcon color={"currentColor"} size={14} />
              </s.SortingOrderIconContainer>
            </s.SortingOrderToggleOptionButton>
          );
        })}
      </s.SortingOrderToggle>
    </s.PopoverContainer>
  );
};
