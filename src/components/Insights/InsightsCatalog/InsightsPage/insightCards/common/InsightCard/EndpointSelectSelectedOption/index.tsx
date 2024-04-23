import { Link } from "../../../../../../../common/v3/Link";
import { Tooltip } from "../../../../../../../common/v3/Tooltip";
import * as s from "./styles";
import { EndpointSelectSelectedOptionProps } from "./types";

export const EndpointSelectSelectedOption = ({
  serviceName,
  route,
  spanCodeObjectId,
  onClick
}: EndpointSelectSelectedOptionProps) => {
  const title = `${serviceName} ${route}`;

  return (
    <s.Container>
      <Tooltip title={title}>
        <s.EndpointName>
          <s.ServiceName>{serviceName}</s.ServiceName>
          <Link onClick={() => onClick(spanCodeObjectId)}>{route}</Link>
        </s.EndpointName>
      </Tooltip>
      <s.StyledCopyButton text={route} />
    </s.Container>
  );
};
