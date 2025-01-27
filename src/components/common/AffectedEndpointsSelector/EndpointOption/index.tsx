import { Tooltip } from "../../v3/Tooltip";
import * as s from "./styles";
import type { EndpointOptionProps } from "./types";

export const EndpointOption = <T,>({
  serviceName,
  route,
  spanCodeObjectId,
  onSpanLinkClick,
  selected,
  hideCopyIcon,
  onClick,
  metric,
  isHeader
}: EndpointOptionProps<T>) => {
  const title = `${serviceName} ${route}`;

  const handleEndpointNameClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleRouteLinkClick = () => {
    if (onSpanLinkClick && spanCodeObjectId) {
      onSpanLinkClick(spanCodeObjectId);
    }
  };

  return (
    <s.Container>
      <Tooltip title={title}>
        <s.EndpointName
          $selected={selected}
          $clickable={Boolean(onClick)}
          onClick={handleEndpointNameClick}
        >
          <s.ServiceName>{serviceName}</s.ServiceName>
          <s.Route>
            {spanCodeObjectId && onSpanLinkClick ? (
              <s.RouteLink $selected={selected} onClick={handleRouteLinkClick}>
                {route}
              </s.RouteLink>
            ) : (
              <span>{route}</span>
            )}
          </s.Route>
          {!hideCopyIcon && <s.StyledCopyButton text={route} />}
          {!selected && metric && (
            <s.Duration>
              {isHeader ? metric.label : String(metric.value)}
            </s.Duration>
          )}
        </s.EndpointName>
      </Tooltip>
    </s.Container>
  );
};
