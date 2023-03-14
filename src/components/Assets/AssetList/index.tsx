import { useMemo, useState } from "react";
import { AssetEntry as AssetEntryComponent } from "../../common/AssetEntry";
import { ChevronIcon } from "../../common/icons/ChevronIcon";
import { DIRECTION } from "../../common/icons/types";
import { Menu } from "../../common/Menu";
import { Popover } from "../../common/Popover";
import { PopoverContent } from "../../common/Popover/PopoverContent";
import { PopoverTrigger } from "../../common/Popover/PopoverTrigger";
import { AssetEntry } from "../types";
import { getAssetTypeInfo } from "../utils";
import * as s from "./styles";
import { AssetListProps } from "./types";

const SORTING_CRITERION = [
  "Insight Importance",
  "Services",
  "Duration",
  "Latest",
  "Errors"
];

interface AssetEntryWithServices extends AssetEntry {
  id: string;
  services: string[];
}

interface Sorting {
  criterion: string;
  isDesc: boolean;
}

const sortEntries = (
  entries: AssetEntryWithServices[],
  sorting: Sorting
): AssetEntryWithServices[] => {
  entries = [...entries];

  const sortByName = (a: AssetEntryWithServices, b: AssetEntryWithServices) =>
    a.span.displayName.localeCompare(b.span.displayName);

  switch (sorting.criterion) {
    case "Insight Importance":
      return entries.sort((a, b) => {
        const aImportance = Math.min(...a.insights.map((x) => x.importance));
        const bImportance = Math.min(...b.insights.map((x) => x.importance));

        return (
          (sorting.isDesc
            ? aImportance - bImportance
            : bImportance - aImportance) || sortByName(a, b)
        );
      });
    case "Services":
      return entries.sort(
        (a, b) =>
          (sorting.isDesc
            ? b.serviceName.localeCompare(a.serviceName)
            : a.serviceName.localeCompare(b.serviceName)) || sortByName(a, b)
      );
    case "Duration":
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
          return sorting.isDesc ? -1 : 1;
        }

        if (!bDuration) {
          return sorting.isDesc ? -1 : 1;
        }

        return (
          (sorting.isDesc ? bDuration - aDuration : aDuration - bDuration) ||
          sortByName(a, b)
        );
      });

    case "Latest":
      return entries.sort((a, b) => {
        const aDateTime = new Date(a.lastSpanInstanceInfo.startTime).valueOf();
        const bDateTime = new Date(b.lastSpanInstanceInfo.startTime).valueOf();

        return (
          (sorting.isDesc ? bDateTime - aDateTime : aDateTime - bDateTime) ||
          sortByName(a, b)
        );
      });
    case "Errors":
      return entries.sort((a, b) => {
        const aErrors = a.insights.filter((x) => x.type === "Errors").length;
        const bErrors = b.insights.filter((x) => x.type === "Errors").length;
        return (
          (sorting.isDesc ? bErrors - aErrors : aErrors - bErrors) ||
          sortByName(a, b)
        );
      });
    default:
      return entries;
  }
};

export const AssetList = (props: AssetListProps) => {
  const [sorting, setSorting] = useState<{
    criterion: string;
    isDesc: boolean;
  }>({
    criterion: "Insight Importance",
    isDesc: true
  });
  const [isSortingMenuOpen, setIsSortingMenuOpen] = useState(false);

  const handleBackButtonClick = () => {
    props.onBackButtonClick();
  };

  const handleAssetLinkClick = (entry: AssetEntry) => {
    props.onAssetLinkClick(entry);
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
        criterion: value,
        isDesc: false
      });
    }
    handleSortingMenuToggle();
  };

  const assetTypeInfo = getAssetTypeInfo(props.assetTypeId);

  const entries = useMemo(
    () =>
      Object.keys(props.entries)
        .map((entryId) => {
          const entries = props.entries[entryId];
          return entries.map((entry) => {
            const services = entries.map((entry) => entry.serviceName);
            return {
              ...entry,
              id: entryId,
              services
            };
          });
        })
        .flat(),
    [props.entries]
  );

  const sortedEntries = useMemo(
    () => sortEntries(entries, sorting),
    [entries, sorting]
  );

  return (
    <s.Container>
      <s.Header>
        <s.BackButton onClick={handleBackButtonClick}>
          <ChevronIcon direction={DIRECTION.LEFT} color={"#dadada"} />
        </s.BackButton>
        {assetTypeInfo?.icon && <assetTypeInfo.icon color={"#9c9c9c"} />}
        <span>{assetTypeInfo?.label || props.assetTypeId}</span>
        <s.ItemsCount>
          {Object.values(props.entries).flat().length}
        </s.ItemsCount>
      </s.Header>
      <s.Toolbar>
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
                direction={isSortingMenuOpen ? DIRECTION.UP : DIRECTION.DOWN}
                color={"#dadada"}
              />
            </s.SortingMenuContainer>
          </PopoverTrigger>
          <PopoverContent className="Popover">
            <Menu
              title={"Sort by"}
              items={SORTING_CRITERION.map((x) => ({ value: x, label: x }))}
              onSelect={handleSortingMenuItemSelect}
            />
          </PopoverContent>
        </Popover>
      </s.Toolbar>
      {sortedEntries.length > 0 ? (
        <s.List>
          {sortedEntries.map((entry) => {
            return (
              <AssetEntryComponent
                key={`${entry.id}-${entry.serviceName}`}
                entry={entry}
                relatedServices={entry.services}
                onAssetLinkClick={handleAssetLinkClick}
              />
            );
          })}
        </s.List>
      ) : (
        <s.NoDataText>
          Not seeing your data here? Maybe you’re missing some instrumentation!
        </s.NoDataText>
      )}
    </s.Container>
  );
};
