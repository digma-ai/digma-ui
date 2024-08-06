import useDimensions from "react-cool-dimensions";
import { useGlobalStore } from "../../../../containers/Main/stores/useGlobalStore";
import { logger } from "../../../../logging";
import { changeScope } from "../../../../utils/actions/changeScope";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { ChevronIcon } from "../../../common/icons/12px/ChevronIcon";
import { Direction } from "../../../common/icons/types";
import { trackingEvents } from "../../tracking";
import { EnvironmentChip } from "./EnvironmentChip";
import { getMostCriticalIssueCount } from "./getMostCriticalIssueCount";
import * as s from "./styles";
import {
  EnvironmentSelectorProps,
  ScrollDirection,
  SelectorEnvironment
} from "./types";

const ENVIRONMENT_CHIP_COUNT = 3;

const getSlidingWindow = <T,>(arr: T[], start: number, length: number) => {
  const result = [];
  const arrLength = arr.length;

  for (let i = 0; i < length; i++) {
    const currentIndex = (start + i + arrLength) % arrLength;
    result.push(arr[currentIndex]);
  }

  return result;
};

const sortEnvironmentsByCriticalIssues = (
  a: SelectorEnvironment,
  b: SelectorEnvironment
) => {
  const aCount = getMostCriticalIssueCount(a.issueCounts);
  const bCount = getMostCriticalIssueCount(b.issueCounts);

  if (aCount && !bCount) {
    return -1;
  }

  if (!aCount && bCount) {
    return 1;
  }

  if (aCount && bCount) {
    if (aCount.criticality === bCount.criticality) {
      return (
        bCount.count - aCount.count ||
        a.environment.name.localeCompare(b.environment.name)
      );
    }

    return bCount.criticality - aCount.criticality;
  }

  return 0;
};

export const EnvironmentSelector = ({
  environments
}: EnvironmentSelectorProps) => {
  const scope = useGlobalStore.use.scope();
  const environment = useGlobalStore.use.environment();
  const { observe } = useDimensions();
  const sortedEnvironments = environments.sort(
    sortEnvironmentsByCriticalIssues
  );

  if (sortedEnvironments.length < 2) {
    return null;
  }

  const changeEnvironment = (environmentId: string) => {
    sendUserActionTrackingEvent(trackingEvents.ENVIRONMENT_SELECTED);

    changeScope({
      span: scope?.span
        ? {
            spanCodeObjectId: scope.span.spanCodeObjectId
          }
        : null,
      environmentId: environmentId
    });
  };

  const handleEnvironmentChipClick = (environmentId: string) => {
    changeEnvironment(environmentId);
  };

  const handleCarouselButtonClick = (direction: ScrollDirection) => {
    logger.debug(direction);
    // const { entry: containerEntry, width: containerWidth } =
    //   environmentListContainerDimensions;
    // const { entry } = environmentListDimensions;
    // if (containerEntry && entry) {
    //   let delta = containerWidth;
    //   if (direction === "left") {
    //     delta *= -1;
    //   }
    //   let newScrollLeft = containerEntry.target.scrollLeft + delta;
    //   const maxScrollLeft = containerEntry.target.scrollWidth - containerWidth;
    //   if (newScrollLeft >= maxScrollLeft) {
    //     newScrollLeft = maxScrollLeft;
    //   }
    //   if (newScrollLeft < 0) {
    //     newScrollLeft = 0;
    //   }
    //   setScrollLeft(newScrollLeft);
    //   containerEntry.target.scrollLeft = newScrollLeft;
    // }
  };

  const environmentIndex = sortedEnvironments.findIndex(
    (x) => x.environment.id === environment?.id
  );

  const environmentsWithChips =
    sortedEnvironments.length > ENVIRONMENT_CHIP_COUNT
      ? getSlidingWindow(
          sortedEnvironments,
          environmentIndex - 1,
          ENVIRONMENT_CHIP_COUNT
        )
      : sortedEnvironments;

  const isCarouselVisible = sortedEnvironments.length > ENVIRONMENT_CHIP_COUNT;

  return (
    <s.Container ref={observe}>
      <s.EnvironmentsContainer>
        {environmentsWithChips.map((x) => (
          <EnvironmentChip
            key={x.environment.id}
            environment={x.environment}
            isActive={x.environment.id === environment?.id}
            onClick={handleEnvironmentChipClick}
            issueCounts={x.issueCounts}
          />
        ))}
      </s.EnvironmentsContainer>
      {isCarouselVisible && (
        <s.CarouselButton
          direction={"left"}
          icon={(props) => (
            <ChevronIcon {...props} direction={Direction.LEFT} />
          )}
          onClick={() => handleCarouselButtonClick("left")}
        />
      )}
      {isCarouselVisible && (
        <s.CarouselButton
          direction={"right"}
          icon={(props) => (
            <ChevronIcon {...props} direction={Direction.RIGHT} />
          )}
          onClick={() => handleCarouselButtonClick("right")}
        />
      )}
    </s.Container>
  );
};
