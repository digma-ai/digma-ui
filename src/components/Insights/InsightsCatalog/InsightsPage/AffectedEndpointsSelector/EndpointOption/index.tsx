import { Tooltip } from "../../../../../common/v3/Tooltip";
import * as s from "./styles";
import { EndpointOptionProps } from "./types";

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

          <s.Route>
            {spanCodeObjectId && onSpanLinkClick ? (
              <s.StyledLink onClick={() => onSpanLinkClick(spanCodeObjectId)}>
                {route}
              </s.StyledLink>
            ) : (
              <span>{route}</span>
            )}
          </s.Route>
        </s.EndpointName>
      </Tooltip>
      {!hideCopyIcon && <s.StyledCopyButton text={route} />}
    </s.Container>
  );
};
