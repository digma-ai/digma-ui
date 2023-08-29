import { ChangeEvent, useMemo, useState } from "react";
import { DefaultTheme, useTheme } from "styled-components";
import { groupBy } from "../../../utils/groupBy";
import { Menu } from "../../common/Menu";
import { Popover } from "../../common/Popover";
import { PopoverContent } from "../../common/Popover/PopoverContent";
import { PopoverTrigger } from "../../common/Popover/PopoverTrigger";
import { ChevronIcon } from "../../common/icons/ChevronIcon";
import { MagnifierIcon } from "../../common/icons/MagnifierIcon";
import { SortIcon } from "../../common/icons/SortIcon";
import { Direction } from "../../common/icons/types";
import { ImpactScores } from "../types";
import { getAssetTypeInfo } from "../utils";
import { AssetEntry as AssetEntryComponent } from "./AssetEntry";
import * as s from "./styles";
import {
  AssetListProps,
  ExtendedAssetEntryWithServices,
  SORTING_CRITERION,
  SORTING_ORDER,
  Sorting
} from "./types";

const sortEntries = (
  entries: ExtendedAssetEntryWithServices[],
  sorting: Sorting
): ExtendedAssetEntryWithServices[] => {
  entries = [...entries];

  const isDesc = sorting.order === SORTING_ORDER.DESC;

  const sortByName = (
    a: ExtendedAssetEntryWithServices,
    b: ExtendedAssetEntryWithServices,
    isDesc: boolean
  ) =>
    isDesc
      ? b.span.displayName.localeCompare(a.span.displayName)
      : a.span.displayName.localeCompare(b.span.displayName);

  const sortByPercentile = (
    a: ExtendedAssetEntryWithServices,
    b: ExtendedAssetEntryWithServices,
    percentile: number,
    isDesc: boolean
  ) => {
    const aDuration = a.durationPercentiles.find(
      (duration) => duration.percentile === percentile
    )?.currentDuration.raw;
    const bDuration = b.durationPercentiles.find(
      (duration) => duration.percentile === percentile
    )?.currentDuration.raw;

    if (!aDuration && !bDuration) {
      return 0;
    }

    if (!aDuration) {
      return isDesc ? 1 : -1;
    }

    if (!bDuration) {
      return isDesc ? -1 : 1;
    }

    return (
      (isDesc ? bDuration - aDuration : aDuration - bDuration) ||
      sortByName(a, b, isDesc)
    );
  };

  const sortByScore = (
    a: ExtendedAssetEntryWithServices,
    b: ExtendedAssetEntryWithServices,
    scoreName: keyof ImpactScores,
    isDesc: boolean
  ) => {
    if (!a.impactScores || !b.impactScores) {
      return 0;
    }

    const aScore = a.impactScores[scoreName];
    const bScore = b.impactScores[scoreName];

    return (
      (isDesc ? bScore - aScore : aScore - bScore) || sortByName(a, b, isDesc)
    );
  };

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
          (isDesc
            ? aHighestImportance - bHighestImportance
            : bHighestImportance - aHighestImportance) ||
          (isDesc
            ? bMostImportantInsightCount - aMostImportantInsightCount
            : aMostImportantInsightCount - bMostImportantInsightCount) ||
          sortByName(a, b, isDesc)
        );
      });
    case SORTING_CRITERION.PERFORMANCE:
      return entries.sort((a, b) => sortByPercentile(a, b, 0.5, isDesc));
    case SORTING_CRITERION.SLOWEST_FIVE_PERCENT:
      return entries.sort((a, b) => sortByPercentile(a, b, 0.95, isDesc));
    case SORTING_CRITERION.LATEST:
      return entries.sort((a, b) => {
        const aDateTime = new Date(a.lastSpanInstanceInfo.startTime).valueOf();
        const bDateTime = new Date(b.lastSpanInstanceInfo.startTime).valueOf();

        return (
          (isDesc ? bDateTime - aDateTime : aDateTime - bDateTime) ||
          sortByName(a, b, isDesc)
        );
      });
    case SORTING_CRITERION.PERFORMANCE_IMPACT:
      return entries.sort((a, b) => sortByScore(a, b, "ScoreExp25", isDesc));
    case SORTING_CRITERION.OVERALL_IMPACT:
      return entries.sort((a, b) => sortByScore(a, b, "ScoreExp1000", isDesc));
    case SORTING_CRITERION.NAME:
      return entries.sort((a, b) => sortByName(a, b, isDesc));
    default:
      return entries;
  }
};

const getBackIconColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#4D668A";
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

const getSortIconColor = (theme: DefaultTheme, selected: boolean) => {
  if (selected) {
    switch (theme.mode) {
      case "light":
        return "#f1f5fa";
      case "dark":
      case "dark-jetbrains":
        return "#dadada";
    }
  }
  switch (theme.mode) {
    case "light":
      return "#828797";
    case "dark":
    case "dark-jetbrains":
      return "#dadada";
  }
};

const getDefaultSortingOrder = (
  criterion: SORTING_CRITERION
): SORTING_ORDER => {
  switch (criterion) {
    case SORTING_CRITERION.NAME:
      return SORTING_ORDER.ASC;
    case SORTING_CRITERION.PERFORMANCE:
    case SORTING_CRITERION.SLOWEST_FIVE_PERCENT:
    case SORTING_CRITERION.CRITICAL_INSIGHTS:
    case SORTING_CRITERION.LATEST:
    case SORTING_CRITERION.OVERALL_IMPACT:
    case SORTING_CRITERION.PERFORMANCE_IMPACT:
    default:
      return SORTING_ORDER.DESC;
  }
};

