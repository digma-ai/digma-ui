import useDimensions from "react-cool-dimensions";
import { useGlobalStore } from "../../../../containers/Main/stores/useGlobalStore";
import { changeScope } from "../../../../utils/actions/changeScope";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { Carousel } from "../../../common/Carousel";
import { trackingEvents } from "../../tracking";
import { EnvironmentChip } from "./EnvironmentChip";
import { getMostCriticalIssueCount } from "./getMostCriticalIssueCount";
import * as s from "./styles";
import { EnvironmentSelectorProps, SelectorEnvironment } from "./types";

const ENVIRONMENT_CHIP_COUNT = 3;

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

  const isCarouselVisible = sortedEnvironments.length > ENVIRONMENT_CHIP_COUNT;

  return (
    <s.Container ref={observe}>
      {isCarouselVisible ? (
        <Carousel
          itemsPerSlide={ENVIRONMENT_CHIP_COUNT}
          breakpoints={{
            461: {
              perPage: ENVIRONMENT_CHIP_COUNT + 1
            },
            561: {
              perPage: ENVIRONMENT_CHIP_COUNT + 2
            }
          }}
          items={sortedEnvironments.map((x) => (
            <EnvironmentChip
              key={x.environment.id}
              environment={x.environment}
              isActive={x.environment.id === environment?.id}
              onClick={handleEnvironmentChipClick}
              issueCounts={x.issueCounts}
            />
          ))}
        />
      ) : (
        <s.EnvironmentsContainer>
          {sortedEnvironments.map((x) => (
            <EnvironmentChip
              key={x.environment.id}
              environment={x.environment}
              isActive={x.environment.id === environment?.id}
              onClick={handleEnvironmentChipClick}
              issueCounts={x.issueCounts}
            />
          ))}
        </s.EnvironmentsContainer>
      )}
    </s.Container>
  );
};
