import { ChangeEvent, useMemo, useState } from "react";
import { DefaultTheme, useTheme } from "styled-components";
import { Menu } from "../../common/Menu";
import { Popover } from "../../common/Popover";
import { PopoverContent } from "../../common/Popover/PopoverContent";
import { PopoverTrigger } from "../../common/Popover/PopoverTrigger";
import { ChevronIcon } from "../../common/icons/ChevronIcon";
import { MagnifierIcon } from "../../common/icons/MagnifierIcon";
import { Direction } from "../../common/icons/types";
import { getAssetTypeInfo } from "../utils";
import { AssetEntry as AssetEntryComponent } from "./AssetEntry";
import * as s from "./styles";
import {
  AssetListProps,
  ExtendedAssetEntryWithServices,
  SORTING_CRITERION,
  Sorting
} from "./types";

const sortEntries = (
  entries: ExtendedAssetEntryWithServices[],
  sorting: Sorting
): ExtendedAssetEntryWithServices[] => {
  entries = [...entries];

  const sortByName = (
    a: ExtendedAssetEntryWithServices,
    b: ExtendedAssetEntryWithServices,
    isDesc: boolean
  ) =>
    isDesc
      ? b.span.displayName.localeCompare(a.span.displayName)
      : a.span.displayName.localeCompare(b.span.displayName);

  switch (sorting.criterion) {
    case SORTING_CRITERION.CRITICAL_INSIGHTS:
      return entries.sort((a, b) => {
        const aHighestImportance =
          a.insights.length > 0
            ? Math.min(...a.insights.map((x) => x.importance))
            : Infinity;
        const bHighestImportance =
          b.insights.length > 0
            ? Math.min(...b.insights.map((x) => x.importance))
            : Infinity;

        const aMostImportantInsightCount = a.insights.filter(
          (x) => x.importance === aHighestImportance
        ).length;
        const bMostImportantInsightCount = b.insights.filter(
          (x) => x.importance === bHighestImportance
        ).length;

        return (
          (sorting.isDesc
            ? aHighestImportance - bHighestImportance
            : bHighestImportance - aHighestImportance) ||
          (sorting.isDesc
            ? bMostImportantInsightCount - aMostImportantInsightCount
            : aMostImportantInsightCount - bMostImportantInsightCount) ||
          sortByName(a, b, sorting.isDesc)
        );
      });
    case SORTING_CRITERION.PERFORMANCE:
      return entries.sort((a, b) => {
        const aDuration = a.durationPercentiles.find(
          (duration) => duration.percentile === 0.5
        )?.currentDuration.raw;
        const bDuration = b.durationPercentiles.find(
          (duration) => duration.percentile === 0.5
        )?.currentDuration.raw;

        if (!aDuration && !bDuration) {
          return 0;
        }

        if (!aDuration) {
          return sorting.isDesc ? 1 : -1;
        }

        if (!bDuration) {
          return sorting.isDesc ? -1 : 1;
        }

        return (
          (sorting.isDesc ? bDuration - aDuration : aDuration - bDuration) ||
          sortByName(a, b, sorting.isDesc)
        );
      });
    case SORTING_CRITERION.LATEST:
      return entries.sort((a, b) => {
        const aDateTime = new Date(a.lastSpanInstanceInfo.startTime).valueOf();
        const bDateTime = new Date(b.lastSpanInstanceInfo.startTime).valueOf();

        return (
          (sorting.isDesc ? bDateTime - aDateTime : aDateTime - bDateTime) ||
          sortByName(a, b, sorting.isDesc)
        );
      });
    case SORTING_CRITERION.NAME:
      return entries.sort((a, b) =>
        sorting.isDesc
          ? sortByName(b, a, sorting.isDesc)
          : sortByName(a, b, sorting.isDesc)
      );
    default:
      return entries;
  }
};

const getBackIconColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#002d61";
    case "dark":
    case "dark-jetbrains":
      return "#dadada";
  }
};

const getAssetTypeIconColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#788ca9";
    case "dark":
    case "dark-jetbrains":
      return "#9c9c9c";
  }
};

const getSortingMenuChevronColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#4d668a";
    case "dark":
    case "dark-jetbrains":
      return "#dadada";
  }
};

