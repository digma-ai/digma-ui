import { useViewport } from "@xyflow/react";
import { Tooltip } from "../../../../common/v3/Tooltip";
import { MCPServerIcon } from "../MCPServerIcon";
import * as s from "./styles";
import type { MCPServersContainerProps } from "./types";

const DEFAULT_ICON_SIZE = 27; // in pixels

export const MCPServersContainer = ({ servers }: MCPServersContainerProps) => {
  const viewport = useViewport();
  const zoomLevel = viewport.zoom;

  if (!servers || servers.length === 0) {
    return null;
  }

  return (
    <s.Container $zoomLevel={zoomLevel}>
      {servers?.map((x, i) => (
        <Tooltip title={x.display_name} key={`${x.name}__${i}`}>
          <s.MCPServerBlock $isActive={x.active} $zoomLevel={viewport.zoom}>
            <MCPServerIcon
              server={x}
              size={DEFAULT_ICON_SIZE * viewport.zoom}
            />
          </s.MCPServerBlock>
        </Tooltip>
      ))}
    </s.Container>
  );
};