const getAvailableSortingCriterions = (
  assets: ExtendedAssetEntryWithServices[]
) => {
  const criterions = [
    SORTING_CRITERION.CRITICAL_INSIGHTS,
    SORTING_CRITERION.PERFORMANCE,
    SORTING_CRITERION.SLOWEST_FIVE_PERCENT,
    SORTING_CRITERION.LATEST,
    SORTING_CRITERION.NAME
  ];

  if (assets.length > 0 && assets[0].impactScores) {
    criterions.push(
      SORTING_CRITERION.PERFORMANCE_IMPACT,
      SORTING_CRITERION.OVERALL_IMPACT
    );
  }

  return criterions;
};

export const AssetList = (props: AssetListProps) => {
  const [sorting, setSorting] = useState<Sorting>({
    criterion: SORTING_CRITERION.CRITICAL_INSIGHTS,
    order: SORTING_ORDER.DESC
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
        order:
          sorting.order === SORTING_ORDER.DESC
            ? SORTING_ORDER.ASC
            : SORTING_ORDER.DESC
      });
    } else {
      setSorting({
        criterion: value as SORTING_CRITERION,
        order: getDefaultSortingOrder(value as SORTING_CRITERION)
      });
    }
    handleSortingMenuToggle();
  };

  const handleAssetLinkClick = (entry: ExtendedAssetEntryWithServices) => {
    props.onAssetLinkClick(entry);
  };

  const handleSortingOrderToggleOptionButtonClick = (order: SORTING_ORDER) => {
    setSorting({
      ...sorting,
      order
    });
  };

  const assetTypeInfo = getAssetTypeInfo(props.assetTypeId);

  const entries: ExtendedAssetEntryWithServices[] = useMemo(
    () =>
      Object.keys(props.entries)
        .map((entryId) => {
          const entries = props.entries[entryId];
          const dedupedEntries = [];

          const endpointGroups = groupBy(
            entries,
            (entry) => entry.endpointCodeObjectId || "__ungrouped"
          );

          for (const endpoint in endpointGroups) {
            const endpointGroupEntries = endpointGroups[endpoint];

            const latestEntry = endpointGroupEntries.reduce(
              (acc, cur) =>
                new Date(cur.lastSpanInstanceInfo.startTime).valueOf() >
                new Date(acc.lastSpanInstanceInfo.startTime).valueOf()
                  ? cur
                  : acc,
              endpointGroupEntries[0]
            );

            const relatedServices = endpointGroupEntries
              .map((entry) => entry.serviceName)
              .sort();

            dedupedEntries.push({
              ...latestEntry,
              id: entryId,
              relatedServices
            });
          }

          return dedupedEntries;
        })
        .flat(),
    [props.entries]
  );

  const sortingCriterions = getAvailableSortingCriterions(entries);

  const sortedEntries = useMemo(() => {
    const filteredEntries = entries.filter((x) =>
      x.span.displayName
        .toLocaleLowerCase()
        .includes(searchInputValue.toLowerCase())
    );

    return sortEntries(filteredEntries, sorting);
  }, [entries, sorting, searchInputValue]);

  return (
    <s.Container>
      <s.Header>
        <s.BackButton onClick={handleBackButtonClick}>
          <ChevronIcon
            direction={Direction.LEFT}
            color={backIconColor}
            size={14}
          />
        </s.BackButton>
        {assetTypeInfo?.icon && (
          <assetTypeInfo.icon color={assetTypeIconColor} size={14} />
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
              <MagnifierIcon color={searchInputIconColor} size={14} />
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
              <s.SortingMenuButton isOpen={isSortingMenuOpen}>
                <span>Sort by</span>
                <s.SortingLabel>{sorting.criterion}</s.SortingLabel>
                <ChevronIcon
                  direction={isSortingMenuOpen ? Direction.UP : Direction.DOWN}
                  color={sortingMenuChevronColor}
                />
              </s.SortingMenuButton>
            </PopoverTrigger>
            <PopoverContent className={"Popover"}>
              <Menu
                title={"Sort by"}
                items={sortingCriterions.map((x) => ({
                  value: x,
                  label: x
                }))}
                onSelect={handleSortingMenuItemSelect}
              />
            </PopoverContent>
          </Popover>
        </s.PopoverContainer>
        <s.SortingOrderToggle>
          {[SORTING_ORDER.DESC, SORTING_ORDER.ASC].map((order) => {
            const isSelected = sorting.order === order;
            const iconColor = getSortIconColor(theme, isSelected);

            return (
              <s.SortingOrderToggleOptionButton
                key={order}
                selected={isSelected}
                onClick={() => handleSortingOrderToggleOptionButtonClick(order)}
              >
                <s.SortingOrderIconContainer sortingOrder={order}>
                  <SortIcon color={iconColor} size={14} />
                </s.SortingOrderIconContainer>
              </s.SortingOrderToggleOptionButton>
            );
          })}
        </s.SortingOrderToggle>
      </s.Toolbar>
      {sortedEntries.length > 0 ? (
        <s.List>
          {sortedEntries.map((entry) => {
            const key = [
              entry.serviceName,
              entry.endpointCodeObjectId,
              entry.span.spanCodeObjectId
            ]
              .filter(Boolean)
              .join("|_|");

            return (
              <AssetEntryComponent
                key={key}
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
