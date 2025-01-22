import { Tooltip } from "../../v3/Tooltip";
import * as s from "./styles";
import type { EndpointOptionProps } from "./types";

export const EndpointOption = ({
  serviceName,
  route,
  spanCodeObjectId,
  onSpanLinkClick,
  selected,
  hideCopyIcon,
  onClick,
  duration,
  hideDuration
}: EndpointOptionProps) => {
  const title = `${serviceName} ${route}`;

  return (
    <s.Container>
      <Tooltip title={title}>
        <s.EndpointName
          $selected={selected}
          $clickable={Boolean(onClick)}
          onClick={() => onClick && onClick()}
        >
          <s.ServiceName>{serviceName}</s.ServiceName>
          <s.Route>
            {spanCodeObjectId && onSpanLinkClick ? (
              <s.Link onClick={() => onSpanLinkClick(spanCodeObjectId)}>
                {route}
              </s.Link>
            ) : (
              <span>{route}</span>
            )}
          </s.Route>
          {!hideCopyIcon && <s.StyledCopyButton text={route} />}
          {!selected && !hideDuration && duration && (
            <s.Duration>{duration}</s.Duration>
          )}
        </s.EndpointName>
      </Tooltip>
    </s.Container>
  );
};
