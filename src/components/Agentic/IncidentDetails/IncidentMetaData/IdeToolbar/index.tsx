import { useEffect, useState, type ComponentType } from "react";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { uniqueBy } from "../../../../../utils/uniqueBy";
import { VSCodeLogoIcon } from "../../../../common/icons/100px/VSCodeLogoIcon";
import { CursorLogoIcon } from "../../../../common/icons/24px/CursorLogoIcon";
import type { IconProps } from "../../../../common/icons/types";
import { NewIconButton } from "../../../../common/v3/NewIconButton";
import { Tooltip } from "../../../../common/v3/Tooltip";
import { trackingEvents } from "../../../tracking";
import { addChatContextIncidentFile } from "./addChatContextFile";
import { scanRunningVSCodeIdeProjects } from "./scanRunningVSCodeIdeProjects";
import * as s from "./styles";
import type { IdeToolbarProps, VSCodeExtensionInfo } from "./types";

const IDE_ICONS: Record<string, ComponentType<IconProps>> = {
  cursor: CursorLogoIcon,
  vscode: VSCodeLogoIcon
};

export const IdeToolbar = ({ incidentId }: IdeToolbarProps) => {
  const [ides, setIdes] = useState<VSCodeExtensionInfo[]>();

  const handleIdeButtonClick = (ide: string) => {
    sendUserActionTrackingEvent(trackingEvents.INCIDENT_IDE_BUTTON_CLICKED, {
      ide
    });
    addChatContextIncidentFile(ide, incidentId);
  };

  useEffect(() => {
    const scan = async () => {
      try {
        const results = await scanRunningVSCodeIdeProjects();
        const ides = uniqueBy(
          results.map((x) => x.response),
          "ideUriScheme"
        );
        setIdes(ides);
      } catch {
        setIdes([]);
      }
    };

    void scan();
  }, []);

  if (!ides || ides.length === 0) {
    return null;
  }

  return (
    <s.Container>
      {ides
        ?.map((ide) => {
          const IdeIcon = IDE_ICONS[ide.ideUriScheme];

          if (!IdeIcon) {
            return null;
          }

          return (
            <Tooltip
              title={"Attach to chat in " + ide.ideName}
              key={ide.ideUriScheme}
            >
              <NewIconButton
                buttonType={"secondaryBorderless"}
                size={"large"}
                key={ide.ideUriScheme}
                icon={(props) => <IdeIcon {...props} />}
                onClick={() => handleIdeButtonClick(ide.ideUriScheme)}
              />
            </Tooltip>
          );
        })
        .filter(Boolean)}
    </s.Container>
  );
};
