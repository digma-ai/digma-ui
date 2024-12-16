import { Link } from "../../v3/Link";
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
  onClick
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
          {spanCodeObjectId && onSpanLinkClick ? (
            <Link onClick={() => onSpanLinkClick(spanCodeObjectId)}>
              {route}
            </Link>
          ) : (
            <span>{route}</span>
          )}
        </s.EndpointName>
      </Tooltip>
      {!hideCopyIcon && <s.StyledCopyButton text={route} />}
    </s.Container>
  );
};
