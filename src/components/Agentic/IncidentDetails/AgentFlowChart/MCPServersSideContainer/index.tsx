import { useViewport } from "@xyflow/react";
import { MCPServerIcon } from "../MCPServerIcon";
import * as s from "./styles";
import type { MCPServersSideContainerProps } from "./types";

const DEFAULT_ICON_SIZE = 27; // in pixels

export const MCPServersSideContainer = ({
  servers
}: MCPServersSideContainerProps) => {
  const viewport = useViewport();
  const zoomLevel = viewport.zoom;

  if (!servers || servers.length === 0) {
    return null;
  }

  return (
    <s.Container $zoomLevel={zoomLevel}>
      {servers?.map((x) => (
        <s.MCPServerBlock
          key={x.name}
          $isActive={x.active}
          $zoomLevel={viewport.zoom}
        >
          <MCPServerIcon
            type={x.name}
            isActive={x.active}
            size={DEFAULT_ICON_SIZE * viewport.zoom}
          />
        </s.MCPServerBlock>
      ))}
    </s.Container>
  );
};