export const AssetList = (props: AssetListProps) => {
  const [sorting, setSorting] = useState<{
    criterion: SORTING_CRITERION;
    isDesc: boolean;
  }>({
    criterion: SORTING_CRITERION.CRITICAL_INSIGHTS,
    isDesc: true
  });
  const [isSortingMenuOpen, setIsSortingMenuOpen] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");

  const theme = useTheme();
  const backIconColor = getBackIconColor(theme);
  const assetTypeIconColor = getAssetTypeIconColor(theme);
  const sortingMenuChevronColor = getSortingMenuChevronColor(theme);
  const searchInputIconColor = sortingMenuChevronColor;

  const handleBackButtonClick = () => {
    props.onBackButtonClick();
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  const handleSortingMenuToggle = () => {
    setIsSortingMenuOpen(!isSortingMenuOpen);
  };

  const handleSortingMenuItemSelect = (value: string) => {
    if (sorting.criterion === value) {
      setSorting({
        ...sorting,
        isDesc: !sorting.isDesc
      });
    } else {
      setSorting({
        criterion: value as SORTING_CRITERION,
        isDesc: false
      });
    }
    handleSortingMenuToggle();
  };

  const handleAssetLinkClick = (entry: ExtendedAssetEntryWithServices) => {
    props.onAssetLinkClick(entry);
  };

  const assetTypeInfo = getAssetTypeInfo(props.assetTypeId);

  const entries: ExtendedAssetEntryWithServices[] = useMemo(
    () =>
      Object.keys(props.entries)
        .map((entryId) => {
          const entries = props.entries[entryId];
          return entries.map((entry) => {
            const relatedServices = entries.map((entry) => entry.serviceName);
            return {
              ...entry,
              id: entryId,
              relatedServices
            };
          });
        })
        .flat(),
    [props.entries]
  );

  const sortedEntries = useMemo(() => {
    const filteredEntries = entries.filter((x) =>
      x.span.displayName.toLocaleLowerCase().includes(searchInputValue)
    );

    return sortEntries(filteredEntries, sorting);
  }, [entries, sorting, searchInputValue]);

  return (
    <s.Container>
      <s.Header>
        <s.BackButton onClick={handleBackButtonClick}>
          <ChevronIcon direction={Direction.LEFT} color={backIconColor} />
        </s.BackButton>
        {assetTypeInfo?.icon && (
          <assetTypeInfo.icon color={assetTypeIconColor} />
        )}
        <span>{assetTypeInfo?.label || props.assetTypeId}</span>
        <s.ItemsCount>
          {Object.values(props.entries).flat().length}
        </s.ItemsCount>
      </s.Header>
      <s.Toolbar>
        {window.assetsSearch === true && (
          <s.SearchInputContainer>
            <s.SearchInputIconContainer>
              <MagnifierIcon color={searchInputIconColor} />
            </s.SearchInputIconContainer>
            <s.SearchInput
              placeholder={"Search"}
              onChange={handleSearchInputChange}
            />
          </s.SearchInputContainer>
        )}
        <s.PopoverContainer>
          <Popover
            open={isSortingMenuOpen}
            onOpenChange={setIsSortingMenuOpen}
            placement={"bottom-start"}
          >
            <PopoverTrigger onClick={handleSortingMenuToggle}>
              <s.SortingMenuContainer>
                <span>Sort by</span>
                <s.SortingLabel>{sorting.criterion}</s.SortingLabel>
                <ChevronIcon
                  direction={isSortingMenuOpen ? Direction.UP : Direction.DOWN}
                  color={sortingMenuChevronColor}
                />
              </s.SortingMenuContainer>
            </PopoverTrigger>
            <PopoverContent className={"Popover"}>
              <Menu
                title={"Sort by"}
                items={Object.values(SORTING_CRITERION).map((x) => ({
                  value: x,
                  label: x
                }))}
                onSelect={handleSortingMenuItemSelect}
              />
            </PopoverContent>
          </Popover>
        </s.PopoverContainer>
      </s.Toolbar>
      {sortedEntries.length > 0 ? (
        <s.List>
          {sortedEntries.map((entry) => {
            return (
              <AssetEntryComponent
                key={`${entry.id}-${entry.serviceName}`}
                entry={entry}
                onAssetLinkClick={handleAssetLinkClick}
              />
            );
          })}
        </s.List>
      ) : (
        <s.NoDataText>
          Not seeing your data here? Maybe you&apos;re missing some
          instrumentation!
        </s.NoDataText>
      )}
    </s.Container>
  );
};
