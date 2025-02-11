import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { GearInGearIcon } from "../../common/icons/16px/GearInGearIcon";
import { GlobeIcon } from "../../common/icons/16px/GlobeIcon";
import { WrenchIcon } from "../../common/icons/16px/WrenchIcon";
import { Tooltip } from "../../common/v3/Tooltip";
import { trackingEvents } from "../../Main/tracking";
import { Status } from "./Status";
import * as s from "./styles";
import type { SpanInfoProps } from "./types";

const getInstrumentationLibrary = (spanCodeObjectId: string) => {
  let instrumentationLibrary = spanCodeObjectId.split("$_$")[0];

  const spanPrefix = "span:";
  if (instrumentationLibrary.startsWith(spanPrefix)) {
    instrumentationLibrary = instrumentationLibrary.slice(spanPrefix.length);
  }

  return instrumentationLibrary;
};

const getLanguage = (assetTypeId: string) => {
  if (assetTypeId === "DatabaseQueries") {
    return "sql";
  }

  if (assetTypeId === "Endpoint" || assetTypeId === "EndpointClient") {
    return "http";
  }

  return undefined;
};

export const SpanInfo = ({
  onCollapse,
  data,
  spanCodeObjectId
}: SpanInfoProps) => {
  const handleCollapseButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.SPAN_INFO_COLLAPSE_BUTTON_CLICKED
    );
    onCollapse();
  };

  const stats = [
    {
      id: "services",
      icon: WrenchIcon,
      title: data.services.join(", "),
      value: data.services[0],
      count: data.services.length
    },
    {
      id: "environments",
      icon: GlobeIcon,
      title: data.environments.map((x) => x.name).join(", "),
      value: data.environments[0].name,
      count: data.environments.length
    },
    ...(spanCodeObjectId
      ? [
          {
            id: "instrumentationLibrary",
            icon: GearInGearIcon,
            title: getInstrumentationLibrary(spanCodeObjectId),
            value: getInstrumentationLibrary(spanCodeObjectId)
          }
        ]
      : [])
  ];

  return (
    <s.Container>
      <s.StyledCodeSnippet
        language={getLanguage(data.assetTypeId)}
        text={data.displayName}
      />
      <s.Footer>
        <s.StatsContainer>
          {stats.map((x) => (
            <s.Stat key={x.id}>
              <Tooltip title={x.title}>
                <s.StatValueContainer>
                  <s.StatIconContainer>
                    <x.icon color={"currentColor"} size={16} />
                  </s.StatIconContainer>
                  <s.StatValueText>{x.value}</s.StatValueText>
                  {x.count && x.count > 1 && <span>+{x.count - 1}</span>}
                </s.StatValueContainer>
              </Tooltip>
            </s.Stat>
          ))}
        </s.StatsContainer>
        {data.lastSeen && data.firstSeen && (
          <Status firstSeen={data.firstSeen} lastSeen={data.lastSeen} />
        )}
        <s.CollapseButton onClick={handleCollapseButtonClick}>
          Collapse
        </s.CollapseButton>
      </s.Footer>
    </s.Container>
  );
};
